import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import { getCookie } from "./utils/cookie";

function App() {
  let isAuthenticated;
  if (getCookie("token")){
    isAuthenticated=true
  }else{
    isAuthenticated=false
  }
	return (
		<>
			<Router>
				<Routes>
          {/* protected route */}
          <Route  element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Home />} />
          </Route>
          {/* or
          in this case we have to receive as children
          <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} ><Home /></ProtectedRoute>} /> */}
            
					<Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="*" element={<p>Error page</p>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
