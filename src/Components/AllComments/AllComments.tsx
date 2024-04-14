import React, { useEffect, useState } from "react";
import styles from "./AllComments.module.css";
import CommentsService from "../../Components/ApiServices/CommentsService";
import Comment from "./Comment";
import { commmentUI } from "../Models/Models";
const AllComments = () => {
  const [comments, setComments] = useState<any>([new Object()]);
  const [paging, setPage] = useState<any>([new Object()]);

  const moderatorID = JSON.parse(localStorage.getItem("user") || "{}").userID;
  const pageSize = 8;
  const page = 1;

  let commentService: CommentsService = new CommentsService();

  function prevPageHandler(): void {
    throw new Error("Function not implemented.");
  }
  function nextPageHandler(): void {
    throw new Error("Function not implemented.");
  }
  useEffect(() => {
    let params = { moderatorID, pageSize, page };
    commentService
      .getAdminComments("/api/Comments/getAdminComment", params)
      .then((res: any) => {
        console.log(res);
        setPage(res);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.sectionHeader}>
        <h2>Showing All Comments</h2>
        <div className={styles.optionsContainer}>
          <div className={styles.searchInput}>
            <input type="text" placeholder="Search By Name Or Code" />
            <i className="fa-solid fa-search"></i>
          </div>
          <button>
            <p>Oldest</p>
            <i className="fa-solid fa-filter"></i>
          </button>
          <button>Add New</button>
        </div>
      </div>
      <div className={styles.mainCommentCards}>
        {comments &&
          comments.map((comment: commmentUI, idx: number) => {
            return <Comment key={idx} comment={comment} />;
          })}
      </div>
      <div className={styles.pagination}>
        <button className={styles.pageHandlers} onClick={prevPageHandler}>
          <i className="fa-solid fa-caret-left"></i>
          <p>Prev</p>
        </button>
        {/* <div
          className={styles.middleText}
        >{`${current} of ${allUsersPage.pageCount}`}</div> */}
        <button className={styles.pageHandlers} onClick={nextPageHandler}>
          <p>Next</p>
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>
    </section>
  );
};

export default AllComments;
