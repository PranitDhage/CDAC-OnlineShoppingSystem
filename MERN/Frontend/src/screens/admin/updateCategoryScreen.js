import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory } from '../../actions/categoryAction'
import { CATEGORY_UPDATE_SUCCESS } from '../../constants/productConstants'

const UpdateCategoryScreen = (props) => {
  const cat_id = props.location.state.cat_id
  const cat_title = props.location.state.cat_title
  const cat_desc = props.location.state.cat_description

  const updateCategoryStore = useSelector((state) => state.updateCategoryStore)
  const { response, loading, error } = updateCategoryStore

  const dispatch = useDispatch()

  const [catTitle, setCatTitle] = useState('' + cat_title)
  const [catDesc, setCatDesc] = useState('' + cat_desc)

  useEffect(() => {
    if (response && response.status == 'success') {
      dispatch({ type: CATEGORY_UPDATE_SUCCESS })
      props.history.push('/get-category')
    } else if (error) {
      // there is an error while making the API call
      console.log(error)
      alert('error while making API call')
    }
  }, [response, loading, error])

  const [validation, setValidation] = useState(false);
  const saveButton = () => {
    console.log(`in saveButton Method`);

    if (cat_id && catTitle && catDesc) {
      dispatch(updateCategory(cat_id, catTitle, catDesc));
    } else {
      console.log(validation);
      setValidation(true);
    }
  };

  return (
    <div className="signup-form">
      <h2>
        {' '}
        <strong>Update Category Details</strong>{' '}
      </h2>
      <hr />
      <div className="form-group" style={{ textAlign: 'left' }}>
        <label>
          <strong>Category Title</strong>
        </label>
        <input
          defaultValue={catTitle}
          type="text"
          className="form-control"
          placeholder="Category Title"
          required="required"
          onChange={(e) => setCatTitle(e.target.value)}
        />
        {validation == true && catTitle == "" && (
          <div style={{ color: "red" }}>please enter Category Title</div>
        )}
      </div>

      <div className="form-group" style={{ textAlign: 'left' }}>
        <label>
          <strong>Category Description</strong>
        </label>
        <textarea
          defaultValue={catDesc}
          className="form-control"
          placeholder="Category description"
          required="required"
          onChange={(e) => setCatDesc(e.target.value)}
        />
        {validation == true && catDesc == "" && (
          <div style={{ color: "red" }}>please enter Category Description</div>
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

export default UpdateCategoryScreen
