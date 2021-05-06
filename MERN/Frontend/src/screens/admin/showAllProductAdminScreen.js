import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductListAdmin } from '../../actions/adminAction'
import { deleteProduct } from '../../actions/productActions'

const ShowAllProductAdminScreen = (props) => {
  const dispatch = useDispatch()

  const allProductStore = useSelector((store) => store.allProductStore)
  const { error, response, loading } = allProductStore

  useEffect(() => {
    dispatch(getProductListAdmin())
  }, [])

  useEffect(() => {}, [error, response, loading])

  const onAddProduct = () => {
    props.history.push('/add-product')
  }

  const onUpdate = (p) => {
    console.log('in onUpdate')
    props.history.push({
      pathname: '/seller-update-product',
      state: p, // your data array of objects
    })
  }

  // to render page after delete button is pressed
  const deleteProductStore = useSelector((state) => state.deleteProductStore)
  useEffect(async () => {
    if (
      deleteProductStore.response &&
      deleteProductStore.response.status == 'success'
    ) {
      dispatch(getProductListAdmin())
    }
  }, [
    deleteProductStore.response,
    deleteProductStore.error,
    deleteProductStore.loading,
  ])

  const onDelete = (p) => {
    dispatch(deleteProduct(p.prod_id))
  }

  const goBackHandler = () => {
    props.history.push('/admin')
  }

  return (
    <div className="container">
      <div className="text-left border border-light p-3 mb-2">
        <button
          className="text-left btn btn-outline-success"
          style={{ flex: 'left' }}
          onClick={goBackHandler}>
          Go Back
        </button>
      </div>

      <div id="wrapper">
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <div className="container-fluid">
              <div className="card shadow">
                <div className="card-header py-3">
                  <p className="text-primary m-0 fw-bold">Product's List</p>
                </div>
                <div className="card-body">
                  <div
                    className="table-responsive table mt-2"
                    id="dataTable"
                    role="grid"
                    aria-describedby="dataTable_info">
                    <table className="table my-0" id="dataTable">
                      <thead>
                        <tr>
                          <th>Product ID</th>
                          <th className="admintitle">Title</th>
                          <th className="adminproductdesc">Desc</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {response &&
                          response.data &&
                          response.data.length > 0 &&
                          response.data.map((p) => {
                            return (
                              <tr>
                                <td>{p.prod_id}</td>
                                <td className="admintitle">{p.prod_title}</td>
                                <td className="adminproductdesc">
                                  {p.prod_description}
                                </td>
                                <td>{p.prod_price}</td>
                                <td>{p.prod_qty}</td>
                                <td>
                                  <button
                                    onClick={() => onUpdate(p)}
                                    type="button"
                                    className="btn btn-outline-success">
                                    Update
                                  </button>

                                  <button
                                    onClick={() => onDelete(p)}
                                    type="button"
                                    className="btn btn-outline-danger float-end ">
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-light p-3 mb-4">
        <div className="text-center">
          <button
            onClick={onAddProduct}
            className="btn btn-secondary float-end">
            Add New Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowAllProductAdminScreen
