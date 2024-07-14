import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { notifyError } from "../utils/toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await instance.post("user/auth/signup", form);

      setForm({ email: "", password: "", name: "" });
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      notifyError(error.response?.data?.message || "Signup failed");
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create an Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              value={form.name}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-2 text-sm"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Email Address
            </label>
            <input
              value={form.email}
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
              value={form.password}
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-2 text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:underline"
              >
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupPage;
