import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../../contexts/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await signInUser(email, password);
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(location?.state || "/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(location?.state || "/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-100  w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-primary to-secondary">
              Login
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-full text-black border-[#e5e5e5]"
        >
          <FaGoogle />
          Login with Google
        </button>
        <p className="text-center">
          New to our website? Please{" "}
          <Link
            className="text-blue-500 hover:text-blue-800"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
