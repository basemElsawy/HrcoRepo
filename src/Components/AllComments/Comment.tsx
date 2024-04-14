import React from "react";
import styles from "./AllComments.module.css";
import image from "../../assets/Unknown_person.jpg";
import { commmentUI } from "../Models/Models";
const Comment = ({ comment }: { comment: commmentUI }) => {
  return (
    <div className={styles.commentCardContainer}>
      <div className={styles.commentHeader}>
        <div>
          <h4>
            Created By {comment.adminName && comment.adminName.split(" ")[0]}
          </h4>
        </div>
        <div className={styles.commentOptions}>
          <button>
            <i className="fa-solid fa-edit"></i>
          </button>
          <button>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div className={styles.commentBody}>
        <div className={styles.quote_left}>
          <i className="fa-solid fa-quote-left"></i>
        </div>
        <div className={styles.commentText}>{comment.commentMessage}</div>
        <div className={styles.quote_right}>
          <i className="fa-solid fa-quote-right"></i>
        </div>
      </div>
      <div className={styles.commentFooter}>
        <div className={styles.employeeData}>
          <div className={styles.employeeImg}>
            <img src={comment.userImage ? comment.userImage : image} alt="" />
          </div>
          <div className={styles.employeeName}>{comment.userName}</div>
        </div>
        <div className={styles.commentDate}>{comment.createdAt}</div>
      </div>
    </div>
  );
};

export default Comment;
