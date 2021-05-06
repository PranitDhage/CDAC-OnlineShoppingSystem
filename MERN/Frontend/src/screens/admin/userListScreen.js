import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllUsers,
  approveUser,
  suspendUser,
} from '../../actions/userActions'

const UserListScreen = (props) => {
  const dispatch = useDispatch()
  const userListStore = useSelector((store) => store.userListStore)
  const { response } = userListStore

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  // to render list after approve button is pressed
  const userApproveStore = useSelector((state) => state.userApproveStore)
  useEffect(() => {
    if (
      userApproveStore.response &&
      userApproveStore.response.status == 'success'
    ) {
      dispatch(getAllUsers())
    }
  }, [
    userApproveStore.error,
    userApproveStore.response,
    userApproveStore.loading,
  ])

  // to render list after approve button is pressed
  const userSuspendStore = useSelector((state) => state.userSuspendStore)
  useEffect(() => {
    if (
      userSuspendStore.response &&
      userSuspendStore.response.status == 'success'
    ) {
      dispatch(getAllUsers())
    }
  }, [
    userSuspendStore.error,
    userSuspendStore.response,
    userSuspendStore.loading,
  ])

  const onApprove = (u) => {
    dispatch(approveUser(u.user_id))
  }

  const onSuspend = (u) => {
    dispatch(suspendUser(u.user_id))
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
                  <p className="text-primary m-0 fw-bold">User's List</p>
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
                                <td>
                                  {(u.user_status == 'suspended' ||
                                    u.user_status == 'not verified') && (
                                    <button
                                      onClick={() => onApprove(u)}
                                      type="button"
                                      className="btn btn-outline-success ">
                                      Approve User
                                    </button>
                                  )}
                                  {u.user_status == 'verified' && (
                                    <button
                                      onClick={() => onSuspend(u)}
                                      type="button"
                                      className="btn btn-outline-danger">
                                      Suspend User
                                    </button>
                                  )}
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

export default UserListScreen
