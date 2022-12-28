//External
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

//Styles
import "../../App.css";
import "./login.css";

//Libs
import useGetState from "../../hooks/useGetState";
import useGetAsyncActions from "../../hooks/useGetAsyncActions";

function Login() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("omotayo.adegoke@ourcompany.com");
  const [password, setPassword] = useState("peterObi");
  const [errorMsg, setErrorMsg] = useState("");

  const loggedInRef = useRef(false);
  const { employee, generalLoading } = useGetState();
  const { loginEmployeeAsync, registerEmployeeAsync } = useGetAsyncActions();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/");
    if (loggedInRef.current === false && employee && employee.length > 0) {
      loggedInRef.current = true;
      localStorage.setItem("user", JSON.stringify(employee[0]));
      navigate("/");
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@ourcompany.com")) {
      setErrorMsg("Email must match @ourcompany.com");
    } else {
      login
        ? loginEmployeeAsync({ email, password })
        : registerEmployeeAsync({ email, password });
      setErrorMsg("");
    }
  };

  return (
    <div className="container">
      <div className="sideBar login_sideBar"></div>
      <div className="mainContent login_mainContent">
        <h1>COMPANY SMS PORTAL</h1>
        <div className="login_form">
          <form>
            <input
              type={"email"}
              placeholder="Enter Company Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            ></input>
            {errorMsg && <p className="login_form_error">{errorMsg}</p>}
            <input
              type={"password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled
            ></input>
            {generalLoading ? (
              <p>Logging you in...</p>
            ) : (
              <button
                onClick={(e) => handleSubmit(e)}
                disabled={!email || !password}
              >
                {" "}
                {login ? "Login" : "Register"}
              </button>
            )}
            {/* <p>
              {login ? "Don't" : "Already"} have an account?{" "}
              <span
                className="login_form_span"
                //onClick={() => setLogin(!login)}
              >
                {login ? "Register" : "Login"}
              </span>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
