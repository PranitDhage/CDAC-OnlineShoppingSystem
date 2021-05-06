import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import { getAllCartItemsAtLogin } from '../../actions/cartActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SigninScreen = (props) => {
  const userSigninStore = useSelector((state) => state.userSigninStore)
  const { response, loading, error } = userSigninStore

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const signinButton = () => {
    console.log('in signin button function')
    dispatch(signin(email, password))
  }

  useEffect(() => {
    if (response && response.status == 'success') {
      sessionStorage.setItem('token', response.data.token)
      dispatch(getAllCartItemsAtLogin())
      toast(`Welcome ${response.data.name}!`);
      props.history.push('/')
    } else if (error) {
      // there is an error while making the API call
      console.log(error)
      alert('error while making API call')
    }
  }, [response, loading, error])

  return (
    <div class="signin-form">
      <h2>Sign In</h2>
      <hr />
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          name="email"
          placeholder="Email Address"
          required="required"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div class="form-group">
        <input
          type="password"
          class="form-control"
          name="password"
          placeholder="Password"
          required="required"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div class="form-group">
        <button
          type="submit"
          onClick={signinButton}
          class="btn btn-primary btn-block btn-lg">
          Sign In
        </button>
      </div>

      <div class="text-center">
        New User?{' '}
        <Link to="/signup" style={{ color: 'blue' }}>
          SignUp here
        </Link>
      </div>
    </div>
  )
}

export default SigninScreen
