import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const OrderDetailsScreen = (props) => {

  const userSigninStore = useSelector((store) => store.userSigninStore)

  const {address,orderDetails,status,user } = props.location.state
  console.log(props.location.state)

  const goBackHandler = () => {
    if (
      userSigninStore &&
      userSigninStore.response &&
      userSigninStore.response.status == 'OK'
    ) {
      if (
        userSigninStore.response.data.role == 'CUSTOMER' ||
        userSigninStore.response.data.role == 'CUSTSELL' ||
        userSigninStore.response.data.role == 'ADMIN'
      )
        props.history.push('/user-myorder')
      if (userSigninStore.response.data.role == 'SELLER')
        props.history.push('/all-customers-myorders-for-seller')
    }
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
                    Customer's Order Details Screen
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
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Delivery Address</th>
                          {
                            (user.role == 'CUSTOMER' || user.role =='CUSTSELL') && 
                            status == 1 && 
                            (
                              <>
                                <th>rating</th>
                                <th>comment</th>
                              </>
                            )}
                        </tr>
                      </thead>

                      <tbody>
                        {
                        orderDetails && orderDetails != '' &&
                            <tr>
                                <td>{ orderDetails[0].product.prod_title}</td>
                                <td>{orderDetails[0].product.prod_price}</td>
                                <td>{orderDetails[0].product.prod_qty}</td>
                                <td>
                                  {address.address}, {address.city}, {address.state}, {address.country}, {address.pin}
                                </td>{' '}
                              
                              {userSigninStore &&
                                userSigninStore.response &&
                                userSigninStore.response.status =='OK' &&
                                userSigninStore.response.data &&
                                (userSigninStore.response.data.role =='CUSTOMER' ||
                                  userSigninStore.response.data.role =='CUSTSELL') && 
                                  status == 1 && 
                                  (
                                  <>
                                    <td>{orderDetails[0].rating}</td>
                                    <td>{orderDetails[0].comment}</td>
                                    <td>
                                      {(orderDetails[0].rating == null ||
                                        orderDetails[0].comment == null) && (
                                          <Link
                                            to={`/rate-product/${orderDetails[0].orderdetailsId}`}
                                            className="btn btn-sm btn-success btn-add-to-cart">
                                            Rate Product
                                          </Link>
                                        )}
                                    </td> 
                                  </>
                                )}
                                
                              </tr>

                          }
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

export default OrderDetailsScreen
