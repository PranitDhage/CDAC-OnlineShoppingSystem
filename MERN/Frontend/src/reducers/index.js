import { combineReducers } from 'redux'
import {
  userApproveReducer,
  userListReducer,
  userSignupReducer,
  userSuspendReducer,
} from './userReducer'
import { userSigninReducer, userProfileReducer } from './userReducer'
import {
  companyFetchReducer,
  getProductReducer,
  productPostReducer,
  productUpdateReducer,
  productDeleteReducer,
  categoryFetchReducer,
  getProductRatingReducer,
  getProductCommentReducer,
  // sellerProfileReducer
} from './productReducer'

import { viewOrderDetailsReducer } from './orderReducer'
import {
  cartCheckoutReducer,
  cartFetchAtLoginReducer,
  cartFetchReducer,
  cartReducer,
  cartRemoveReducer,
  updateCartReducer,
} from './cartReducer'
import { getMyorderReducer, updateMyorderReducer } from './myorderReducer'
import {
  addCompanyReducer,
  deleteCompanyReducer,
  getCompanyReducer,
  updateCompanyReducer,
} from './companyReducer'
import {
  addCategoryReducer,
  deleteCategoryReducer,
  getCategoryReducer,
  updateCategoryReducer,
} from './categoryReducer'

import {
  paymentReducer,
  dataReducer,
  ratingReducer,
  maxSaleProductReducer,
  monthWiseRevenueReducer,
} from './adminDashBoardReducer'

import {
  sellerApplyReducer,
  gettingSellerMaxProductReducer,
  getSellerTotalRevenue,
  getSellerCustAvgRating,
  getSellerMontlyRevenueReducer,
  getAllCustomersMyOrderForSellerReducer,
} from './sellerReducer'
import { addAddressReducer, fetchAddressReducer } from './AddressReducers'
import { searchProductReducer } from './searchProductReducer'

const reducers = combineReducers({
  //user stores
  userSignupStore: userSignupReducer,
  userSigninStore: userSigninReducer,
  editProfileStore: userProfileReducer,
  userListStore: userListReducer,
  userApproveStore: userApproveReducer,
  userSuspendStore: userSuspendReducer,

  //address store
  addAddressStore: addAddressReducer,
  fetchAddressStore: fetchAddressReducer,

  //product stores
  allProductStore: getProductReducer,
  addProductStore: productPostReducer,
  updateProductStore: productUpdateReducer,
  deleteProductStore: productDeleteReducer,
  getProductRatingStore: getProductRatingReducer,
  getProductCommentStore: getProductCommentReducer,
  searchProductStore: searchProductReducer,

  //cart stores
  cartStore: cartReducer, // cart add reducer
  cartRemoveStore: cartRemoveReducer, //cart item remove store & reducer
  cartItemsStore: cartFetchReducer,
  updateCartStore: updateCartReducer,
  cartLoginStore: cartFetchAtLoginReducer,
  cartCheckoutStore: cartCheckoutReducer,

  //category and company store
  categoryFetchStore: categoryFetchReducer,
  companyFetchStore: companyFetchReducer,

  getComponyStore: getCompanyReducer,
  updateComponyStore: updateCompanyReducer,
  deleteComponyStore: deleteCompanyReducer,
  addCompanyStore: addCompanyReducer,

  getCategoryStore: getCategoryReducer,
  updateCategoryStore: updateCategoryReducer,
  deleteCategoryStore: deleteCategoryReducer,
  addCategoryStore: addCategoryReducer,

  //seller apply store
  sellerApplyStore: sellerApplyReducer,
  gettingSellerMaxProductStore: gettingSellerMaxProductReducer,
  getSellerTotalStore: getSellerTotalRevenue,
  getSellerCustAvgStore: getSellerCustAvgRating,
  getSellerMontlyRevenueStore: getSellerMontlyRevenueReducer,

  // all myorders of customers of perticular seller
  getAllCustomerMyOrdersForSellerStore: getAllCustomersMyOrderForSellerReducer,

  //order Details
  viewOrderDetailsStore: viewOrderDetailsReducer,

  //My Order
  viewMyOrderStore: getMyorderReducer,
  updateMyOrderStore: updateMyorderReducer,

  //payment
  paymentStore: paymentReducer,
  dataStore: dataReducer,
  ratingStore: ratingReducer,
  maxSaleProductStore: maxSaleProductReducer,
  monthWiseRevenueStore: monthWiseRevenueReducer,
})

export default reducers
