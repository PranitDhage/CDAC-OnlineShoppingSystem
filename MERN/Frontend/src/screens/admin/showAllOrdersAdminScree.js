import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewOrderDetailsAdmin } from '../../actions/orderActions'

const OrderDetailsAdminScreen = (props) => {
  const viewOrderDetailsStore = useSelector(
    (store) => store.viewOrderDetailsStore
  )

  //for checking user role so that he can be redirected to pages according to his role
  const userSigninStore = useSelector((state) => state.userSigninStore)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('in use effect of viewOrderDetails to Admin')
    dispatch(viewOrderDetailsAdmin())
  }, [])

  const goBackHandler = () => {
    if (userSigninStore.response.data.role == 'ADMIN')
      props.history.push('/admin')
    if (userSigninStore.response.data.role == 'SELLER')
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
                  <p className="text-primary m-0 fw-bold">Order Details List</p>
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
                          <th>Order Details ID</th>
                          <th>MyOrder ID</th>
                          <th>Product Title</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Rating</th>
                          <th>Comment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewOrderDetailsStore.response &&
                          viewOrderDetailsStore.response.data &&
                          viewOrderDetailsStore.response.data.length > 0 &&
                          viewOrderDetailsStore.response.data.map((p) => {
                            return (
                              <tr>
                                <td>{p.orderdetails_id}</td>
                                <td>{p.myorder_id}</td>
                                <td>{p.prod_title}</td>
                                <td>{p.price}</td>
                                <td>{p.quantity}</td>
                                <td>{p.rating}</td>
                                <td>{p.comment}</td>
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

export default OrderDetailsAdminScreen
