import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMyOrder } from '../../actions/myorderActions'
import { getAllCustomersMyOrdersForSeller } from '../../actions/sellerActions'
import { request_url } from '../../config/url'

const SellerAllCustomersMyOrderScreen = (props) => {
  const getAllCustomerMyOrdersForSellerStore = useSelector(
    (store) => store.getAllCustomerMyOrdersForSellerStore
  )

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('in use effect of MyOrderScreen')
    dispatch(getAllCustomersMyOrdersForSeller())
  }, [])

  // to re-render page after delete button is pressed
  const updateMyOrderStore = useSelector((state) => state.updateMyOrderStore)
  useEffect(() => {
    if (
      updateMyOrderStore.response &&
      updateMyOrderStore.response.status == 'success'
    ) {
      dispatch(getAllCustomersMyOrdersForSeller())
    }
  }, [
    updateMyOrderStore.response,
    updateMyOrderStore.loading,
    updateMyOrderStore.error,
  ])

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

  const onDeliverOrder = (p) => {
    console.log('inside Deliver my order' + p)
    dispatch(updateMyOrder(p.myorder_id, 1))
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
                  <p className="text-primary m-0 fw-bold">
                    Customer's Order List
                  </p>
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
                          <th>Product Image</th>
                          <th>Product Name</th>
                          <th>Order Date</th>
                          <th>Order Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllCustomerMyOrdersForSellerStore.response &&
                          getAllCustomerMyOrdersForSellerStore.response.data &&
                          getAllCustomerMyOrdersForSellerStore.response.data
                            .length > 0 &&
                          getAllCustomerMyOrdersForSellerStore.response.data.map(
                            (p) => {
                              return (
                                <tr>
                                  <td style={{ width: '10%' }}>
                                    <img
                                      src={request_url + `/${p.photo}`}
                                      className=" cover rounded mx-auto d-block img-fluid-myorders"
                                      alt="Image Loading Failed"
                                      width="auto"
                                      height="auto"
                                    />
                                  </td>
                                  <td>{p.prod_title}</td>
                                  <td>{p.orderDate}</td>
                                  <td>{p.status}</td>
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
                                    {p.status == 'not delivered' && (
                                      <button
                                        onClick={() => {
                                          onDeliverOrder(p)
                                        }}
                                        className="btn btn-sm btn-success mx-2">
                                        Deliver Order
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
                            }
                          )}
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

export default SellerAllCustomersMyOrderScreen
