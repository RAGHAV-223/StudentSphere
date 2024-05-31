import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authcontext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({fullname, username, email, password, confirmpassword  }) => {
		const success = handleInputErrors({ fullname, username, email, password, confirmpassword });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("http://localhost:8000/api/auth/sign-up", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullname, username, email, password, confirmpassword }),
			});
			if (!res.ok) {
				if (res.status === 402) {
				  toast("Username already exists")
				  throw new Error('Login failed');
				}else if (res.status === 403) {
					toast("Email already Registered")
					throw new Error('Login failed');
				} else if(res.status === 404){
					toast("Invalid User data, User not created")
					throw new Error('Login failed');
				} else {
				  console.error('An error occurred:', res.statusText);
				  throw new Error('Login failed');
				}
			  }
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullname, username, email, password, confirmpassword }) {
	if (!fullname || !username || !password || !confirmpassword || !email) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmpassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}