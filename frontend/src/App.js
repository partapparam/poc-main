import { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom"

import Diamond from "./pages/Diamond/Diamond"
import DiamondAdmin from "./pages/DiamondAdmin/DiamondAdmin"

import "./assets/styles/main.css"
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword"
import VerifyPassword from "./pages/Auth/VerifyPassword/VerifyPassword"
import Main from "./pages/layout/Main"
import LogIn from "./pages/Auth/Login/Login"
import SignUp from "./pages/Auth/Signup/SignUp"
import Main_v2 from "./components/layout/Main_v2"
import Home_v2 from "./components/Home_v2/Home_v2"
import Discover from "./components/Discover/Discover"
import Library from "./components/Library/Library"
import Insurance from "./pages/Insurance/Insurance"
import Semantic from "./pages/Semantic/Semantic"
import SSOT from "./pages/SSOT/SSOT"
import Finance from "./components/Finance/Finance"
import Tenant from "./components/Tenant/Tenant"
import GTMWeb from "./components/GTMWeb/GTMWeb"
import GTMWebAdmin from "./components/GTMWebAdmin/GTMWebAdmin"

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"))
  const location = useLocation()

  useEffect(() => {
    // Set background color based on current URL
    const body = document.querySelector("body")
    switch (location.pathname) {
      case "/diamond-price-calculator":
      case "/diamond-price-calculator/admin":
      case "/insurance":
      case "/semantic-search":
        body.style.backgroundColor = "#f2f2f2"
        break
      default:
        body.style.backgroundColor = "#ffffff"
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/verify-user/:verification_token/:user_id"
        name="verifyUser Page"
        element={<VerifyPassword />}
      />
      <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/sign-up"
        element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path="/diamond-price-calculator" element={<Diamond />} />
      <Route
        path="/diamond-price-calculator/admin"
        element={<DiamondAdmin />}
      />
      <Route path="/insurance" element={<Insurance />} />
      <Route path="/semantic-search" element={<Semantic />} />
      <Route path="/gtm-web-visitors" element={<GTMWeb />} />
      <Route path="/gtm-web-visitors/admin" element={<GTMWebAdmin />} />
      <Route
        path="/"
        element={isLoggedIn ? <Main_v2 /> : <Navigate to="/login" />}
      >
        <Route path="/ssot" element={<SSOT />} />
        <Route path="/demo" element={<Home_v2 />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/demo/discover" element={<Discover />} />
        <Route path="/demo/library" element={<Library />} />
        <Route path="/" element={<Navigate to={"/ssot"} />} />
      </Route>
    </Routes>
  )
}

export default App
