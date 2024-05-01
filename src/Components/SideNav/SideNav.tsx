import styles from "./SideNav.module.css";
import HLogo from "../../assets/logoNoSlogan 1.png";
import { appRoutes } from "./ReactRoutes";
import { Routes } from "../Models/Models";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { mainContext } from "../GlobalContext/globalContext";
const SideNav = ({ navigator }: any) => {
  const [notification, notificationSetter] = useState<number>(0);
  const [offCanvasState, SetOffCanvasState] = useState<boolean>(false);
  const { setRequests, notificationCount } = useContext<any>(mainContext);
  const logout = () => {
    localStorage.clear();
    toast("logged out succesfully");
    navigator("/login");
  };

  return (
    <section className={styles.sideNav_container}>
      <ToastContainer />
      <div className={styles.nav_content}>
        <div className={styles.logo_container}>
          <img src={HLogo} alt="" />
        </div>
        <nav className={styles.nav_container}>
          <ul>
            {appRoutes.map((route: Routes) => {
              return (
                <NavLink
                  key={route.id}
                  to={route.route}
                  className={({ isActive }) =>
                    isActive
                      ? styles.activeNav + " position-relative"
                      : " position-relative"
                  }
                >
                  <li className={styles.navItem}>
                    <div className={styles.routeContainer}>
                      <i className={route.icon}></i>
                      <div className={styles.routeName}>
                        <p>{route.routeName}</p>
                      </div>
                    </div>
                  </li>
                </NavLink>
              );
            })}
            <li className="bg-primary text-white ">
              <div
                onClick={() => setRequests(true)}
                className={styles.routeContainer}
              >
                <div className={notification ? styles.small_num : "d-none"}>
                  {notificationCount}
                </div>

                <i className="fa-solid fa-bullhorn"></i>
                <div className={styles.routeName}>
                  <p>Requests</p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.logout}>
        <button onClick={logout}>
          <i className="fa-solid fa-right-from-bracket"></i> <p>Logout</p>
        </button>
      </div>
    </section>
  );
};

export default SideNav;
