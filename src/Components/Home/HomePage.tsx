import React, { useEffect, useState } from "react";
import styles from "./AuthLayout.module.css";
import section1Pic from "../../assets/comments.png";
import section2Pic from "../../assets/chart.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DashboardService from "../ApiServices/DashboardService";
import { Users, UsersPage } from "../Models/Models";
import unknown from "../../assets/Unknown_person.jpg";
const HomePage = () => {
  const [users, setUsers] = useState<Users[]>();
  const dashboardService = new DashboardService();

  useEffect(() => {
    dashboardService.GetAllUsers(1, 5).then((res: UsersPage | any) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, [0]);

  return (
    <section className={styles.section_container}>
      <ToastContainer />
      <div className={styles.top_content}>
        <div className={styles.progress}>
          <div className={styles.image_container}>
            <img src={section1Pic} alt="" />
          </div>
          <div className={styles.text_container}>
            <h2>Add Comments</h2>
            <p>Add comments to your employees in your department</p>
            <button>Add comment</button>
          </div>
        </div>
        <div className={styles.comments}>
          <div className={styles.image2_container}>
            <img src={section2Pic} alt="" />
          </div>
          <div className={styles.text_container}>
            <h2>Add Progress</h2>
            <p>Add progress to your employees in your department</p>
            <button>Add progress</button>
          </div>
        </div>
      </div>
      <div className={styles.bottom_content}>
        <div className={styles.headline}>
          <h2>My Department</h2>
          <div className={styles.bottom_btn}>
            <Link to={"/show-employees"}>
              <button>More Employee</button>
            </Link>
          </div>
        </div>
        <div className={styles.table_wrapper}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Title</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {users &&
                users.map((item: Users, idx: number) => {
                  return (
                    <tr className={styles.emp_data} key={item.id}>
                      <td>{idx + 1}</td>
                      <td className={styles.image_td}>
                        <div className={styles.person_image}>
                          <img src={item.image ? item.image : unknown} alt="" />
                        </div>
                      </td>
                      <td>{item.fullName}</td>
                      <td>01132332421</td>
                      <td>{item.title}</td>
                      <td>
                        <div className={styles.table_buttons}>
                          <Link to={`/edit/${item.employeeCode}`}>
                            <button className={styles.options_btn}>
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          </Link>
                          <button className={styles.options_btn}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
