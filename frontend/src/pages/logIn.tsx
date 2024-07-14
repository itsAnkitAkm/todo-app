import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { notifyError } from "../utils/toast";
import useAuth from "../components/hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, userLoading } = useAuth();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const { data } = await instance.post("user/auth/login", loginForm);
      setLoginForm({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      notifyError(error.response?.data?.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Log In to Your Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Email Address
            </label>
            <input
              value={loginForm.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-2 text-sm"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              value={loginForm.password}
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-2 text-sm"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              {loginLoading ? "Logging in..." : "Log In"}
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Link
              to="/forgot-password"
              onClick={handleForgotPassword}
              className="text-sm text-indigo-600 hover:underline focus:outline-none"
            >
              Forgot Password?
            </Link>
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="font-medium text-indigo-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
