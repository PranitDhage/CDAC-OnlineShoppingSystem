import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getCategory } from '../../actions/categoryAction'
import { CATEGORY_DELETE_RESET } from '../../constants/productConstants'

const CategoryListScreen = (props) => {
  //to fetch all available categories
  const categoryStore = useSelector((store) => store.getCategoryStore)
  const { error, response, loading } = categoryStore

  const dispatch = useDispatch()

  //to delete category from available ones
  const deleteCategoryStore = useSelector((state) => state.deleteCategoryStore)

  // change status after category deleted so that page will be auto rendered
  const [deleteStatus, setDeleteStatus] = useState(false)

  // call this only once (when the page has loaded successfully)
  useEffect(() => {
    console.log('delete stautus: ' + deleteStatus)
    dispatch(getCategory())
  }, [])

  useEffect(async () => {
    if (
      deleteCategoryStore.response &&
      deleteCategoryStore.response.status == 'success'
    ) {
      dispatch({ type: CATEGORY_DELETE_RESET })
      await dispatch(getCategory())
      await setDeleteStatus(false)
    }
  }, [
    deleteCategoryStore.response,
    deleteCategoryStore.error,
    deleteCategoryStore.loading,
  ])

  useEffect(() => {}, [error, response, loading])

  const onUpdate = (c) => {
    props.history.push({
      pathname: '/update-category',
      state: c, // your data array of objects
    })
  }

  const goBackHandler = () => {
    props.history.push('/admin')
  }

  const onDelete = (c) => {
    dispatch(deleteCategory(c.cat_id))
    setDeleteStatus(true)
  }

  const onAddCategory = () => {
    props.history.push('/add-category')
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
                  <p className="text-primary m-0 fw-bold">Category List</p>
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
                          <th>Category Id </th>
                          <th className="admintitle">Category Title</th>
                          <th className="description">Category Description </th>
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
                                <td>{c.cat_id}</td>
                                <td className="admintitle">{c.cat_title}</td>
                                <td className="description">
                                  {c.cat_description}
                                </td>
                                <td>
                                  <button
                                    onClick={() => onUpdate(c)}
                                    type="button"
                                    className="btn btn-outline-success ">
                                    Update
                                  </button>
                                  <button
                                    onClick={() => onDelete(c)}
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
            onClick={onAddCategory}
            className="btn btn-secondary float-end">
            Add New Category
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryListScreen
