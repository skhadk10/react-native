import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Input from "../component/form/Input";
import { Link, useNavigate } from "react-router-dom";
import { saveInLocalStorage } from "../helper/auth";
import axios from "axios";
import { AuthContext } from "../context/auth";
import Button from "../component/form/Button";

export default function Login() {
  const navigate = useNavigate();
  //context
  const [auth, setAuth] = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/signin`, {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        //context
        setAuth(data);
        //store in localstorage
        saveInLocalStorage("auth", data);
        toast.success("Login Successful");
        setLoading(false);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ margin: "-100px" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="fw-bold mb-3">Login</h1>
            <form>
              <Input
                value={email}
                setValue={setEmail}
                label="Email"
                type="email"
              />

              <Input
                value={password}
                setValue={setPassword}
                label="Password"
                type="password"
              />

              <Button
                handleSubmit={handleSubmit}
                email={email}
                password={password}
                loading={loading}
              />
            </form>

            <p className="mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
