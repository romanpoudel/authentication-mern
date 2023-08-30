import api from "../api/config";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../utils/cookie";

const Home = () => {
	const navigate=useNavigate()

	const handleLogout = async () => {
		try{
			const response = await api("/logout");
			console.log(response);
			deleteCookie("token")
			navigate("/login")
		}catch(err){
			console.log(err)
		}
		
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
