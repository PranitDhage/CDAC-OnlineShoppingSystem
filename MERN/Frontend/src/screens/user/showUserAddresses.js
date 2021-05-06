import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchUserAddresses } from '../../actions/addressAction'
import { cartCheckout, getAllCartItemsAtLogin } from '../../actions/cartActions'
import { CART_CHECKOUT_RESET } from '../../constants/cartConstants'

const ShowUserAddresses = (props) => {
  const fetchAddressStore = useSelector((state) => state.fetchAddressStore)

  const dispatch = useDispatch()

  const [addId, setAddId] = useState()

  useEffect(() => {
    dispatch(fetchUserAddresses())
  }, [])

  useEffect(() => {
    console.log(addId)
  }, [addId])

  //to check checkout status
  const cartCheckoutStore = useSelector((state) => state.cartCheckoutStore)
  useEffect(async () => {
    if (
      cartCheckoutStore.response &&
      cartCheckoutStore.response.status == 'success'
    ) {
      await dispatch({ type: CART_CHECKOUT_RESET })
      await dispatch(getAllCartItemsAtLogin())
      toast('Order Placed successfully!')
      await props.history.push('/user-myorder')
    }
  }, [
    cartCheckoutStore.response,
    cartCheckoutStore.error,
    cartCheckoutStore.loading,
  ])

  const checkout = () => {
    if (addId == null) {
      toast('please specify address')
    } else dispatch(cartCheckout(addId))
  }

  return (
    <div className="container">
      <h1>Select Shipping Address</h1>
      <hr />
      {fetchAddressStore &&
        fetchAddressStore.response &&
        fetchAddressStore.response.status == 'success' &&
        fetchAddressStore.response.data.map((address) => {
          return (
            <div
              style={{ textAlign: 'left' }}
              className="mx-auto align-items-center">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">
                    <table>
                      <tr>
                        <td>
                          <input
                            type="radio"
                            name="site_name"
                            value={address.add_id}
                            onChange={(e) => {
                              setAddId(e.target.value)
                            }}
                          />
                        </td>
                        <td> </td>
                        <td style={{ textAlign: 'center' }}>
                          {'   '}
                          {address.address}, {address.city}, {address.state},{' '}
                          {address.country}, {address.pin}
                        </td>
                      </tr>
                    </table>
                  </h6>
                </div>
              </div>
              <br />
            </div>
          )
        })}

      <div>
        <Link to="/add-new-address">
          <button className="btn btn-outline-primary mx-2">
            Add New Address
          </button>
        </Link>
        <button onClick={checkout} className="btn btn-outline-success mx-2">
          checkout
        </button>
      </div>
    </div>
  )
}

export default ShowUserAddresses
