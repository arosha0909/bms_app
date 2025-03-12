import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/sign-in';
import SignUp from './pages/sign-up';
import { RouteName } from './routes';
import Layout from './layouts';
import Dashboard from './pages/dashboard/dashboard';
import ToastProvider from './providers/toastProvider';
import OTPVerification from './pages/otp';

function App() {

  return (
    <>
    <ToastProvider />
      <Routes>
        <Route path={RouteName.SIGNIN} element={<Login />} />
        <Route path={RouteName.SIGNUP} element={<SignUp />} />
        <Route path={RouteName.OTP} element={<OTPVerification />} />

        {/* <Route element={<Authmiddleware allowed={Role.BUS_OWNER} />}> */}
          <Route path="analatics" element={<Layout><Dashboard /></Layout>} />
        {/* </Route> */}
      </Routes>
    </>
  )
}

export default App;
