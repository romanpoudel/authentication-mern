import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).max(32).required(),
});
const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });
	const handlelogin = (data) => {
		// e.preventDefault();
		console.log("submitted", data);
		reset();
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
			<p className="text-sm">
				Don&apos;t have account? <Link to="/signup">Sign Up</Link>
			</p>
		</>
	);
};

export default Login;
