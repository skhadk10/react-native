import React from "react";
import loadingGif from "../../images/loading-gif.gif";

const Button = ({ handleSubmit, name = "", email, password = "", loading }) => {
  return (
    <button
      onClick={handleSubmit}
      type="submit"
      className="btn btn-primary"
      disabled={
        (name && !name) ||
        !email ||
        email < 6 ||
        (password && password.length < 6)
      }
    >
      {loading ? <img src={loadingGif} style={{ height: "20px" }} /> : "Submit"}
    </button>
  );
};

export default Button;
