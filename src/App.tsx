import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/sign-in';
import SignUp from './pages/sign-up';
import { RouteName } from './routes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path={RouteName.SIGNIN} element={<Login />} />
        <Route path={RouteName.SIGNUP} element={<SignUp />} />

        <Route path={RouteName.ROOT } element={<>dashboard</>}>
          {/* <Route path="a" element={<Layout><>analatics</></Layout>} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App;
