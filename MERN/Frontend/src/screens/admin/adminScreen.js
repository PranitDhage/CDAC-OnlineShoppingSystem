import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from 'recharts'
import {
  getPayment,
  getRating,
  getMaxSalesProduct,
  getMonthWiseRevenue,
} from '../../actions/adminDashBoardActions'

const AdminScreen = (props) => {
  
  const paymentStore = useSelector((store) => store.paymentStore)
  

  const ratingStore = useSelector((store) => store.ratingStore)

  const maxSaleProductStore = useSelector((store) => store.maxSaleProductStore)

  const monthWiseRevenueStore = useSelector(
    (store) => store.monthWiseRevenueStore
  )
  const dispatch = useDispatch()


  useEffect(() => {
    console.log('in use effect')
    //dispatch(getAllCartItems());
    dispatch(getPayment())
    dispatch(getRating())
    dispatch(getMaxSalesProduct())
    dispatch(getMonthWiseRevenue())
  }, [])

  const showAllUsersHandler = () => {
    props.history.push("/get-users")
  }

  const showAllSeller = () => {
    props.history.push("/get-seller")
  }

  const showAllProducts = () => {
    props.history.push("/get-product-admin")
  }

  const showAllCompanies = () => {
    props.history.push("/show-company")
  }

  const showAllCategories = () => {
    props.history.push("/get-category")
  }

  const showAllOrders = () => {
    props.history.push("/admin-order-details")
  }

  return (
    <div id="wrapper">
      <div className="d-flex flex-column container" id="content-wrapper">
        <div id="content">
          <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
              <h3 className="text-dark mb-0">Admin Dashboard</h3>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-primary py-2">
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col mr-2">
                        <div className="text-uppercase text-primary font-weight-bold text-xs mb-1">
                          <span>Total Revenue</span>
                        </div>
                        <div className="text-dark font-weight-bold h5 mb-0">
                          {paymentStore.response &&
                            paymentStore.response.data &&
                            paymentStore.response.data.length >= 0 &&
                            paymentStore.response.data.map((p) => {
                              return (<span>₹ {p.TotalRevenue}</span>)
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-success py-2">
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col mr-2">
                        <div className="text-uppercase text-success font-weight-bold text-xs mb-1">
                          <span>Cust. Satisfaction</span>
                        </div>
                        <div className="text-dark font-weight-bold h5 mb-0">
                          {ratingStore.response &&
                            ratingStore.response.data &&
                            ratingStore.response.data.length >= 0 &&
                            ratingStore.response.data.map((p) => {
                              return (
                                <span>{p.Customer_satisfaction}%</span>
                              )
                            })}
                        </div>
                      </div>
                      <div className="col-auto"><i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-info py-2">
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col mr-2">
                        <div className="text-uppercase text-info font-weight-bold text-xs mb-1">
                          <span>Max Sales (Product)</span>
                        </div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div className="text-dark font-weight-bold h5 mb-0 mr-3" >
                              {maxSaleProductStore.response &&
                                maxSaleProductStore.response.data &&
                                maxSaleProductStore.response.data.length >= 0 &&
                                maxSaleProductStore.response.data.map((p) => {
                                  return (
                                    <span >{p.prod_title}</span>
                                  )
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-warning py-2">
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col mr-2">
                        <div className="text-uppercase text-warning font-weight-bold text-xs mb-1">
                          <span>Monthly Revenue</span>
                        </div>
                        <div className="text-dark font-weight-bold h5 mb-0"><span>0</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-7 col-xl-8" style={{ "max-width": "auto" }}>
                <div className="card shadow mb-4">

                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary font-weight-bold m-0">Earnings Overview</h6>
                  </div>

                  <div className="card-body">
                    <BarChart
                      width={500}
                      height={300}
                      data={
                        monthWiseRevenueStore.response &&
                        monthWiseRevenueStore.response.data
                      }
                      margin={{
                        top: 5,
                        right: 30,
                        left: 80,
                        bottom: 5,
                      }}
                      barSize={20}>
                      <XAxis
                        dataKey="month"
                        scale="point"
                        padding={{ left: 40, right: 10 }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar
                        dataKey="revenue"
                        fill="#8884d8"
                        background={{ fill: '#eee' }}
                      />
                    </BarChart>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-xl-4">
                <div className="card shadow mb-4"></div>
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-primary shadow">
                      <div className="card-body">
                        <button className="btn btn-primary" onClick={showAllUsersHandler}>
                          Show All Users
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-success shadow">
                      <div className="card-body">
                        <button className="btn btn-success" onClick={showAllSeller}>
                          Show All Seller
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-info shadow">
                      <div className="card-body">
                        <button className="btn btn-info" onClick={showAllProducts}>
                          Show All Products
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-warning shadow">
                      <div className="card-body">
                        <button className="btn btn-warning" onClick={showAllCompanies}>
                          Show All Comp.
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-danger shadow">
                      <div className="card-body">
                        <button className="btn btn-danger" onClick={showAllCategories}>
                          Show All Category
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-secondary shadow">
                      <div className="card-body">
                        <button className="btn btn-secondary" onClick={showAllOrders}>
                          Show All Orders
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AdminScreen
