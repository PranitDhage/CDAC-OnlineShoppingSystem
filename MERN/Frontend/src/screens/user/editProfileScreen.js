import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editprofile } from '../../actions/userActions'
import Profile from '../../image/profile.svg'
import { USER_PROFILE_RESET } from '../../constants/userConstants'
import { toast } from 'react-toastify'

const EditProfileScreen = (props) => {
  const userSigninStore = useSelector((state) => state.userSigninStore)
  const { name, email, phone } = userSigninStore.response.data

  const editProfileStore = useSelector((state) => state.editProfileStore)
  const { response, loading, error } = editProfileStore

  const [password, setPassword] = useState('')
  const [uname, setUname] = useState('' + name)
  const [uphone, setUphone] = useState('' + phone)

  const dispatch = useDispatch()

  const saveButton = () => {
    console.log('in edit button function')
    dispatch(editprofile(password, uname, uphone))
  }

  useEffect(() => {
    if (response && response.status == 'success') {
      dispatch({ type: USER_PROFILE_RESET })
      toast("Profile Updated successfully!");
      props.history.push('/')
    } else if (error) {
      // there is an error while making the API call
      console.log(error)
      alert('error while making API call')
    }
  }, [response, loading, error])

  return (
    <div>
      <div className="my-5">
        <h1 className="text-center">Edit Profile</h1>
      </div>

      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6" col-10 mx-auto>
            <img
              src={Profile}
              className="img-fluid contact-img"
              alt="profile img"
              height="250"
              width="250"
            />
          </div>

          <div className="col-md-6" col-10 mx-auto>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                <strong>Full Name</strong>
              </label>
              <input
                defaultValue={name}
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Your Name"
                onChange={(e) => setUname(e.target.value)}
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                <strong>Email Address</strong>
              </label>

              <input
                defaultValue={email}
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                disabled
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                <strong>Contact Number</strong>
              </label>
              <input
                defaultValue={phone}
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Your Contact Number"
                onChange={(e) => setUphone(e.target.value)}
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                <strong>Password</strong>
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
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

export default EditProfileScreen
