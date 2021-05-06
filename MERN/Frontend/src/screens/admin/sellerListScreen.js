import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllSellers,
  approveSeller,
  suspendSelller,
} from '../../actions/userActions'

const SellerListScreen = (props) => {
  // get seller list
  const userListStore = useSelector((store) => store.userListStore)
  const { error, response, loading } = userListStore

  const dispatch = useDispatch()

  // to approve seller account
  const userApproveStore = useSelector((state) => state.userApproveStore)

  // to suspend seller account
  const userSuspendStore = useSelector((state) => state.userSuspendStore)

  // call this only once (when the page has loaded successfully)
  useEffect(() => {
    dispatch(getAllSellers())
  }, [])

  // call's when approve button pressed
  useEffect(async () => {
    if (
      userApproveStore.response &&
      userApproveStore.response.status == 'success'
    ) {
      await dispatch(getAllSellers())
    }
  }, [
    userApproveStore.response,
    userApproveStore.error,
    userApproveStore.loading,
  ])

  // call's when suspend button pressed
  useEffect(async () => {
    if (
      userSuspendStore.response &&
      userSuspendStore.response.status == 'success'
    ) {
      await dispatch(getAllSellers())
    }
  }, [
    userSuspendStore.response,
    userSuspendStore.error,
    userSuspendStore.loading,
  ])

  const onApprove = (u) => {
    dispatch(approveSeller(u.user_id))
  }

  const onSuspend = (u) => {
    dispatch(suspendSelller(u.user_id))
  }

  const goBackHandler = () => {
    props.history.push('/admin')
  }

  return (
    <div className="container">
      <div className="text-left border border-light p-3 mb-2">
        <button
          className="text-left btn btn-outline-success"
          style={{ flex: 'left' }}
          onClick={goBackHandler}>
          Go Back
        </button>
      </div>
      <div id="wrapper">
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <div className="container-fluid">
              <div className="card shadow">
                <div className="card-header py-3">
                  <p className="text-primary m-0 fw-bold">Seller's List</p>
                </div>
                <div className="card-body">
                  <div
                    className="table-responsive table mt-2"
                    id="dataTable"
                    role="grid"
                    aria-describedby="dataTable_info">
                    <table className="table my-0" id="dataTable">
                      <thead>
                        <tr>
                          <th>UserId</th>
                          <th>User Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Role</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {response &&
                          response.data &&
                          response.data.length > 0 &&
                          response.data.map((u) => {
                            return (
                              <tr>
                                <td>{u.user_id}</td>
                                <td>{u.user_name}</td>
                                <td>{u.user_email}</td>
                                <td>{u.user_status}</td>
                                <td>{u.user_role}</td>
                                <td>
                                  {u.user_role == 'CUSTSELL' && (
                                    <button
                                      onClick={() => onApprove(u)}
                                      type="button"
                                      className="btn btn-outline-success">
                                      Approve
                                    </button>
                                  )}
                                  <button
                                    onClick={() => onSuspend(u)}
                                    type="button"
                                    className="btn btn-outline-danger float-end ">
                                    Suspend
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
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

export default SellerListScreen
