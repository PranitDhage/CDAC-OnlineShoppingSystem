import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddressForOrderDetails } from '../../actions/addressAction'

const OrderDetailsScreen = (props) => {
  const fetchAddressStore = useSelector((store) => store.fetchAddressStore)

  const userSigninStore = useSelector((store) => store.userSigninStore)

  const add_id = props.location.state.add_id
  const myorder_id = props.location.state.myorder_id
  const prod_title = props.location.state.prod_title
  const prod_price = props.location.state.prod_price
  const quantity = props.location.state.quantity
  const rating = props.location.state.rating
  const comment = props.location.state.comment
  const orderdetails_id = props.location.state.orderdetails_id
  const status = props.location.state.status

  console.log(orderdetails_id)

  const dispatch = useDispatch()

  const goBackHandler = () => {
    if (
      userSigninStore &&
      userSigninStore.response &&
      userSigninStore.response.status == 'success'
    ) {
      if (
        userSigninStore.response.data.role == 'CUSTOMER' ||
        userSigninStore.response.data.role == 'CUSTSELL'
      )
        props.history.push('/user-myorder')
      if (userSigninStore.response.data.role == 'SELLER')
        props.history.push('/all-customers-myorders-for-seller')
    }
  }

  useEffect(() => {
    console.log('in use effect of viewOrderDetails')
    console.log('add_id' + add_id)
    dispatch(fetchAddressForOrderDetails(add_id))
  }, [])

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
                          {userSigninStore &&
                            userSigninStore.response &&
                            userSigninStore.response.status == 'success' &&
                            userSigninStore.response.data &&
                            (userSigninStore.response.data.role == 'CUSTOMER' ||
                              userSigninStore.response.data.role ==
                              'CUSTSELL') && status == 'delivered' && (
                              <>
                                <th>rating</th>
                                <th>comment</th>
                              </>
                            )}
                        </tr>
                      </thead>
                      <tbody>
                        {fetchAddressStore.response &&
                          fetchAddressStore.response.data &&
                          fetchAddressStore.response.data.length > 0 &&
                          fetchAddressStore.response.data.map((p) => {
                            return (
                              <tr>
                                <td>{prod_title}</td>
                                <td>{prod_price}</td>
                                <td>{quantity}</td>
                                <td>
                                  {p.address}, {p.city}, {p.country}, {p.pin}
                                </td>{' '}
                                {userSigninStore &&
                                  userSigninStore.response &&
                                  userSigninStore.response.status ==
                                  'success' &&
                                  userSigninStore.response.data &&
                                  (userSigninStore.response.data.role ==
                                    'CUSTOMER' ||
                                    userSigninStore.response.data.role ==
                                    'CUSTSELL') && status == 'delivered' && (
                                    <>
                                      <td>{rating}</td>
                                      <td>{comment}</td>
                                      <td>
                                        {(rating == null ||
                                          comment == null) && (
                                            <Link
                                              to={`/rate-product/${orderdetails_id}`}
                                              className="btn btn-sm btn-success btn-add-to-cart">
                                              Rate Product
                                            </Link>
                                          )}
                                      </td>
                                    </>
                                  )}
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

export default OrderDetailsScreen
