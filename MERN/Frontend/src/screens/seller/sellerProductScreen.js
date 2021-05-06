import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductList } from '../../actions/sellerActions'
import { deleteProduct } from '../../actions/productActions'
import { Link } from 'react-router-dom'
import { request_url } from '../../config/url'

const SellerProductScreen = (props) => {
  const dispatch = useDispatch()

  // get all products only of perticular seller
  const allProductStore = useSelector((store) => store.allProductStore)
  const { response } = allProductStore

  // call this only once (when the page has loaded successfully)
  useEffect(() => {
    dispatch(getProductList())
  }, [])

  // to re-render page after delete product button is pressed
  const deleteProductStore = useSelector((state) => state.deleteProductStore)
  useEffect(() => {
    if (
      deleteProductStore.response &&
      deleteProductStore.response.status == 'success'
    ) {
      dispatch(getProductList())
    }
  }, [
    deleteProductStore.response,
    deleteProductStore.error,
    deleteProductStore.loading,
  ])

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

  const onDelete = (p) => {
    dispatch(deleteProduct(p.prod_id))
  }

  const goBackHandler = () => {
    props.history.push('/seller')
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
                  <p className="text-primary m-0 fw-bold">Products List</p>
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
                          <th>Title</th>
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
                                <td style={{ width: '25%' }}>
                                  <img
                                    src={request_url + `/${p.photo}`}
                                    className=" cover rounded mx-auto d-block img-fluid-products"
                                    alt="Image Loading Failed"
                                    width="30px"
                                    height="30px"
                                  />
                                </td>

                                <td>
                                  <Link to={`/productdetails/${p.prod_id}`}>
                                    <strong>{p.prod_title}</strong>
                                  </Link>
                                </td>
                                <td>{p.prod_price}</td>
                                <td>{p.prod_qty}</td>
                                <td>
                                  <button
                                    onClick={() => onUpdate(p)}
                                    type="button"
                                    className="btn btn-outline-success mx-2">
                                    Update
                                  </button>
                                  <button
                                    onClick={() => onDelete(p)}
                                    type="button"
                                    className="btn btn-outline-danger mx-2">
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
    </div>
  )
}

export default SellerProductScreen
