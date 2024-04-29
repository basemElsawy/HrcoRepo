import React, { useState, useContext, useEffect } from "react";
import RequestService from "../ApiServices/RequestsService";
import RequestsComponent from "./RequestsComponent";
import { Offcanvas } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { mainContext } from "../GlobalContext/globalContext";
import styles from "./RequestsCompStyles.module.css";
const SidePanel = () => {
  const requestsService = new RequestService();
  const { requestsSidePanel, setRequests, setNotificationCount } =
    useContext<any>(mainContext);
  const [reqData, setReqData] = useState<any>({});
  const [sidePanelLoading, setSidePanelLoading] = useState<boolean>(false);
  const [reqDataPage, setReqDataPage] = useState<number>(1);

  let pageSizeReq: number = 6;

  function updateStateOfRequest(reqID: string | number) {
    let body = { approvedByManager: true, approvedByHr: true };
    //
    requestsService
      .updateEmployeesRequest(
        `/api/Request/updateRequestState?reqID=${reqID}`,
        body
      )
      .then((res) => {
        if (res) {
          getUsersRequests();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getRequestsByDate(e: any) {
    let param = {
      dateRange: e.target.value,
      page: reqDataPage,
      pageSize: pageSizeReq,
    };
    setSidePanelLoading(true);
    requestsService
      .employeeRequestsByDateRange(param)
      .then((res) => {
        if (res?.data) {
          setNotificationCount(res.data.length);
          setReqData(res);
          setSidePanelLoading(false);
        } else {
          setSidePanelLoading(false);
          setReqData({});
        }
      })
      .catch((error) => {
        if (error) {
        }
        console.log(error);
      });
  }

  function getSubmitted() {
    let param = { page: reqDataPage, pageSize: pageSizeReq };
    setSidePanelLoading(true);
    requestsService
      .getEmployeesRequests("/api/Request/getAllSubmittedRequests", param)
      .then((res) => {
        if (res.data) {
          setNotificationCount(0);
          setReqData(res);
          setSidePanelLoading(false);
        } else {
          setSidePanelLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function ignoreRequestHandler(reqID: string | number) {}

  function getIgnored() {
    let param = { page: reqDataPage, pageSize: pageSizeReq };
    setSidePanelLoading(true);
    requestsService
      .getEmployeesRequests("/api/Request/getAllIgnoredRequests", param)
      .then((res) => {
        if (res.data) {
          setNotificationCount(0);
          setReqData(res);
          setSidePanelLoading(false);
        } else {
          setSidePanelLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getUsersRequests() {
    let paging = { pageSize: pageSizeReq, page: 1 };

    setSidePanelLoading(true);
    requestsService
      .getEmployeesRequests("/api/Request/getAllNoActionRequests", paging)
      .then((res: any) => {
        if (res?.data) {
          setNotificationCount(res.data.length);
          setReqData(res);
          setSidePanelLoading(false);
        } else {
          setSidePanelLoading(false);
          setReqData({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUsersRequests();
  }, []);

  return (
    <>
      <Offcanvas
        placement={"start"}
        show={requestsSidePanel}
        onHide={() => setRequests(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>All Requests</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            className={
              "d-flex  align-items-start w-100 justify-content-between flex-column " +
              styles.offcanvas_header
            }
          >
            <div className="text-muted text-small d-flex  justify-content-start align-items-center gap-2">
              <div className="mx-1 py-1 ">Filter Requests By</div>
            </div>
            <div className="d-flex w-100 align-flex just-content-between btn-group ">
              <button
                onClick={getUsersRequests}
                value={"30"}
                className="btn btn-primary text-small "
              >
                All
              </button>
              <button
                onClick={getRequestsByDate}
                value={"30"}
                className="btn btn-primary text-small "
              >
                Month
              </button>
              <button
                onClick={getRequestsByDate}
                value={"7"}
                className="btn btn-primary text-small"
              >
                Week
              </button>
              <button
                onClick={getRequestsByDate}
                value={"24"}
                className="btn btn-primary text-small"
              >
                Day
              </button>
              <OverlayTrigger
                placement="top"
                overlay={(props: any) => (
                  <Tooltip id="button-tooltip" {...props}>
                    Submitted Requests
                  </Tooltip>
                )}
              >
                <button
                  onClick={getSubmitted}
                  className="btn btn-primary text-small"
                >
                  <i className="fa-solid fa-check"></i>
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={(props: any) => (
                  <Tooltip id="button-tooltip" {...props}>
                    Ignored Requests
                  </Tooltip>
                )}
              >
                <button
                  onClick={getIgnored}
                  className="btn btn-primary text-small"
                >
                  <i className="fa-solid fa-dumpster"></i>
                </button>
              </OverlayTrigger>
            </div>
          </div>
          <div>
            {reqData?.data ? (
              !sidePanelLoading ? (
                <RequestsComponent
                  reqData={reqData?.data}
                  updateState={updateStateOfRequest}
                  ignoreRequest={ignoreRequestHandler}
                  getDataByDate={getRequestsByDate}
                />
              ) : (
                <div className={"my-5 py-5 " + styles.loaderContainer}>
                  <div className={styles.loader}></div>
                </div>
              )
            ) : (
              <div className="px-1 my-5 m-1">No Requests Found</div>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SidePanel;
