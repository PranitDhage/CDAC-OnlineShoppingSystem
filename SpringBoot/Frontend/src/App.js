import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//common screens
import HomeScreen from './screens/common/homeScreen'
import SignupScreen from './screens/common/signupScreen'
import SigninScreen from './screens/common/signinScreen'
import ProductDetailsScreen from './screens/common/productDetailsScreen'
import CartScreen from './screens/common/cartScreen'
import OrderDetailsScreen from './screens/common/orderDetailsScreen'
import searchScreen from './screens/common/searchProducts'

//user screens
import EditProfileScreen from './screens/user/editProfileScreen'
import AddAddressScreen from './screens/user/addAddressScreen'
import productRatingScreen from './screens/user/productRatingScreen'
import UserMyOrderScreen from './screens/user/userMyorderScreen'
import ShowUserAddresses from './screens/user/showUserAddresses'

//seller screens
import addProductList from './screens/seller/addProductScreen'
import sellerScreen from './screens/seller/sellerScreen'
import EditSellerProductScreen from './screens/seller/editSellerProductScreen'
import SellerProductScreen from './screens/seller/sellerProductScreen'
import SellerAllCustomersMyOrderScreen from './screens/seller/sellerAllCustomersMyOrderScreen'

//admin screens
import categoryScreen from './screens/admin/categoryListScreen'
import showAllOrdersAdminScreen from './screens/admin/showAllOrdersAdminScree'
import updateCategoryScreen from './screens/admin/updateCategoryScreen'
import addCategoryScreen from './screens/admin/addCategoryScreen'
import ShowAllProductAdminScreen from './screens/admin/showAllProductAdminScreen'
import SellerListScreen from './screens/admin/sellerListScreen'
import AdminScreen from './screens/admin/adminScreen'
import updateCompanyScreen from './screens/admin/updateCompanyScreen'
import showCompanyScreen from './screens/admin/showCompanysScreen'
import addCompanyScreen from './screens/admin/addCompanyScreen'
import UserListScreen from './screens/admin/userListScreen'

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <ToastContainer />
        <Route exact path="/" component={HomeScreen} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/signup" component={SignupScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/add-product" component={addProductList} />
        <Route path="/edit-profile" component={EditProfileScreen} />
        <Route path="/cart" component={CartScreen} />
        <Route path="/admin" component={AdminScreen} />
        <Route path="/seller" component={sellerScreen} />
        <Route path="/order-details" component={OrderDetailsScreen} />
        <Route path="/show-product" component={SellerProductScreen} />
        <Route
          path="/seller-update-product"
          component={EditSellerProductScreen}
        />
        <Route path="/productdetails/:id" component={ProductDetailsScreen} />
        <Route path="/all-customers-myorders-for-seller" component={SellerAllCustomersMyOrderScreen} />
        <Route path="/get-users" component={UserListScreen} />
        <Route path="/get-seller" component={SellerListScreen} />
        <Route path="/add-company" component={addCompanyScreen} />
        <Route path="/show-company" component={showCompanyScreen} />
        <Route path="/update-company" component={updateCompanyScreen} />
        <Route path="/get-category" component={categoryScreen} />
        <Route path="/update-category" component={updateCategoryScreen} />
        <Route path="/add-category" component={addCategoryScreen} />
        <Route
          path="/get-product-admin"
          component={ShowAllProductAdminScreen}
        />
        <Route path="/rate-product/:id" component={productRatingScreen} />
        <Route
          path="/admin-order-details"
          component={showAllOrdersAdminScreen}
        />
        <Route path="/user-myorder" component={UserMyOrderScreen} />
        <Route path="/add-new-address" component={AddAddressScreen} />
        <Route path="/view-user-addresses" component={ShowUserAddresses} />
        <Route path="/search-product" component={searchScreen} />
      </Router>
    </div>
  )
}

export default App
