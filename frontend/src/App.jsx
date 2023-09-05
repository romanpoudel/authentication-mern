import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect, useState } from "react";
import api from "./api/config";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const checkAuthentication = async () => {
  try {
    const response = await api('/auth', {
      method: 'GET',
      credentials: 'include', 
    });

    if (response.status === 200) {
      // User is authenticated
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  } catch (error) {
    console.error('Error checking authentication:', error);

    setIsAuthenticated(false)
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
