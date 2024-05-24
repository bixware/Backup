import React, { useState, useEffect } from "react";
import cost from "../../../Assets/img/cpu2.png";
import nso from "../../../Assets/img/nso2.png";
import code from "../../../Assets/img/mcc2.png";
import recipe from "../../../Assets/img/rc21.png";
// import { Link } from "react-router-dom/cjs/react-router-dom";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link } from "@mui/material";

const Workflow = () => {
  const history = useHistory();
  const userString = sessionStorage.getItem("bixware_user");
  const user = JSON.parse(userString);
  const [workFlows, setWorkFlows] = useState([]);
  const [loading, setLoading] = useState(true);

  // const handleEdit = () => {
  //   history.push({
  //     pathname: "/app/user/add-cost",
  //   });
  // };
  // const handleEdit1 = () => {
  //   history.push({
  //     pathname: "/app/user/add-nso",
  //   });
  // };
  // const handleEdit2 = () => {
  //   history.push({
  //     pathname: "/app/user/add-material",
  //   });
  // };
  // const handleEdit3 = () => {
  //   history.push({
  //     pathname: "/app/user/add-receipe",
  //   });
  // };

  useEffect(() => {
    let workflowUsers = user.get_work_flow_statge_user;
    let workFlowName = [];
    workflowUsers.forEach((item, i) => {
      if (
        item.stageName === "Initiator" &&
        item.workFlowName === "Cost Price Update"
      ) {
        workFlowName.push({
          workFlowName: item.workFlowName,
          workFlowUID: item.workFlowUID,
          imagesrc: cost,
          url: "/app/user/workflow/add-cost",
        });
      } else if (
        item.stageName === "Initiator" &&
        item.workFlowName === "NSO Store Live"
      ) {
        workFlowName.push({
          workFlowName: item.workFlowName,
          workFlowUID: item.workFlowUID,
          imagesrc: nso,
          url: "/app/user/workflow/add-nso",
        });
      } else if (
        item.stageName === "Initiator" &&
        item.workFlowName === "Material Code Creation"
      ) {
        workFlowName.push({
          workFlowName: item.workFlowName,
          workFlowUID: item.workFlowUID,
          imagesrc: code,
          url: "/app/user/workflow/add-material",
        });
      } else if (
        item.stageName === "Initiator" &&
        item.workFlowName === "Receipe Creation"
      ) {
        workFlowName.push({
          workFlowName: item.workFlowName,
          workFlowUID: item.workFlowUID,
          imagesrc: recipe,
          url: "/app/user/workflow/add-receipe",
        });
      }
    });
    // console.log(workFlowName);
    setWorkFlows(workFlowName);
    setLoading(false);
  }, []);

  const handleEdit = (url) => {
    history.push({
      pathname: url,
    });
  };

  return (
    <>
      <div className="container mt-5">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <i
              className="zmdi zmdi-spinner zmdi-hc-spin"
              style={{ fontSize: "3rem" }}
            ></i>
            <span style={{ fontSize: "1.5rem" }}>{"  "}Loading...</span>
          </div>
        ) : (
          <div className="row">
            {workFlows.map((item, i) => (
              <div className="col-lg-6" key={i}>
                <div
                  class="img-box text-center mb-3"
                  style={{ cursor: "pointer" }}
                >
                  <i onClick={() => handleEdit(item.url)}>
                    <img src={item.imagesrc} />
                  </i>
                </div>
                <div
                  className="title text-center mb-3"
                  style={{ cursor: "pointer" }}
                >
                  <i onClick={() => handleEdit(item.url)}>
                    <h2>{item.workFlowName}</h2>
                  </i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div class="container mt-5">
        <div class="row ">
          <div class="col-lg-6">
            <div class="img-box text-center mb-3" style={{ cursor: "pointer" }}>
              <i onClick={() => handleEdit()}>
                <img src={cost} />
              </i>
            </div>
            <div class="title text-center mb-3"  style={{ cursor: "pointer" }}>
              <i onClick={() => handleEdit()}>
                <h2>Cost Price Update</h2>
              </i>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="img-box text-center mb-3" style={{ cursor: "pointer" }}>
              <i onClick={() => handleEdit1()}>
                <img src={nso} />
              </i>
            </div>
            <div class="title text-center mb-3" style={{ cursor: "pointer" }}>
              <i onClick={() => handleEdit1()}>
                <h2>NSO Store Live</h2>
              </i>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-lg-6">
            <div class="img-box text-center mb-3"  style={{ cursor: "pointer" }}>
              <i onClick={() => handleEdit2()}>
                <img src={code} />
              </i>
            </div>
            <div class="title text-center mb-3"  style={{ cursor: "pointer" }}>
              <i onClick={() => handleEdit2()}>
                <h2>Material Code Creation</h2>
              </i>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="img-box text-center mb-3" style={{ cursor: "pointer" }}>
              <i onClick={() => handleEdit3()}>
                <img src={recipe} />
              </i>
            </div>
            <div class="title text-center mb-3" style={{ cursor: "pointer" }}>
              <i onClick={() => handleEdit3()}>
                <h2>Receipe Creation</h2>
              </i>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Workflow;
