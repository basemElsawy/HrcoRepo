import { ChangeEvent, useEffect, useState } from "react";
import EmployeesService from "../ApiServices/EmployeesService";
import styles from "./showEmployees.module.css";
import { Link } from "react-router-dom";
import { UsersPage, Users } from "../Models/Models";
import unknown from "../../assets/Unknown_person.jpg";
import { toast } from "react-toastify";

const shallowUser: Users = {
  id: "",
  fullName: "",
  password: "",
  image: "",
  RoleID: 0,
  Role: { Id: 0, Description: "" },
  phoneNumber: "",
  employeeCode: "",
  title: "",
  email: "",
};
let shallowUsersPage: UsersPage = {
  totalCount: 0,
  data: [],
  pageSize: 0,
  pageCount: 0,
};
const ShowEmployees = () => {
  const employeeService = new EmployeesService();
  const [users, setUsers] = useState<Users[]>([]);
  const [specificUser, setSpecificUser] = useState<Users>(shallowUser);
  const [employeeCode, setEmployeeCode] = useState<string>("");
  const [allUsersPage, setPageData] = useState<UsersPage>(shallowUsersPage);
  let [current, setCurrent] = useState(1);
  const pageSize = 10;
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployeeCode(e.target.value);
  };

  const nextPageHandler = () => {
    setCurrent((prev) => {
      if (prev == allUsersPage?.pageCount) {
        return prev;
      }

      return prev + 1;
    });
    console.log(current);
  };
  const prevPageHandler = () => {
    setCurrent((prev) => {
      if (prev == 1) {
        return prev;
      }

      return prev - 1;
    });
    console.log(current);
  };

  useEffect(() => {
    // console.log(page);
    if (specificUser.employeeCode) {
      setUsers([]);

      return;
    }
    employeeService
      .GetAllUsers(current, pageSize)
      .then((res: UsersPage | any) => {
        setUsers(res.data);
        setPageData(res);
        console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [specificUser, current]);

  useEffect(() => {
    if (employeeCode.length)
      employeeService
        .getSpecificUser(employeeCode)
        .then((res: Users) => {
          console.log(res);
          setSpecificUser(res);
        })
        .catch((err: Error) => {
          toast("User was not found", { closeOnClick: true });
          setSpecificUser(shallowUser);

          console.log(err);
        });
  }, [employeeCode]);

  const userTable = specificUser.employeeCode != "" && (
    <tr className={styles.emp_data} key={specificUser?.id}>
      <td>{specificUser.employeeCode}</td>
      <td className={styles.image_td}>
        <div className={styles.person_image}>
          <img
            src={specificUser?.image ? specificUser?.image : unknown}
            alt=""
          />
        </div>
      </td>
      <td>{specificUser?.fullName}</td>
      <td>{specificUser?.phoneNumber}</td>
      <td>{specificUser?.title}</td>
      <td>
        <div className={styles.table_buttons}>
          <Link to={`/edit/${specificUser?.employeeCode}`}>
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

  return (
    <section className={styles.employeesContainer}>
      <div className={styles.headlineContainer}>
        <div>
          <h2>Showing All Employees</h2>
        </div>
        <div className={styles.actionsContainer}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={employeeCode}
              placeholder="Employee Code"
              onChange={searchHandler}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <Link to={"/edit"}>
            <button>Add New</button>
          </Link>
        </div>
      </div>
      <div className={styles.contentTableContainer}>
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
            {!specificUser.employeeCode.length &&
              users.length &&
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

                        <button className={styles.options_btn}>
                          <i className="fa-solid fa-comment"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            {userTable}
          </tbody>
        </table>
        <div className={styles.tableFooter}>
          <p>
            Showing{" "}
            {`${users.length ? users.length : "1"} of Total ${
              allUsersPage.totalCount
            }`}
          </p>
        </div>
      </div>
      <div className={styles.pagination}>
        <div className={styles.pageHandlers} onClick={prevPageHandler}>
          <i className="fa-solid fa-caret-left"></i>
          <p>Prev</p>
        </div>
        <div
          className={styles.middleText}
        >{`${current} of ${allUsersPage.pageCount}`}</div>
        <div className={styles.pageHandlers} onClick={nextPageHandler}>
          <p>Next</p>
          <i className="fa-solid fa-caret-right"></i>
        </div>
      </div>
    </section>
  );
};

export default ShowEmployees;
