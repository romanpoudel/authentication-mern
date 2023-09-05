import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuthentication = async () => {
        const token=localStorage.getItem("token");
        const decoded = jwt_decode(token);
        console.log(decoded);
        console.log(Date.now() / 1000);
        if (decoded.exp < Date.now() / 1000) {
          console.log("token expired");
          setIsAuthenticated(false);
        } else {
          console.log("token not expired");
          setIsAuthenticated(true);
        }
  };

useEffect(()=>{
  checkAuthentication()
},[])

    return (
      <>
        <Router>
          <Routes>
            {/* protected route */}
            <Route
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<p>Error page</p>} />
          </Routes>
        </Router>
      </>
    );
  }

export default App;
