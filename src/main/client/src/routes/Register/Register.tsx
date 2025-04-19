import { Link, useNavigate } from "react-router-dom";
import "../../components/styling/auth.css";
import { useRef } from "react";
import { useErgonClient } from "../../hooks/useErgonClient/useErgonClient.tsx";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../components/Loader";
import axios from "axios";

export const Register = () => {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const confirmPassword = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const dob = useRef<HTMLInputElement>(null);
    const client = useErgonClient();
    const navigate = useNavigate();

    const registerUser = async () => {
        const user = username.current?.value;
        const pass = password.current?.value;
        const confirmPass = confirmPassword.current?.value;
        const userEmail = email.current?.value;
        const fName = firstName.current?.value;
        const lName = lastName.current?.value;
        const dateOfBirth = dob.current?.value;

        if (pass !== confirmPass) {
            throw new Error("Passwords do not match");
        }

        return await client.post("/auth/registration", {
            username: user,
            password: pass,
            matchingPassword: confirmPass,
            email: userEmail,
            firstName: fName,
            lastName: lName,
            dob: dateOfBirth
        });
    };

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            navigate("/login");
        }
    });

    const handleRegister = () => {
        mutate();
    };

    return (
        <>
            <div className="auth__split"></div>
            {isPending ? <div className="loader-container"><Loading /></div> :
                <div className="auth register">
                    <h1 className="text-4xl font-bold text-left">Register</h1>
                    <section>
                        <div className="input__container">
                            <div className="input__label">
                                <p>First Name</p>
                            </div>
                            <input className="input__field" type="text" name="firstName" ref={firstName} autoComplete="given-name"
                                maxLength={150} required
                                id="id_first_name" />
                        </div>

                        <div className="input__container">
                            <div className="input__label">
                                <p>Last Name</p>
                            </div>
                            <input className="input__field" type="text" name="lastName" ref={lastName} autoComplete="family-name"
                                maxLength={150} required
                                id="id_last_name" />
                        </div>
                    </section>
                    <section>
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
                                <p>Date of Birth</p>
                            </div>
                            <input className="input__field" type="date" name="dob" ref={dob} autoComplete="bday"
                                required
                                id="id_dob" />
                        </div>
                    </section>


                    <div className="input__container">
                        <div className="input__label">
                            <p>Email</p>
                        </div>
                        <input className="input__field" type="email" name="email" ref={email} autoComplete="email"
                            maxLength={150} required
                            id="id_email" />
                    </div>
                    <section>
                        <div className="input__container">
                            <div className="input__label">
                                <p>Password</p>
                            </div>
                            <input className="input__field" type="password" name="password" ref={password}
                                autoComplete="new-password"
                                required
                                id="id_password" />
                        </div>

                        <div className="input__container">
                            <div className="input__label">
                                <p>Confirm Password</p>
                            </div>
                            <input className="input__field" type="password" name="confirmPassword" ref={confirmPassword}
                                autoComplete="new-password"
                                required
                                id="id_confirm_password" />
                        </div>
                    </section>
                    { isError && axios.isAxiosError(error) &&
                        <div className="input__error">
                        <p>{error?.response?.data.message || "Registration failed, and its not my code, its you with your weird input"}</p>
                        </div>
                    }
                    <div style={{ display: "grid" }}>
                        <button onClick={handleRegister} className="styled__button" type="submit"> Register</button>
                    </div>
                    <Link className="styled__button floating" to="/login">Login</Link>
                </div>}
        </>
    );
};