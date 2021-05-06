import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCompany } from '../../actions/companyAction'
import { deleteCompany } from '../../actions/companyAction'

const ShowCompanyScreen = (props) => {
  let params = useParams()

  const getComponyStore = useSelector((store) => store.getComponyStore)

  const { response, loading, error } = getComponyStore

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('in use effect')
    dispatch(getCompany())
  }, [])

  const onUpdate = (c) => {
    console.log('in onUpdate')
    props.history.push({
      pathname: '/update-company',
      state: c, // your data array of objects
    })
  }

  // to render page after delete button is pressed
  const deleteComponyStore = useSelector((state) => state.deleteComponyStore)
  useEffect(async () => {
    if (
      deleteComponyStore.response &&
      deleteComponyStore.response.status == 'success'
    ) {
      dispatch(getCompany())
    }
  }, [
    deleteComponyStore.response,
    deleteComponyStore.error,
    deleteComponyStore.loading,
  ])

  const onDelete = (comp_id) => {
    dispatch(deleteCompany(comp_id))
  }
  const onAddCompany = (c) => {
    props.history.push('/add-company')
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
                  <p className="text-primary m-0 fw-bold">Company's List</p>
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
                          <th>Company ID</th>
                          <th className="admintitle">Title</th>
                          <th className="description">Desc</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {response &&
                          response.data &&
                          response.data.length > 0 &&
                          response.data.map((c) => {
                            return (
                              <tr>
                                <td>{c.comp_id}</td>
                                <td className="admintitle">{c.comp_title}</td>
                                <td className="description">
                                  {c.comp_description}
                                </td>
                                <td>
                                  <button
                                    onClick={() => onUpdate(c)}
                                    type="button"
                                    className="btn btn-outline-success ">
                                    Update
                                  </button>
                                  <button
                                    onClick={() => onDelete(c.comp_id)}
                                    type="button"
                                    className="btn btn-outline-danger float-end ">
                                    Delete
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
      <div className="border border-light p-3 mb-4">
        <div className="text-center">
          <button
            onClick={onAddCompany}
            className="btn btn-secondary float-end">
            Add New Company
          </button>
        </div>
      </div>
    </div>
  )
}
export default ShowCompanyScreen
