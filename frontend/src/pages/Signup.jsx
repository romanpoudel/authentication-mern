import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/config.js";
import { toast } from "react-toastify";

const schema = yup.object().shape({
	email: yup.string().email().required(),
	userName: yup.string().required(),
	password: yup.string().min(8).max(32).required(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required(),
});

const Signup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const navigate = useNavigate();

	const handleNewUser = async (data) => {
		const requestOptions = {
			method: "POST",
			url: "/signup",
			headers: {
				"Content-Type": "application/json",
			},
			data,
		};

		try {
			const response = await api(requestOptions);
			console.log(response.data);
			console.log(response.status);
			console.log("Successfully registered new user.", data);
			if (response.data.success) {
				toast.success("Signup successful");
				localStorage.setItem("token", response.data.response.token);
				reset();
				navigate("/");
			} else {
				toast.error("Signup failed");
			}
		} catch (err) {
			console.log(err.response.data);
			setError("email", {
				type: "manual",
				message: err.response.data.error,
			});
		}
	};
	return (
		<>
			<h1>Sign Up</h1>
			<form
				className="flex flex-col items-start"
				onSubmit={handleSubmit(handleNewUser)}
			>
				<label className="py-2">Email</label>
				<input
					type="email"
					className="p-1.5 w-80 rounded pl-2"
					placeholder="email@gmail.com"
					{...register("email")}
				/>
				<p className="error">{errors.email?.message}</p>
				<label className="py-2">Username</label>
				<input
					type="text"
					className="p-1.5 w-80 rounded pl-2"
					{...register("userName")}
				/>
				<p className="error">{errors.userName?.message}</p>
				<label className="py-2">Password</label>
				<input
					type="password"
					className="p-1.5 w-80 rounded pl-2"
					{...register("password")}
				/>
				<p className="error">{errors.password?.message}</p>
				<label className="py-2">Confirm Password</label>
				<input
					type="password"
					className="p-1.5 w-80 rounded pl-2"
					{...register("confirmPassword")}
				/>
				<p className="error">{errors.confirmPassword?.message}</p>
				<button type="submit" className="w-80 mt-6">
					Create Account
				</button>
			</form>
			<p className="mt-2 text-sm">
				Already have account? <Link to="/login">Login</Link>
			</p>
		</>
	);
};

export default Signup;
