import React, { useContext, useState } from "react";
import Input from "../component/form/Input";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import axios from "axios";
import { saveInLocalStorage } from "../helper/auth";
import { Link, useNavigate } from "react-router-dom";
import Button from "../component/form/Button";

export default function Register() {
  const navigate = useNavigate();
  //context
  const [auth, setAuth] = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setconfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (password !== confirm) {
        toast.error("password doesnot match");
        return;
      }
      const { data } = await axios.post(`${process.env.REACT_APP_URL}/signup`, {
        name,
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
        toast.success("successfully registered ");
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
            <h1 className="fw-bold mb-3">Register</h1>
            <form>
              <Input value={name} setValue={setName} label="Name" type="text" />
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
              <Input
                value={confirm}
                setValue={setconfirm}
                label="Confirm Password"
                type="password"
              />

              <Button
                handleSubmit={handleSubmit}
                name={name}
                email={email}
                password={password}
                loading={loading}
              />
            </form>
            <p className="mt-3">
              Already register ? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
