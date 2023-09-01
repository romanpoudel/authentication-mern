import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/config.js";
import { setCookie } from "../utils/cookie.js";

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).max(32).required(),
});
const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const navigate = useNavigate();

	const handlelogin = async (data) => {
		// e.preventDefault();
		console.log("submitted", data);
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data,
		};
		try {
			const response = await api("/login", requestOptions);
			console.log(response);

			console.log("token", response.data.token);
			//store token in cookies
			setCookie("token", response.data.token, 2);
			navigate("/");
			reset();
		} catch (err) {
			console.log(err);
			const errors = [
				{
					name: "email",
					type: err.response.status,
					message: err.response.data.message,
				},
				{
					name: "password",
					type: err.response.status,
					message: err.response.data.message,
				},
			];
			errors.forEach(({ name, type, message }) => {
				setError(name, { type, message });
			});
		}
	};
	const handleGoogle = async () => {
		const response = await api.get("/auth/google",{withCredentials:true});
		console.log(response);
	};
	return (
		<>
			<h1>Login</h1>
			<form
				className="flex flex-col items-start"
				onSubmit={handleSubmit(handlelogin)}
			>
				<label className="py-2">Email</label>
				<input
					type="email"
					className="p-1.5 w-80 rounded pl-2"
					placeholder="email@gmail.com"
					{...register("email")}
				/>
				<p className="error">{errors.email?.message}</p>
				<label className="py-2">Password</label>
				<input
					type="password"
					className="p-1.5 w-80 rounded pl-2"
					{...register("password")}
				/>
				<p className="error">{errors.password?.message}</p>
				<button type="submit" className=" w-80 mt-6">
					Login
				</button>
			</form>
			<button type="button" onClick={handleGoogle} className="w-full">
				Login With Google
			</button>
			<p className="text-sm">
				Don&apos;t have account? <Link to="/signup">Sign Up</Link>
			</p>
		</>
	);
};

export default Login;
