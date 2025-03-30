import { Link, useNavigate } from "react-router-dom";
import "../../components/styling/auth.css";
import { useEffect, useRef } from "react";
import { useErgonClient } from "../../hooks/useErgonClient/useErgonClient.tsx";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../components/Loader";

import { useAuth } from "../../hooks/UseAuth.tsx";

export const Login = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const client = useErgonClient();
  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const loginUser = async () => {
    const user = username.current?.value;
    const pass = password.current?.value;

    return await client.post("/auth/login", {
      username: user,
      password: pass
    });

  };

  const { mutate, isError, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      login();
      navigate("/");
    }
  });

  const handleLogin = () => {
    mutate();
  };
  return (
    <>
      <div className="auth__split"></div>
      {isPending ? <Loading /> :
        <div className="auth login">
          <h1>Login</h1>
          <div className="input__container">
            <div className="input__label">
              <p>Username</p>
            </div>
            <input className="input__field" type="text" name="username" ref={username} autoComplete="username"
                   maxLength={150} required
                   id="id_username" />
          </div>


          <div className="input__container">
            <div className="input__label">
              <p>Password</p>
            </div>
            <input className="input__field" type="password" name="password" ref={password}
                   autoComplete="current-password"
                   required
                   id="id_password" />
            {isError &&
              <div className="input__error">
                <p>Password or Username is wrong</p>
              </div>
            }

          </div>

          <div style={{ display: "grid" }}>
            <button onClick={handleLogin} className="styled__button" type="submit"> Login</button>
          </div>
          <Link className="styled__button floating" to="/register">Register</Link>
        </div>}
    </>

  );
};