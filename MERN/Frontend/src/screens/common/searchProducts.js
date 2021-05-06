import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductList } from '../../actions/productActions'
import { addToCart, getAllCartItemsAtLogin } from '../../actions/cartActions'
import { request_url } from '../../config/url'
import { CART_ADD_RESET } from '../../constants/cartConstants'

const SearchScreen = (props) => {
  // to fetch all available products list from db
  const searchProductStore = useSelector((state) => state.searchProductStore)
  const { response, loading, error } = searchProductStore

  // to show add to cart button when user is not logged in
  const userSigninStore = useSelector((state) => state.userSigninStore)

  //to add product into cart check response if success then only go to cart
  const cartStore = useSelector((state) => state.cartStore)

  //to get cart items list for sorting so that buttons can be changed
  const cartLoginStore = useSelector((state) => state.cartLoginStore)

  //to change the add to cart button to go to cart sorting products
  let productsNotInCart = null
  let state = false
  let count = 0
  if (response != null && cartLoginStore.response != null) {
    //passing all the avaliable products into arr1
    console.log('arr 1')
    console.log(response.data)
    const arr1 = searchProductStore.response.data

    //passing all the avaliable products from cart into arr2
    console.log('arr 2')
    console.log(cartLoginStore.response.data)
    const arr2 = cartLoginStore.response.data

    //sorting array elements so that we get array of products which are not available in cart
    productsNotInCart = arr1.filter(
      (products) =>
        !arr2.filter((p) => p.prod_title == products.prod_title).length
    )
    console.log(productsNotInCart)
    console.log('productsNotInCart')
  }

  const dispatch = useDispatch()

  //at start on page load
  useEffect(() => {
    console.log('in homepage use effect')
    // get list of all available products
    dispatch(getProductList())
    // fetch all the products which are added in cart so that their button can be changed to go to cart
    getAllCartItemsAtLogin()
  }, [])

  //when add to cart button is pressed
  useEffect(async () => {
    //if product added to cart successfully then
    if (cartStore.response && cartStore.response.status == 'success') {
      //reset the response otherwise it will be auto redirected to cart contiounisly when going to homepage
      dispatch({
        type: CART_ADD_RESET,
      })
      //then fetch all the items which are added to cart so that the nav bar cart value will be changed
      dispatch(getAllCartItemsAtLogin())
      //then redirect to cart page
      await props.history.push('/cart')
    }

    //if product add to cart fails then
    if (cartStore.response && cartStore.response.status == 'error') {
      //reset the cart resonse otherwise it will be redirected to signin continiously
      dispatch({
        type: CART_ADD_RESET,
      })
      alert('Please Signin to continue')
      await props.history.push('/signin')
    }
  }, [cartStore.response])

  const addToCartHandler = (p) => {
    console.log('in addToCartHandler :' + p)
    dispatch(addToCart(p.prod_id, '1'))
  }

  const goToCartHandler = () => {
    props.history.push('/cart')
  }

  return (
    <div>
      <h1>
        <strong>Expect More, Pay Less...!!</strong>
      </h1>{' '}
      <hr />
      <div className="products-container">
        {response &&
          response.data &&
          response.data.length > 0 &&
          response.data.map((p) => {
            count = 0
            state = false
            console.log('outer block')
            console.log(count)
            console.log(state)
            return (
              <div>
                <div className="product-container">
                  <div className="card">
                    <img
                      src={'http://localhost:4000/' + `${p.photo}`}
                      className=" cover rounded mx-auto d-block img-fluid"
                      alt="Image Loading Failed"
                      width="300px"
                      height="300px"
                    />
                    <div className="card-body">
                      <div>
                        <Link to={`/productdetails/${p.prod_id}`}>
                          <h6>
                            <strong>{p.prod_title}</strong>
                          </h6>
                        </Link>
                      </div>
                      <div>
                        <h4>₹{p.prod_price}</h4>
                      </div>

                      {productsNotInCart &&
                        productsNotInCart.map((pnic) => {
                          count = count + 1
                          console.log('inner block')
                          console.log(count)
                          console.log(state)
                          if (pnic.prod_title == p.prod_title) {
                            state = true
                            return (
                              <button
                                onClick={() => addToCartHandler(p)}
                                className="btn btn-sm btn-success btn-add-to-cart">
                                Add to cart
                              </button>
                            )
                          }
                          if (
                            productsNotInCart.length == count &&
                            state == false
                          ) {
                            return (
                              <button
                                onClick={goToCartHandler}
                                className="btn btn-sm btn-info btn-add-to-cart">
                                Go to cart
                              </button>
                            )
                          }
                        })}

                      {/* if all the products are added in cart  */}
                      {productsNotInCart && productsNotInCart.length == 0 && (
                        <button
                          onClick={goToCartHandler}
                          className="btn btn-sm btn-info btn-add-to-cart">
                          {' '}
                          Go to cart
                        </button>
                      )}

                      {/* if user has not signed in */}
                      {userSigninStore.response == null && (
                        <button
                          onClick={() => addToCartHandler(p)}
                          className="btn btn-sm btn-success btn-add-to-cart">
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default SearchScreen
