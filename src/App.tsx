import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './pages/sign-in';
import SignUp from './pages/sign-up';
import { RouteName } from './routes';
import Layout from './layouts';
import Dashboard from './pages/dashboard/dashboard';
import ToastProvider from './providers/toastProvider';
import OTPVerification from './pages/otp';
import { Role } from './enum/userTypes';
import Authmiddleware from './middlewares/authMiddleware';
import { AuthProvider } from './providers/authProviders';
import ChangePassword from './pages/forget-password/changePassword';
import ConfirmDetails from './pages/forget-password/confirmDetails';

function App() {
  return (
    <>
    <AuthProvider>
    <ToastProvider />
      <Routes>
        <Route path={RouteName.SIGNIN} element={<Login />} />
        <Route path={RouteName.SIGNUP} element={<SignUp />} />
        <Route path={RouteName.OTP} element={<OTPVerification />} />
        <Route path={RouteName.CONFIRM_DETAILS} element={<ConfirmDetails />} />
        <Route path={RouteName.CHANGE_PASSWORD} element={<ChangePassword />} />

        <Route element={<Authmiddleware allowed={[Role.BUS_OWNER]} />}>
          <Route path={RouteName.ANALYTICS} element={<Layout><Dashboard /></Layout>} />
        </Route>
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
