import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COMPANY_ADD_RESET } from '../../constants/productConstants'
import { addCompany } from '../../actions/companyAction'

const AddCompanyScreen = (props) => {
  const addCompanyStore = useSelector((state) => state.addCompanyStore)
  const { response, loading, error } = addCompanyStore

  const [companyTitle, setCompanyTitle] = useState('')
  const [companyDesc, setCompanyDesc] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (response && response.status == 'success') {
      dispatch({ type: COMPANY_ADD_RESET })
      props.history.push('/show-company')
    } else if (error) {
      // there is an error while making the API call
      console.log(error)
      alert('error while making API call')
    }
  }, [response, loading, error])

  const [validation, setValidation] = useState(false);

  const addCompanyButton = () => {
    console.log("in signup button function");

    if (companyTitle && companyDesc) {
      dispatch(addCompany(companyTitle, companyDesc));
    } else {
      console.log(validation);
      setValidation(true);
    }
  };

  return (
    <div className="signup-form">
      <h2>Add Company</h2>
      <hr />
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="company_name"
          placeholder="Company Name"
          required="required"
          onChange={(e) => setCompanyTitle(e.target.value)}
        />
        {validation == true && companyTitle == "" && (
          <div style={{ color: "red" }}>please enter Company Title</div>
        )}
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="company_desc"
          placeholder="Company description"
          required="required"
          onChange={(e) => setCompanyDesc(e.target.value)}
        />
        {validation == true && companyDesc == "" && (
          <div style={{ color: "red" }}>please enter Company Description</div>
        )}
      </div>

      <div className="form-group">
        <button
          type="submit"
          onClick={addCompanyButton}
          className="btn btn-primary btn-block btn-lg">
          SAVE
        </button>
      </div>
    </div>
  )
}

export default AddCompanyScreen
