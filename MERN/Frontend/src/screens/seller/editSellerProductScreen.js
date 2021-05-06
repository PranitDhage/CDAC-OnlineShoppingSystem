import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from '../../actions/sellerActions'
import { request_url } from '../../config/url'

import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'

const EditSellerProductScreen = (props) => {
  const prod_id = props.location.state.prod_id
  const prod_title = props.location.state.prod_title
  const prod_price = props.location.state.prod_price
  const prod_qty = props.location.state.prod_qty
  const photo = props.location.state.photo

  const updateProductStore = useSelector((state) => state.updateProductStore)
  const { response, loading, error } = updateProductStore

  const dispatch = useDispatch()

  const [productTitle, setProductTitle] = useState('' + prod_title)
  const [productPrice, setProductPrice] = useState('' + prod_price)
  const [productQuantity, setproductQuantity] = useState('' + prod_qty)
  const [productPhoto, setProductPhoto] = useState('' + photo)

  const photoChangeHandler = (e) => {
    setProductPhoto(e.target.files[0])
  }

  useEffect(() => {
    if (response && response.status == 'success') {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      props.history.push('/show-product')
    } else if (error) {
      // there is an error while making the API call
      console.log(error)
      alert('error while making API call')
    }
  }, [response, loading, error])

  //  console.log(`state---> ${state}`)
  const saveButton = () => {
    console.log(`in saveButton Method`)
    dispatch(
      updateProduct(
        prod_id,
        productTitle,
        productPrice,
        productQuantity,
        productPhoto
      )
    )
  }

  return (
    <div>
      <div className="my-5">
        <h1 className="text-center">Edit Product Details</h1>
      </div>

      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6" col-10 mx-auto>
            <img
              src={request_url + `/${productPhoto}`}
              className="img-fluid contact-img"
              alt="no image avaliable"
              height="250"
              width="250"
            />
          </div>

          <div className="col-md-6" col-10 mx-auto>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                <strong>Product Title</strong>
              </label>
              <input
                defaultValue={prod_title}
                type="text"
                class="form-control"
                onChange={(e) => setProductTitle(e.target.value)}
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                <strong>Product Price</strong>
              </label>

              <input
                defaultValue={prod_price}
                type="text"
                class="form-control"
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                <strong>Product Quantity</strong>
              </label>
              <input
                defaultValue={prod_qty}
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setproductQuantity(e.target.value)}
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                <strong>Product Photo</strong>
              </label>
              <input
                type="file"
                class="form-control"
                id="exampleFormControlInput1"
                onChange={photoChangeHandler}
              />
            </div>

            <div class="col-12">
              <button class="btn btn-success " onClick={saveButton}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSellerProductScreen
