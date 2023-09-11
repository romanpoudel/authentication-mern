import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "./features/authStatus/authSlice.js";
import {getCookie} from "./utils/cookie"
// import api from "./api/config";

function App() {
	const isAuthenticated = useSelector((c) => c.auth.isAuthenticated);
	const dispatch = useDispatch();
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	// const checkAuthentication = async () => {
	// const token = localStorage.getItem("token");
	// if(token){
	// 	const decoded = jwt_decode(token);
	// 	console.log(decoded);
	// 	console.log(Date.now() / 1000);
	// 	if ( decoded.exp < Date.now() / 1000) {
	// 		console.log("token expired");
	// 		dispatch(authenticate(false));
	// 		// setIsAuthenticated(false);
	// 	} else {
	// 		console.log("token not expired");
	// 		dispatch(authenticate(true));
	// 		// setIsAuthenticated(true);
	// 	}
	

	// };
	useEffect(() => {
		
		setIsMounted(true);
		const token = localStorage.getItem("token");
		if (token) {
			const decoded = jwt_decode(token);
			console.log(decoded);
			console.log(Date.now() / 1000);
			if (decoded.exp < Date.now() / 1000) {
				console.log("token expired");
				dispatch(authenticate(false));
				// setIsAuthenticated(false);
			} else {
				console.log("token not expired");
				dispatch(authenticate(true));
				// setIsAuthenticated(true);
			}
		} else{
			const sessionId = getCookie("connect.sid");
			console.log(sessionId)
			if(sessionId){
				dispatch(authenticate(true));
			}
			
		}
		
		
		
		return () => setIsMounted(false);
	}, [dispatch]);
	// useEffect(() => {
	// 	setIsMounted(true);
	// 	checkAuthentication();
	// 	return () => setIsMounted(false);
	// }, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<Router>
				<Routes>
					{/* protected route */}
					<Route
						element={
							<ProtectedRoute isAuthenticated={isAuthenticated} />
						}
					>
						<Route path="/" element={<Home />} />
					</Route>
					{/* <Route path="/" element={<Home />} /> */}
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<p>Error page</p>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
