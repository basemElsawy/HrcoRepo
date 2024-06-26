import React, { useState } from "react";
import styles from "./AllComments.module.css";
import image from "../../assets/Unknown_person.jpg";
import { CommmentUI, DeleteCommentBody } from "../Models/Models";

const Comment = ({
  comment,
  index,
  updateComment,
  deleteHandler,
}: {
  comment: CommmentUI;
  index: number;
  deleteHandler(deleteCommentBody: DeleteCommentBody): void;

  updateComment(commentID: number, commentMessage: string): void;
}) => {
  const [commentEdited, setEditedComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const updateHandler = () => {
    updateComment(comment.commentID, commentEdited);

    setEditedComment("");
    setIsEditing(false);
  };

  const deleteCommentHandler = (commentID: number) => {
    let deleteCommentBody: DeleteCommentBody = { commentID };
    deleteHandler(deleteCommentBody);
  };

  return (
    <div className={styles.commentCardContainer}>
      <div className={"align-items-center " + styles.commentHeader}>
        <div>
          <h6 className="p-0 m-0 fw-bold">
            Created By {comment.adminName && comment.adminName.split(" ")[0]}
          </h6>
        </div>
        <div className={styles.commentOptions}>
          <div className={styles.btnEdit}>
            <button
              onClick={() => {
                setActiveIndex(index);
                setIsEditing((prev) => !prev);
              }}
            >
              <i className="fa-solid fa-edit"></i>
            </button>
            <div
              className={
                index === activeIndex && isEditing
                  ? `${styles.editContainer} ${styles.activeEditContainer}`
                  : styles.editContainer
              }
            >
              <p>
                Editing On {comment.userName && comment.userName.split(" ")[0]}{" "}
                comment
              </p>
              <div>
                <input
                  type="text"
                  value={commentEdited}
                  placeholder="Write Something New"
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <button
                  onClick={updateHandler}
                  className={styles.sendNewCommment}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => deleteCommentHandler(comment.commentID)}>
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
          <div className={"fw-lighter " + styles.employeeName}>
            {comment?.userName &&
              comment.userName
                .split(" ")
                .map((name, idx) => (idx < 2 ? name : " "))
                .join(" ")}
          </div>
        </div>
        <div className={styles.commentDate}>{comment.createdAt}</div>
      </div>
    </div>
  );
};

export default Comment;
