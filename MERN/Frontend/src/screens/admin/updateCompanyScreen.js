//import Profile from '../image/profile.svg';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCompany } from '../../actions/companyAction'
import { COMPANY_UPDATE_REQUEST } from '../../constants/productConstants'
import { COMPANY_UPDATE_SUCCESS } from '../../constants/productConstants'
import { COMPANY_UPDATE_FAIL } from '../../constants/productConstants'

const UpdateCompanyScreen = (props) => {
  console.log(`props.location.state--->${props.location.state.comp_id}`)

  const comp_title = props.location.state.comp_title
  const comp_description = props.location.state.comp_description
  const comp_id = props.location.state.comp_id

  // constants
  const [compTitle, setCompTitle] = useState('' + comp_title)
  const [compDescription, setCompDescription] = useState('' + comp_description)

  // store
  const updateComponyStore = useSelector((state) => state.updateComponyStore)
  const { response, loading, error } = updateComponyStore

  const dispatch = useDispatch()


  const [validation, setValidation] = useState(false);

  const updateButton = () => {
    if (comp_id && compTitle && compDescription) {
      dispatch(updateCompany(comp_id, compTitle, compDescription));
      props.history.push("/show-company");
    } else {
      console.log(validation);
      setValidation(true);
    }
  };

  return (
    <div className="signup-form">
      <h2>Update Company</h2>
      <hr />
      <div className="form-group" style={{ textAlign: "left" }}>
        <label><strong>Company Name</strong></label>
        <input
          defaultValue={compTitle}
          type="text"
          className="form-control"
          name="company_name"
          required="required"
          onChange={(e) => setCompTitle(e.target.value)}
        />
        {validation == true && compTitle == "" && (
          <div style={{ color: "red" }}>please enter Company Title</div>
        )}
      </div>

      <div className="form-group" style={{ textAlign: "left" }}>
        <label><strong>Company description</strong></label>
        <textarea
          defaultValue={compDescription}
          className="form-control"
          name="company_desc"
          required="required"
          onChange={(e) => setCompDescription(e.target.value)}
        />
        {validation == true && compDescription == "" && (
          <div style={{ color: "red" }}>please enter Company Descrption</div>
        )}
      </div>

      <div className="form-group">
        <button
          type="submit"
          onClick={updateButton}
          className="btn btn-primary btn-block btn-lg">
          SAVE
        </button>
      </div>
    </div>
  )
}

export default UpdateCompanyScreen
