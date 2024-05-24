import React from "react";
import cost from "../../../Assets/img/cpu.png";
import nso from "../../../Assets/img/nso.png";
import code from "../../../Assets/img/mcc.png";
import recipe from "../../../Assets/img/rc.png";
// import { Link } from "react-router-dom/cjs/react-router-dom";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link } from "@mui/material";

const CostPrice = () => {
  const history = useHistory();
  const handleEdit = () => {
    history.push({
      pathname: "",
    });
  };
  const handleEdit1 = () => {
    history.push({
      pathname: "",
    });
  };
  const handleEdit2 = () => {
    history.push({
      pathname: "",
    });
  };
  const handleEdit3 = () => {
    history.push({
      pathname: "",
    });
  };

  return (
    <>
      <div class="container mt-5">
        <div class="row ">
          <div class="col-lg-6">
            <div class="img-box text-center mb-3" style={{ cursor: "pointer" }}>
              <i onClick={() => handleEdit()}>
                <img src={cost} />
              </i>
            </div>
            <div class="title text-center mb-3">
              <i onClick={() => handleEdit()}>
                <h2>Cost Price Update</h2>
              </i>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="img-box text-center mb-3">
              <i onClick={() => handleEdit1()}>
                <img src={nso} />
              </i>
            </div>
            <div class="title text-center mb-3">
              <i onClick={() => handleEdit1()}>
                <h2>NSO Store Live</h2>
              </i>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-lg-6">
            <div class="img-box text-center mb-3">
              <i onClick={() => handleEdit2()}>
                <img src={code} />
              </i>
            </div>
            <div class="title text-center mb-3">
              <i onClick={() => handleEdit2()}>
                <h2>Material Code Creation</h2>
              </i>

              {/* <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </span> */}
            </div>
          </div>
          <div class="col-lg-6">
            <div class="img-box text-center mb-3">
              <i onClick={() => handleEdit3()}>
                <img src={recipe} />
              </i>
            </div>
            <div class="title text-center mb-3">
              <i onClick={() => handleEdit3()}>
                <h2>Receipe Creation</h2>
              </i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CostPrice;
