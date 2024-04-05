import React, { useEffect } from "react";
import styles from "./AuthLayout.module.css";
import section1Pic from "../../assets/comments.png";
import section2Pic from "../../assets/chart.png";
import { ToastContainer, toast } from "react-toastify";
const HomePage = () => {
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
        <h2>My Department</h2>
        <table>
          <thead>
            <th></th>
          </thead>
        </table>
      </div>
    </section>
  );
};

export default HomePage;
