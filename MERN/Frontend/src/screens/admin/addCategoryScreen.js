//import Profile from '../../image/profile.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addCategory } from '../../actions/categoryAction'
import { CATEGORY_ADD_SUCCESS } from '../../constants/productConstants'

const AddCategoryScreen = (props) => {
  const [cat_title, setCat_title] = useState('')
  const [cat_description, setCat_description] = useState('')

  const addCategoryStore = useSelector((state) => state.addCategoryStore)
  const { response, loading, error } = addCategoryStore

  const dispatch = useDispatch()

  useEffect(() => {
    if (response && response.status == 'success') {
      dispatch({ type: CATEGORY_ADD_SUCCESS })
      toast("Category Added successfully!");
      props.history.push('/get-category')
    } else if (error) {
      // there is an error while making the API call
      console.log(error)
      alert('error while making API call')
    }
  }, [response, loading, error])

  const [validation, setValidation] = useState(false);

  const saveButton = () => {
    console.log(`in saveButton Method`)
    if (cat_title && cat_description) {
      dispatch(addCategory(cat_title, cat_description));
    } else {
      console.log(validation);
      setValidation(true);
    }
  }

  return (
    <div className="signup-form">
      <h2>
        {' '}
        <strong>Add Category Details</strong>{' '}
      </h2>
      <hr />
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Category Title"
          required="required"
          onChange={(e) => setCat_title(e.target.value)}
        />
        {validation == true && cat_title == "" && (
          <div style={{ color: "red" }}>please enter Category Title</div>
        )}


      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Category description"
          required="required"
          onChange={(e) => setCat_description(e.target.value)}
        />
        {validation == true && cat_description == "" && (
          <div style={{ color: "red" }}>please enter Category description </div>
        )}
      </div>

      <div className="form-group">
        <button
          type="submit"
          onClick={saveButton}
          className="btn btn-primary btn-block btn-lg">
          SAVE
        </button>
      </div>
    </div>
  )
}

export default AddCategoryScreen
