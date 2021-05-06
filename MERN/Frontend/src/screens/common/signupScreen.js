import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import { USER_SIGNUP_RESET } from '../../constants/userConstants'

const SignupScreen = (props) => {
  const userSignupStore = useSelector((state) => state.userSignupStore)
  const { response, loading, error } = userSignupStore

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const dispatch = useDispatch()

  const [validation, setValidation] = useState(false);

  const signupButton = () => {
    if (email && password && name && phone) {
      dispatch(signup(email, password, name, phone));
    } else {
      console.log(validation);
      setValidation(true);
    }
  };

  useEffect(() => {
    if (response && response.status == 'success') {
      dispatch({ type: USER_SIGNUP_RESET })
      props.history.push('/')
    } else if (error) {
      // there is an error while making the API call
      console.log(error)
      alert('error while making API call')
    }
  }, [response, loading, error])

  return (
    <div className="signup-form">
      <div className="form">
        <h2>Sign Up</h2>
        <p>It's free and only takes a minute.</p>
        <hr />
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Username"
            required="required"
            onChange={(e) => setName(e.target.value)}
          />
          {validation == true && name == "" && (
            <div style={{ color: "red" }}>please enter valid Name</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email Address"
            required="required"
            onChange={(e) => setEmail(e.target.value)}
          />
          {validation == true && email == "" && (
            <div style={{ color: "red" }}>
              please enter valid Email
            </div>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="phone"
            placeholder="Contact Number"
            required="required"
            onChange={(e) => setPhone(e.target.value)}
          />
          {validation == true && phone == "" && (
            <div style={{ color: "red" }}>please enter valid Phone Number</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required="required"
            onChange={(e) => setPassword(e.target.value)}
          />
          {validation == true && password == "" && (
            <div style={{ color: "red" }}>please enter valid password</div>
          )}
        </div>

        <div className="form-group">
          <button
            type="submit"
            onClick={signupButton}
            className="btn btn-primary btn-block btn-lg">
            Sign Up
          </button>
        </div>
      </div>
      <p className="small text-center">
        By clicking the Sign Up button, you agree to our <br />
        <a href="#" style={{ color: 'blue' }}>
          Terms &amp; Conditions
        </a>
        , and{' '}
        <a href="#" style={{ color: 'blue' }}>
          Privacy Policy
        </a>
        .
      </p>

      <div className="text-center">
        Already have an account?{' '}
        <Link to="/signin" style={{ color: 'blue' }}>
          Signin here
        </Link>
      </div>
    </div>
  )
}

export default SignupScreen
