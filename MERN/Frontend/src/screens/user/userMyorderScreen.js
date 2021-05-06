import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getMyOrderList, updateMyOrder } from '../../actions/myorderActions'
import { request_url } from '../../config/url'
import { MYORDER_UPDATE_RESET } from '../../constants/myorderConstants'

const UserMyOrderScreen = (props) => {
  const viewMyOrderStore = useSelector((store) => store.viewMyOrderStore)
  const updateMyOrderStore = useSelector((store) => store.updateMyOrderStore)
  const onOrderDetails = (p) => {
    props.history.push({
      pathname: '/order-details',
      state: p, // your data array of objects
    })
  }
  const onCancelOrder = (p) => {
    console.log('inside cancel my order' + p)
    dispatch(updateMyOrder(p.myorder_id, 2))
  }

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('in use effect of MyOrderScreen')
    dispatch(getMyOrderList())
  }, [])

  useEffect(() => {
    dispatch(getMyOrderList())
    if (updateMyOrderStore.response && updateMyOrderStore.response.status == 'success') {
      dispatch({ type: MYORDER_UPDATE_RESET })
      toast("Order Cancelled Successfully..!");
    }
  }, [updateMyOrderStore.response, updateMyOrderStore.error, updateMyOrderStore.loading])

  const goBackHandler = () => {
    props.history.push('/')
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
                  <p className="text-primary m-0 fw-bold">User Order List</p>
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
                          <th>Product image</th>
                          <th>Product Name</th>
                          <th>Order Date</th>
                          <th>Order Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewMyOrderStore.response &&
                          viewMyOrderStore.response.data &&
                          viewMyOrderStore.response.data.length > 0 &&
                          viewMyOrderStore.response.data.map((p) => {
                            return (
                              <tr style={{ textAlign: 'left' }}>
                                <td style={{ width: '25%' }}>
                                  <img
                                    src={request_url + `/${p.photo}`}
                                    className=" cover rounded mx-auto d-block img-fluid-user-myorders"
                                    alt="Image Loading Failed"
                                    width="30px"
                                    height="30px"
                                  />
                                </td>
                                <td>{p.prod_title}</td>
                                <td>{p.orderDate}</td>
                                {p.status == 'not delivered' &&
                                  <td style={{ color: "red" }}>{p.status}</td>
                                }
                                {p.status == 'delivered' &&
                                  <td style={{ color: "green" }}>{p.status}</td>
                                }
                                {p.status == 'cancelled' &&
                                  <td style={{ color: "grey" }}>{p.status}</td>
                                }
                                <td>
                                  {p.status == 'not delivered' && (
                                    <button
                                      onClick={() => {
                                        onCancelOrder(p)
                                      }}
                                      className="btn btn-sm btn-danger mx-2">
                                      Cancel
                                    </button>
                                  )}
                                  <button
                                    onClick={() => {
                                      onOrderDetails(p)
                                    }}
                                    className="btn btn-sm btn-success mx-2">
                                    Order Details
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

export default UserMyOrderScreen
