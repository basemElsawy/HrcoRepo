import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginCompStyles.module.css";
import Logo from "../../../assets/Logo.png";
import LogoDark from "../../../assets/logoDark.png";
import ApiService from "../../ApiServices/ApiServices";
import { Roles } from "../../Models/Models";
import { ToastContainer, toast } from "react-toastify";

import GlobalContext, { mainContext } from "../../GlobalContext/globalContext";

const LoginComp = (props: any) => {
  const [formData, setFormData] = useState({ employeeCode: "", password: "" });
  const _apiService: ApiService = new ApiService();
  const { roles }: any = useContext(mainContext);
  const textOnChangeHandler = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const signInHandler = (e: any) => {
    e.preventDefault();
    let stringifiedBody = JSON.stringify(formData);
    let role;
    _apiService
      .PostMethod("/api/Authentication/LoginApi", stringifiedBody)
      .then((res) => res.json())
      .then((res) => {
        debugger;
        role = roles.find((role: Roles) => role.id == res.role);
        if (res.isAuthenticated) {
          if (
            role?.description === "admin" ||
            role?.description === "hrProfessional"
          ) {
            toast("Successfully logged in");
            localStorage.setItem("token", JSON.stringify(res.token));
            localStorage.setItem("user", JSON.stringify(res));
            props.navigate("/");
          } else {
            toast("User is not authorized");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className={styles.login_container__section}>
      <ToastContainer />
      <div className={styles.login_section}>
        <div className={styles.logo_dark}>
          <img src={LogoDark} alt="" />
        </div>
        <div className={styles.login_form}>
          <h3>Login</h3>
          <p>Sign In to your admin account</p>
          <form>
            <input
              type="text"
              placeholder="Admin Code"
              name="employeeCode"
              onChange={textOnChangeHandler}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={textOnChangeHandler}
            />
            <button onClick={signInHandler}>Sign In</button>
          </form>
        </div>
      </div>
      <div className={styles.picture_section}>
        <div className={styles.image_container}>
          <img src={Logo} alt="" />
        </div>
        <div className={styles.description}>
          <p>Human Resource System</p>
        </div>
      </div>
    </section>
  );
};

export default LoginComp;
