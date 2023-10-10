import path from "./ultils/path";
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Layout, Home, Login } from './pages/public'
import { Loading } from './components'
import { LayoutAdmin, Dashboard, ManageUser } from './pages/admin'
import { LayoutMember, Cart, Personal } from './pages/member'
import { useSelector } from 'react-redux'


function App() {
  const { isLoading } = useSelector(state => state.app)
  return (
    <>
      {isLoading && <div className="fixed top-0 left-0 right-0 z-[1000] bottom-0 bg-overlay-70 flex justify-center items-center">
        <Loading />
      </div>}
      <Routes>
        <Route path={path.LAYOUT} element={<Layout />} >
          <Route path={path.HOME} element={<Home />} />

        </Route>
        <Route path={path.LOGIN} element={<Login />} />

        {/* Admin routes */}
        <Route path={path.ADMIN} element={<LayoutAdmin />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.INVALID} element={<Dashboard />} />
        </Route>

        {/* Member routes */}
        <Route path={path.MEMBER} element={<LayoutMember />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.CART} element={<Cart />} />
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
    </ >
  );
}

export default App;