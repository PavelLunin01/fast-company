import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";
import { useParams } from "react-router-dom";
/*import UserPageForm from "../components/page/userPageForm/userPageForm";*/

const Login = () => {
  const { form } = useParams();
  const [formType, setFormType] = useState(form === "register" ? form : "login");
  const toggleType = () => {
    setFormType((prevState) => prevState === "register" ? "login" : "register");
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm/>
              <p>
                Already have account / <a role="button" onClick={toggleType}>Sign in</a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm/>
              <p>
                Don`t have account? / <a role="button" onClick={toggleType}>Sign up</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
