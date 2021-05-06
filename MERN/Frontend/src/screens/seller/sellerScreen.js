import { Link } from 'react-router-dom'
import {
  getSellerMaxSaleProducts,
  getSellerTotalRevenue,
  getSellerCustAvgRating,
  getSellerMonthlyRevenue,
} from '../../actions/sellerActions'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from 'recharts'
const SellerScreen = (props) => {
  const gettingSellerMaxProductStore = useSelector(
    (store) => store.gettingSellerMaxProductStore
  )
  const getSellerTotalStore = useSelector((store) => store.getSellerTotalStore)
  const getSellerCustAvgStore = useSelector(
    (store) => store.getSellerCustAvgStore
  )
  const getSellerMontlyRevenueStore = useSelector(
    (store) => store.getSellerMontlyRevenueStore
  )
  const dispatch = useDispatch()

  // console.log(getSellerMontlyRevenueStore.response.data.total)

  useEffect(() => {
    console.log('in use effect')
    //dispatch(getAllCartItems());
    dispatch(getSellerMaxSaleProducts())
    dispatch(getSellerTotalRevenue())
    dispatch(getSellerCustAvgRating())
    dispatch(getSellerMonthlyRevenue())
  }, [])

  const showProduct = () => {
    props.history.push('/show-product')
  }

  const viewAllCustomerMyorders = () => {
    props.history.push('/all-customers-myorders-for-seller')
  }

  const addProduct = () => {
    props.history.push('/add-product')
  }

  return (
    <div className="seller-div">
      <div id="wrapper">
        <div className="d-flex flex-column container" id="content-wrapper">
          <div id="content">
            <div className="container-fluid">
              <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Seller Dashboard</h3>
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
                            {getSellerTotalStore.response &&
                              getSellerTotalStore.response.data &&
                              getSellerTotalStore.response.data.length >= 0 &&
                              getSellerTotalStore.response.data.map((p) => {
                                return <span>₹ {p.total_price}</span>
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
                            {getSellerCustAvgStore.response &&
                              getSellerCustAvgStore.response.data &&
                              getSellerCustAvgStore.response.data.length >= 0 &&
                              getSellerCustAvgStore.response.data.map((p) => {
                                return <span>{p.rating_per}%</span>
                              })}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                          <div className="text-dark font-weight-bold h5 mb-0">
                            {getSellerMontlyRevenueStore.response &&
                              getSellerMontlyRevenueStore.response.data &&
                              getSellerMontlyRevenueStore.response.data
                                .length >= 0 &&
                              getSellerMontlyRevenueStore.response.data.map(
                                (p) => {
                                  return <span>{p.total}</span>
                                }
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div
                  className="col-lg-7 col-xl-8"
                  style={{ 'max-width': 'auto' }}>
                  <div className="card shadow mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h6 className="text-primary font-weight-bold m-0">
                        Your TOP 5 Sales Product
                      </h6>
                    </div>

                    <div className="card-body">
                      <BarChart
                        width={500}
                        height={300}
                        data={
                          gettingSellerMaxProductStore.response &&
                          gettingSellerMaxProductStore.response.data
                        }
                        margin={{
                          top: 5,
                          right: 30,
                          left: 40,
                          bottom: 5,
                        }}
                        barSize={20}>
                        <XAxis
                          dataKey="prod_title"
                          scale="point"
                          padding={{ left: 50, right: 10 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar
                          dataKey="no_of_qty"
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
                      <div className="card text-white bg-success shadow">
                        <div className="card-body">
                          <button
                            className="btn btn-success"
                            onClick={showProduct}>
                            Show Products
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card text-white bg-info shadow">
                        <div className="card-body">
                          <button
                            className="btn btn-info"
                            onClick={viewAllCustomerMyorders}>
                            Customer Orders
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card text-white bg-secondary shadow">
                        <div className="card-body">
                          <button
                            className="btn btn-secondary"
                            onClick={addProduct}>
                            Add Product
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
      </div>
    </div>
  )
}

export default SellerScreen
