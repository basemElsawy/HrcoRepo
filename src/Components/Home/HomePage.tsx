import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./AuthLayout.module.css";
import section1Pic from "../../assets/comments.png";
import section2Pic from "../../assets/chart.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DashboardService from "../ApiServices/DashboardService";
import { Comment, LoggedInUser, Users, UsersPage } from "../Models/Models";
import unknown from "../../assets/Unknown_person.jpg";
import EmployeesService from "../ApiServices/EmployeesService";
import { Offcanvas } from "react-bootstrap";
import RequestsComponent from "./RequestsComponent";

let shallowUsersPage: UsersPage = {
  totalCount: 0,
  data: [],
  pageSize: 0,
  pageCount: 0,
};

const HomePage = () => {
  const dashboardService = new DashboardService();
  const [users, setUsers] = useState<Users[]>([]);
  const [allUsersPageData, setPageData] = useState<UsersPage>(shallowUsersPage);
  const [offCanvasState, SetOffCanvasState] = useState<boolean>(false);
  const [isCommenting, setCommentState] = useState<boolean>(false);
  const [activeCommentIdx, setActiveComment] = useState<number>();
  const [comment, setComment] = useState<string>("");
  let pageSize: number = 5;

  const activateCommentWindow = (idx: number) => {
    setActiveComment(idx);
    setCommentState(true);
  };

  const sendCommentHandler = (empCode: string) => {
    let admin: LoggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
    let commentRequestBody: Comment = {
      employeeCode: empCode,
      moderatorName: admin.fullName,
      moderatorID: admin.userID,
      commentText: comment,
    };
    if (admin && comment.length) {
      dashboardService
        .addCommentToUser(commentRequestBody)
        .then((res: any) => {
          toast("comment added successfully");
          console.log(res);
        })
        .catch((error) => {
          toast("error occured try again later");
          console.log(error);
        });
    } else {
      toast("Please add some to text to the comment area");
    }
    setComment("");

    setCommentState(false);
  };
  useEffect(() => {
    dashboardService.GetAllUsers(1, pageSize).then((res: UsersPage | any) => {
      console.log(res);
      setUsers(res.data);
      setPageData(res);
      console.log(res.data);
    });
  }, [0]);

  return (
    <section className={styles.section_container}>
      <div
        className={
          "btn btn-primary d-flex justify-content-between align-items-center gap-3 " +
          styles.reqBtn
        }
        onClick={() => SetOffCanvasState(true)}
      >
        <i className="fa-solid fa-bullhorn"></i>
        <p>Requests</p>
      </div>
      <Offcanvas
        placement={"end"}
        show={offCanvasState}
        onHide={() => SetOffCanvasState(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>All Requests</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <RequestsComponent />
        </Offcanvas.Body>
      </Offcanvas>
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
            <Link to={"/employees"}>
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
                      <td>{item.phoneNumber}</td>
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
                          <button
                            className={
                              styles.options_btn + " " + styles.commentBtn
                            }
                          >
                            <i
                              onClick={() => {
                                activateCommentWindow(idx);
                              }}
                              className="fa-solid fa-comment"
                            ></i>
                            <div
                              className={
                                idx === activeCommentIdx && isCommenting
                                  ? styles.commentContainer +
                                    " " +
                                    styles.activeComment
                                  : styles.commentContainer
                              }
                            >
                              <div
                                className={styles.closeBtn}
                                onClick={() => setCommentState(false)}
                              >
                                <i className="fa-solid fa-close"></i>
                              </div>
                              <div className={styles.commentWrapper}>
                                <input
                                  type="text"
                                  placeholder="want to say something"
                                  value={comment}
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) => {
                                    setComment(e.target.value);
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    sendCommentHandler(item.employeeCode);
                                  }}
                                >
                                  Send
                                </button>
                              </div>
                            </div>
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
        <div className={styles.tableFooter}>
          <p>Showing {`${pageSize} of total ${allUsersPageData.totalCount}`}</p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
