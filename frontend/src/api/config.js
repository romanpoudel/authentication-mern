import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:4000",
	useCredentials:true
});

export default instance;
