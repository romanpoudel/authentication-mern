import api from "../api/config";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authenticate } from "../features/authStatus/authSlice";

// import { deleteCookie } from "../utils/cookie";

const Home = () => {
	const dispatch = useDispatch()
	const navigate=useNavigate()

	const handleLogout = async () => {
		try{
			const response = await api("/logout");
			console.log(response);
			// deleteCookie("token")
			if(response.data.success){
				dispatch(authenticate(false))
				localStorage.removeItem("token")
				toast.success("Logout successful")
				navigate("/login")
			}
		}catch(err){
			console.log(err)
		}
		// window.open("http://localhost:4000/logout","_self")
	};
	return (
		<div>
			<button type="button" onClick={handleLogout}>
				Logout
			</button>
			
		</div>
	);
};

export default Home;
