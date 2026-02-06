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
import Vehicle from './pages/vehicle/vehicle';
import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {
  return (
    <AuthProvider>
      <ToastProvider />
        <Routes>
          <Route path={RouteName.SIGNIN} element={<Login />} />
          <Route path={RouteName.SIGNUP} element={<SignUp />} />
          <Route path={RouteName.OTP} element={<OTPVerification />} />
          <Route path={RouteName.CONFIRM_DETAILS} element={<ConfirmDetails />} />
          <Route path={RouteName.CHANGE_PASSWORD} element={<ChangePassword />} />

          <Route element={<Authmiddleware allowed={[Role.OWNER]} />}>
            <Route element={<Layout />}>
              <Route path={RouteName.ANALYTICS} element={<Dashboard />} />
              <Route path={RouteName.VEHICLE} element={<Vehicle />} />
            </Route>
          </Route>

          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
    </AuthProvider>
  );
}


export default App;
