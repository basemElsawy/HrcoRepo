import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import styles from "./AllComments.module.css";
import CommentsService from "../../Components/ApiServices/CommentsService";
import Comment from "./Comment";
import {
  CommentUpdateModel,
  CommentsPage,
  CommmentUI,
  DeleteCommentBody,
  LoggedInUser,
  ModalInputs,
  ModalProps,
  ModeratorCommentModel,
} from "../Models/Models";
import { ToastContainer, toast } from "react-toastify";
import image from "../../assets/9315312.jpg";
import { render } from "react-dom";
import { mainContext } from "../GlobalContext/globalContext";
import { set } from "react-hook-form";
const AllComments = () => {
  const [comments, setComments] = useState<any>([new Object()]);
  const [paging, setPage] = useState<CommentsPage>();
  const [renderHandler, setRenderHandler] = useState<any>(0);
  const [search, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastState, setToast] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    isModalActive,
    setActiveModal,
    setModalObject,
    allUsersData,
    globalRender,
    setGlobalRender,
  }: any = useContext(mainContext);
  const moderatorID = JSON.parse(localStorage.getItem("user") || "{}").userID;
  const pageSize = 8;
  const page = 1;

  let commentService: CommentsService = new CommentsService();

  const nextPageHandler = () => {
    setCurrentPage((prev) => {
      if (prev == paging?.pageCount) {
        console.log(prev);
        return prev;
      }

      return prev + 1;
    });
  };
  const prevPageHandler = () => {
    setCurrentPage((prev) => {
      if (prev == 1) {
        return prev;
      }

      return prev - 1;
    });
  };

  async function searchHandler(e: ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    setTimeout(() => {
      getSearchedComments(e.target.value);
    }, 1500);
  }

  function getAdminComments() {
    let param: ModeratorCommentModel = {
      moderatorID,
      pageSize,
      page: currentPage,
    };
    commentService
      .getSearchedComments("/api/Comments/getAdminComment", param)
      .then((res: CommentsPage) => {
        setPage(res);
        setComments(res?.data);
      })
      .finally(() => {
        if (paging?.data) {
          setToast(true);
          toast("Comments Successfully Retrieved");
        }

        setToast(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getSearchedComments(searchQuery: string) {
    let params: ModeratorCommentModel = {
      moderatorID: moderatorID,
      searchQuery,
      page: currentPage,
      pageSize,
    };
    if (searchQuery.length) {
      return commentService
        .getSearchedComments(
          "/api/Comments/adminSearchComments",

          params
        )
        .then((res: CommentsPage) => {
          setPage(res);
          setComments(res?.data);
        })
        .finally(() => {
          if (search.length) {
            if (paging?.data) {
              setToast(true);
              toast("Comments Successfully Retrieved");
              toast(
                paging?.data
                  ? "Searched Comment Successfully Retrieved"
                  : "No Comment found"
              );
            }
          }

          setToast(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return getAdminComments();
  }

  function editSpecificComment(
    commentID: number,
    commentMessage: string
  ): void {
    if (!commentMessage.length) {
      toast("Add Some Text In The Comment Field");
      return;
    }

    let patchCommentBody: CommentUpdateModel = {
      commentID,
      commentMessage,
    };
    commentService
      .editOnSpecificComment("/api/Comments/editComment", patchCommentBody)
      .then((res) => {
        getAdminComments();

        // toast("Comment was successfully edited");
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getAdminComments();
  }, [currentPage]);

  function closeModalHandler(): void {
    setActiveModal(false);
  }

  function submitNewCommentHandler(body: any): void {
    let admin: LoggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
    let newComment: any = {
      employeeCode: body.EmployeeCode,
      commentText: body.commentMessage,
      moderatorID: admin.userID,
      ModeratorName: admin.fullName,
    };
    if (body.commentMessage) {
      commentService
        .addCommentToUser(newComment)
        .then((res: any) => {
          setGlobalRender((prev: any) => prev + 1);
          setToast(true);
          toast("comment added successfully");
          console.log(res);
        })
        .finally(() => {
          setToast(false);
        })
        .catch((error) => {
          toast("error occured try again later");
          console.log(error);
        });
    }
  }
  function addNewComment() {
    let inputs: ModalInputs[] = [
      {
        type: "text",
        required: true,
        placeholder: "Employee Name",
        name: "EmployeeCode",
        isSelectInput: true,
        selectOptions: allUsersData,
      },
      {
        type: "text",
        required: true,
        placeholder: "Comment Message",
        name: "commentMessage",
        isSelectInput: false,
      },
    ];

    let modalOptions: ModalProps = {
      inputs,
      CloseModal: closeModalHandler,
      SubmitButton: submitNewCommentHandler,
      headerText: "Adding A New Comment",
      submitButtonText: "Add New Comment",
    };

    setModalObject(modalOptions);
    setActiveModal((prev: boolean) => !prev);
  }

  function deleteCommentHandler(body: DeleteCommentBody) {
    setIsLoading(true);
    commentService
      .deleteComment(body)
      .then((res) => {
        setRenderHandler((prev: any) => prev + 1);
        if (res.comment) {
          setToast(true);
          toast("Comment was deleted successfully");

          getAdminComments();
        } else {
          setToast(true);
          toast("Comment was not deleted due to param error");
        }
      })
      .finally(() => {
        setToast(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.sectionHeader}>
        <h2>Showing All Comments</h2>
        <div className={styles.optionsContainer}>
          <div className={styles.searchInput}>
            <input
              onChange={searchHandler}
              type="text"
              placeholder="Search By Name Or Code"
            />
            <i className="fa-solid fa-search"></i>
          </div>

          <button onClick={addNewComment}>Add New</button>
        </div>
      </div>
      {!isLoading ? (
        <div className={styles.mainCommentCards}>
          {comments && comments.length ? (
            comments &&
            comments.map((comment: CommmentUI, idx: number) => {
              return (
                <Comment
                  key={idx}
                  updateComment={editSpecificComment}
                  deleteHandler={deleteCommentHandler}
                  index={idx}
                  comment={comment}
                />
              );
            })
          ) : (
            <div className={styles.notFound}>
              <div>
                <img src={image} alt="" />
              </div>

              <p>No Comment Was Found</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      )}
      <div className={styles.pagination}>
        <button className={styles.pageHandlers} onClick={prevPageHandler}>
          <i className="fa-solid fa-caret-left"></i>
          <p>Prev</p>
        </button>

        <button className={styles.pageHandlers} onClick={nextPageHandler}>
          <p>Next</p>
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>
      {toastState ? <ToastContainer /> : ""}
    </section>
  );
};

export default AllComments;
