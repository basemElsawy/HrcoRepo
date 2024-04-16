import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import styles from "./AllComments.module.css";
import CommentsService from "../../Components/ApiServices/CommentsService";
import Comment from "./Comment";
import {
  CommentUpdateModel,
  CommentsPage,
  CommmentUI,
  ModalInputs,
  ModalProps,
  ModeratorCommentModel,
  ParamsForComments,
} from "../Models/Models";
import { ToastContainer, toast } from "react-toastify";
import image from "../../assets/9315312.jpg";
import { render } from "react-dom";
import { mainContext } from "../GlobalContext/globalContext";
const AllComments = () => {
  const [comments, setComments] = useState<any>([new Object()]);
  const [paging, setPage] = useState<any>([new Object()]);
  const [renderHandler, setRenderHandler] = useState<any>(0);
  const [search, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastState, setToast] = useState<boolean>(false);
  const { isModalActive, setActiveModal, setModalObject }: any =
    useContext(mainContext);
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

  function OpenModal() {}

  function searchHandler(e: ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 1500);
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
      .editOnSpecificComment(
        "/api/Comments/editComment",
        JSON.stringify(patchCommentBody)
      )
      .then((res) => {
        // toast("Comment was successfully edited");
      });
  }

  useEffect(() => {
    setIsLoading(true);
    let params: ModeratorCommentModel = search.length
      ? {
          moderatorID: moderatorID,
          searchQuery: search,
          page,
          pageSize,
        }
      : { moderatorID, pageSize, page };
    // let apiEndPoints: string = search.length
    //   ? "/api/Comments/adminSearchComments"
    //   : "/api/Comments/getAdminComment";

    commentService
      .getSearchedComments(
        params.searchQuery?.length
          ? "/api/Comments/adminSearchComments"
          : "/api/Comments/getAdminComment",
        params
      )
      .then((res: CommentsPage) => {
        setPage(res);
        setComments(res.data);
      })
      .finally(() => {
        if (!params?.searchQuery && paging.data) {
          setToast(true);
          toast("Comments Successfully Retrieved");
        }
        if (params?.searchQuery) {
          setToast(true);
          toast(
            paging.data
              ? "Searched Comment Successfully Retrieved"
              : "No Comment found"
          );
        }
        setToast(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(renderHandler);
  }, [renderHandler, search.length]);

  function closeModalHandler(): void {
    setActiveModal(false);
  }
  function submitNewCommentHandler(): void {}
  function addNewComment() {
    let inputs: ModalInputs[] = [
      {
        type: "text",
        required: true,
        placeholder: "Employee Name",
        name: "EmployeeName",
      },
      {
        type: "text",
        required: true,
        placeholder: "Comment Message",
        name: "CommentMessage",
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
          <button>
            <p>Oldest</p>
            <i className="fa-solid fa-filter"></i>
          </button>
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
                  renderTrigger={setRenderHandler}
                  updateComment={editSpecificComment}
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
        {/* <div
          className={styles.middleText}
        >{`${current} of ${allUsersPage.pageCount}`}</div> */}
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
