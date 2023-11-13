import path from "./ultils/path"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Layout, Home, Login, Filter, DetailPost } from "./pages/public"
import { Loading, Modal } from "./components"
import { LayoutAdmin, Dashboard, ManageUser, ManagePosts } from "./pages/admin"
import {
  LayoutManager,
  Personal,
  CreatePost,
  ManagePost,
} from "./pages/manager"
import { LayoutMember } from "./pages/member"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getCurrent, getProvinces } from "./redux/actions"

function App() {
  const { isLoading, isShowModal, modalContent } = useSelector(
    (state) => state.app
  )
  const { token } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProvinces())
  }, [])
  useEffect(() => {
    setTimeout(() => {
      dispatch(getCurrent())
    }, 800)
  }, [token])
  return (
    <>
      {isShowModal && <Modal>{modalContent}</Modal>}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[1000] bottom-0 bg-overlay-70 flex justify-center items-center">
          <Loading />
        </div>
      )}
      <Routes>
        <Route path={path.LAYOUT} element={<Layout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LIST} element={<Filter />} />
          <Route path={path.DETAIL_POST__PID__TITLE} element={<DetailPost />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />

        {/* Manager routes */}
        <Route path={path.MEMBER} element={<LayoutMember />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>

        {/* Admin routes */}
        <Route path={path.ADMIN} element={<LayoutAdmin />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_POST_ALL} element={<ManagePosts />} />
          <Route path={path.INVALID} element={<Dashboard />} />
        </Route>

        {/* Member routes */}
        <Route path={path.MANAGER} element={<LayoutManager />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
        </Route>

        <Route path={path.INVALID} element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
