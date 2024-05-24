import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
const RegistrationSuccess = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(function () {
      redirectFun();
    }, 7000);
  }, []);

  const redirectFun = () => {
    history.push("corporate/admin/newregistration");
  };
  return (
    <div
      id="app"
      style={{
        backgroundColor: "#3852A4",
        minHeight: "100vh",
        position: "fixed",
        overflowY: "scroll",
        width: "100%",
        textAlign: "center",
      }}
    >
      <div className="successcard" style={{ marginTop: "4%" }}>
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className="checkmark successi">✓</i>
        </div>
        <h1 className="successH1">Registration successfull</h1>
        <p className="successp">We will contact you shortly!</p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
