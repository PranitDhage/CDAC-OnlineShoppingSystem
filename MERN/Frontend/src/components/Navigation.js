import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { applyForSeller } from "../actions/sellerActions";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { USER_SIGNOUT } from "../constants/userConstants";
import { CART_FETCH_RESET_AT_LOGIN } from "../constants/cartConstants";
import { getProductListBySearch } from "../actions/searchProductAction"
import { productPostReducer } from "../reducers/productReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navigation = () => {
  const dispatch = useDispatch();
  const userSigninStore = useSelector((store) => store.userSigninStore);

  const cartLoginStore = useSelector((state) => state.cartLoginStore);


  const searchProductStore = useSelector((state) => state.searchProductStore);

  const [product_name, setProduct_name] = useState('')

  const searchButton = (props) => {
    console.log('in search button function')
    dispatch(getProductListBySearch(product_name))
    history.push('/search-product')
  }

  const onApply = () => {
    dispatch(applyForSeller());
    toast("Apllied For Seller Successfully..! Please Relogin And Wait Until Admin Approves Your Request.");

    dispatch(logout());
  };

  const history = useHistory();

  const onLogout = () => {
    dispatch({
      type: CART_FETCH_RESET_AT_LOGIN,
    });
    dispatch({
      type: USER_SIGNOUT,
    });
    // history.push('/home')
    sessionStorage.removeItem("token");
    toast("Signed-out Successfully..!");

    history.push("/");
  };

  //On Refresh Page Divert to Sign in
  useEffect(() => {
    if (userSigninStore && userSigninStore.response == null) {
      sessionStorage.removeItem("token");
      toast("Please Signin to continue!");
      history.push("/");
    }
  }, []);

  return (
    <div>
      {userSigninStore && userSigninStore.response == null && (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link class="navbar-brand" to="/">
            E-Shopping
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link to="/">
                  <span className="nav-link">Home</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/about">
                  <span className="nav-link">About</span>
                </Link>
              </li>
            </ul>

            <ul class="navbar-nav mr-auto">
              <li class="d-flex">
                <input
                  class="form-control"
                  type="search"
                  placeholder="product name here..!!"
                  aria-label="Search"
                  onChange={(e) => setProduct_name(e.target.value)}
                />
                <button class="btn btn-outline-dark mx-2" onClick={searchButton}>search</button>
              </li>
            </ul>

            <div class="form-inline my-2 my-lg-0">
              <Link to="/signin">
                <button class="btn btn-outline-info my-2 my-sm-0">
                  Signin
                </button>
              </Link>
            </div>
          </div>


        </nav>
      )}

      {/* customer navbar */}
      {userSigninStore &&
        userSigninStore.response &&
        userSigninStore.response.status == "success" &&
        (userSigninStore.response.data.role == "CUSTOMER" ||
          userSigninStore.response.data.role == "CUSTSELL") && (
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link class="navbar-brand" to="/">
              E-Shopping
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <Link to="/">
                    <span className="nav-link">Home</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/about">
                    <span className="nav-link">About</span>
                  </Link>
                </li>
              </ul>

              <ul class="navbar-nav mr-auto">
                <li class="d-flex">
                  <input
                    class="form-control"
                    type="search"
                    placeholder="product name here..!!"
                    aria-label="Search"
                    onChange={(e) => setProduct_name(e.target.value)}
                  />
                  <button class="btn btn-outline-dark mx-2" onClick={searchButton}>search</button>
                </li>
              </ul>

              <div class="form-inline my-2 my-lg-0">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Profile
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link to="/edit-profile">
                        <a class="dropdown-item">Edit Profile</a>
                      </Link>
                      <Link to="/user-myorder">
                        <a class="dropdown-item">My Orders</a>
                      </Link>
                      <div class="dropdown-divider"></div>
                      {userSigninStore.response.data.role == "CUSTOMER" && (
                        <button class="dropdown-item" onClick={onApply}>
                          Apply For Seller
                        </button>
                      )}
                    </div>
                  </li>
                </ul>

                {cartLoginStore &&
                  cartLoginStore.response &&
                  cartLoginStore.response.data && (
                    <span>
                      <ul class="navbar-nav flex-row justify-content-end flex-wrap align-items-center mr-lg-4 mr-xl-0">
                        <li class="nav-item px-3 text-uppercase mb-0 position-relative d-lg-flex">
                          <div id="cart" class="d-none" />
                          <Link
                            to="/cart"
                            class="cart position-relative d-inline-flex"
                            aria-label="View your shopping cart"
                          >
                            <i class="fas fa fa-shopping-cart fa-lg" />
                            <span class="cart-basket d-flex align-items-center justify-content-center">
                              {cartLoginStore.response.data.length}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </span>
                  )}

                <button
                  class="btn btn-outline-info my-2 my-sm-0"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            </div>




          </nav>
        )}

      {/* Seller navbar */}

      {userSigninStore &&
        userSigninStore.response &&
        userSigninStore.response.status == "success" &&
        userSigninStore.response.data.role == "SELLER" && (
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link class="navbar-brand" to="/">
              E-Shopping
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <Link to="/">
                    <span className="nav-link">Home</span>
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/seller">
                    <span className="nav-link">Seller Dashboard</span>
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/about">
                    <span className="nav-link">About</span>
                  </Link>
                </li>
              </ul>

              <ul class="navbar-nav mr-auto">
                <li class="d-flex">
                  <input
                    class="form-control"
                    type="search"
                    placeholder="product name here..!!"
                    aria-label="Search"
                    onChange={(e) => setProduct_name(e.target.value)}
                  />
                  <button class="btn btn-outline-dark mx-2" onClick={searchButton}>search</button>
                </li>
              </ul>

              <div class="form-inline my-2 my-lg-0">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Profile
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link to="/edit-profile">
                        <a class="dropdown-item">Edit Profile</a>
                      </Link>
                      <Link to="/user-myorder">
                        <a class="dropdown-item">My Orders</a>
                      </Link>
                    </div>
                  </li>
                </ul>

                {cartLoginStore &&
                  cartLoginStore.response &&
                  cartLoginStore.response.data && (
                    <span>
                      <ul class="navbar-nav flex-row justify-content-end flex-wrap align-items-center mr-lg-4 mr-xl-0">
                        <li class="nav-item px-3 text-uppercase mb-0 position-relative d-lg-flex">
                          <div id="cart" class="d-none" />
                          <Link
                            to="/cart"
                            class="cart position-relative d-inline-flex"
                            aria-label="View your shopping cart"
                          >
                            <i class="fas fa fa-shopping-cart fa-lg" />
                            <span class="cart-basket d-flex align-items-center justify-content-center">
                              {cartLoginStore.response.data.length}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </span>
                  )}

                <button
                  class="btn btn-outline-info my-2 my-sm-0"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )}

      {/* Admin navbar */}
      {userSigninStore &&
        userSigninStore.response &&
        userSigninStore.response.status == "success" &&
        userSigninStore.response.data.role == "ADMIN" && (
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link class="navbar-brand" to="/">
              E-Shopping
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <Link to="/">
                    <span className="nav-link">Home</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/admin">
                    <span className="nav-link">Admin Dashboard</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/about">
                    <span className="nav-link">About</span>
                  </Link>
                </li>
              </ul>

              <ul class="navbar-nav mr-auto">
                <li class="d-flex">
                  <input
                    class="form-control"
                    type="search"
                    placeholder="product name here..!!"
                    aria-label="Search"
                    onChange={(e) => setProduct_name(e.target.value)}
                  />
                  <button class="btn btn-outline-dark mx-2" onClick={searchButton}>search</button>
                </li>
              </ul>

              <div class="form-inline my-2 my-lg-0">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Profile
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link to="/edit-profile">
                        <a class="dropdown-item">Edit Profile</a>
                      </Link>
                      <Link to="/user-myorder">
                        <a class="dropdown-item">My Orders</a>
                      </Link>
                    </div>
                  </li>
                </ul>

                {cartLoginStore &&
                  cartLoginStore.response &&
                  cartLoginStore.response.data && (
                    <span>
                      <ul class="navbar-nav flex-row justify-content-end flex-wrap align-items-center mr-lg-4 mr-xl-0">
                        <li class="nav-item px-3 text-uppercase mb-0 position-relative d-lg-flex">
                          <div id="cart" class="d-none" />
                          <Link
                            to="/cart"
                            class="cart position-relative d-inline-flex"
                            aria-label="View your shopping cart"
                          >
                            <i class="fas fa fa-shopping-cart fa-lg" />
                            <span class="cart-basket d-flex align-items-center justify-content-center">
                              {cartLoginStore.response.data.length}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </span>
                  )}

                <button
                  class="btn btn-outline-info my-2 my-sm-0"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )}
    </div>
  );
};

export default Navigation;
