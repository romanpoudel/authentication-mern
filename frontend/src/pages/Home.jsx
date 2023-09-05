import api from "../api/config";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";

// import { deleteCookie } from "../utils/cookie";

const Home = () => {
	const navigate=useNavigate()

	const handleLogout = async () => {
		try{
			const response = await api("/logout");
			console.log(response);
			// deleteCookie("token")
			toast.success("Logout successful")
			navigate("/login")
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
