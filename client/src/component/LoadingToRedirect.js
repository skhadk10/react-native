import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../images/loading-gif.gif";

const LoadingToRedirect = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 3000);
    count === 0 && navigate("/login");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={LoadingGif} style={{ height: "50px" }} />
    </div>
  );
};

export default LoadingToRedirect;
