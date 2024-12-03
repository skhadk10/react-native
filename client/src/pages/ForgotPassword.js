import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { saveInLocalStorage } from "../helper/auth";
import Input from "../component/form/Input";
import Button from "../component/form/Button";
import { AuthContext } from "../context/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resetCode, setResetcode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        `/forgot-password`,
        {
          email,
        }
      );

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        setVisible(true);
        toast.success("Enter the code you received in your email");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password !== confirm) {
        toast.error("password doesnot match");
        return;
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/reset-password`,
        {
          email,
          password,
          resetCode,
        }
      );
      console.log(data, "checking errors");
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        toast.success(
          "Password successfully changes. Now you can login with new password"
        );
        setLoading(false);

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
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
            <h1 className="fw-bold mb-3">Forgot Password</h1>
            <form>
              <Input
                value={email}
                setValue={setEmail}
                label="Email"
                type="email"
              />
              {visible && (
                <>
                  <Input
                    value={resetCode}
                    setValue={setResetcode}
                    label="Enter your code"
                    type="text"
                  />
                  <Input
                    value={password}
                    setValue={setPassword}
                    label="New Password"
                    type="password"
                  />
                  <Input
                    value={confirm}
                    setValue={setconfirm}
                    label="Confirm New Password"
                    type="password"
                  />
                </>
              )}

              <Button
                handleSubmit={visible ? handleReset : handleSubmit}
                email={email}
                password={password}
                loading={loading}
              />
            </form>
            <p className="mt-3">
              <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
