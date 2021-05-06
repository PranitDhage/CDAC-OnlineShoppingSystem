import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProduct,
  getAllCategories,
  getAllCompanies,
} from '../../actions/productActions'
import { PRODUCT_POST_RESET } from '../../constants/productConstants'

const AddProductScreen = (props) => {
  const addProductStore = useSelector((state) => state.addProductStore)
  const { response, loading, error } = addProductStore

  const companyFetchStore = useSelector((state) => state.companyFetchStore)

  const categoryFetchStore = useSelector((state) => state.categoryFetchStore)

  const [company, setCompany] = useState('')
  const [category, setCategory] = useState('')
  const [prodtitle, setProdtitle] = useState('')
  const [proddesc, setProddesc] = useState('')
  const [prodprice, setProdprice] = useState('')
  const [prodqty, setProdqty] = useState('')
  let [selectedFile, setSelectedFile] = useState([])

  const categoryChangeHandler = (e) => setCategory(e.target.value)
  const companyChangeHandler = (e) => setCompany(e.target.value)

  const dispatch = useDispatch()

  const [validation, setValidation] = useState(false);


  const addnewProduct = () => {
    console.log("in add Product button function");

    if (
      prodtitle &&
      proddesc &&
      category &&
      prodprice &&
      company &&
      selectedFile
    ) {
      dispatch(
        addProduct(
          prodtitle,
          proddesc,
          category,
          prodprice,
          company,
          prodqty,
          selectedFile
        )
      );
    } else {
      console.log(validation);
      setValidation(true);
    }
  };

  const onFileSelected = (event) => {
    setSelectedFile(event.target.files[0])
  }

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllCompanies())
  }, [])

  useEffect(() => {
    if (response && response.status == 'success') {
      dispatch({ type: PRODUCT_POST_RESET })
      props.history.push('/')
    } else if (error) {
      // there is an error while making the API call
      dispatch({ type: PRODUCT_POST_RESET })
      console.log(error)
      alert('error while making API call')
    }
  }, [response, loading, error])

  return (
    <div className="signup-form">
      <h2>Add New Product</h2>
      <hr />

      <div className="form-group">
        <input
          type="text"
          background-color="#3CBC8D"
          color="white"
          className="form-control"
          name="Prod_title"
          placeholder="Product Title"
          required="required"
          onChange={(e) => setProdtitle(e.target.value)}
        />
        {
          validation == true && prodtitle == "" && (
            <div style={{ color: "red" }}>please enter Product Title</div>
          )
        }
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="prod_desc"
          placeholder="Product Description"
          required="required"
          onChange={(e) => setProddesc(e.target.value)}></input>
        {
          validation == true && proddesc == "" && (
            <div style={{ color: "red" }}>please enter Product Description</div>
          )
        }
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="prod_price"
          placeholder="Product Price"
          required="required"
          onChange={(e) => setProdprice(e.target.value)}></input>
        {
          validation == true && prodprice == "" && (
            <div style={{ color: "red" }}>please enter Product Price</div>
          )
        }
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="prod_qty"
          placeholder="Product Quantity"
          required="required"
          onChange={(e) => setProdqty(e.target.value)}></input>
        {
          validation == true && prodqty == "" && (
            <div style={{ color: "red" }}>please enter Product Quantity</div>
          )
        }
      </div>

      <div className="form-group">
        <label style={{ float: 'left' }}>
          <h6>Choose Category</h6>
        </label>
        {console.log(categoryFetchStore.response)}
        <select
          id="catTitle"
          class="custom-select custom-select-sm"
          size="0"
          required="required"
          onChange={categoryChangeHandler}>
          <option value="default">Choose</option>
          {categoryFetchStore.response &&
            categoryFetchStore.response.data &&
            categoryFetchStore.response.data.map((cat) => {
              return (
                <option
                  key={cat.cat_id}
                  value={cat.cat_id}
                  onChange={categoryChangeHandler}>
                  {cat.cat_title}
                </option>
              )
            })}
        </select>
      </div>

      <div className="form-group">
        <label style={{ float: 'left' }}>
          <h6>Choose Company</h6>
        </label>
        {console.log(companyFetchStore.response)}
        <select
          id="compTitle"
          class="custom-select custom-select-sm"
          size="0"
          required="required"
          onChange={companyChangeHandler}>
          <option value="default">Choose</option>
          {companyFetchStore.response &&
            companyFetchStore.response.data &&
            companyFetchStore.response.data.map((comp) => {
              return (
                <option
                  key={comp.comp_id}
                  value={comp.comp_id}
                  onChange={categoryChangeHandler}>
                  {comp.comp_title}
                </option>
              )
            })}
        </select>
      </div>

      <div className="form-group">
        <label style={{ float: 'left' }}>
          <h6>Choose Photo</h6>
        </label>

        <input
          type="file"
          className="form-control"
          name="prod_photo"
          placeholder="Product Photo"
          required="required"
          onChange={onFileSelected}
        />
      </div>

      <div className="form-group">
        <button
          type="submit"
          onClick={addnewProduct}
          className="btn btn-primary btn-block btn-lg">
          Save Product
        </button>
      </div>
    </div>
  )
}

export default AddProductScreen
