import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { apiPost } from "../../../api/apiCommon";
import config from "../../../config";
import { useState, useEffect } from "react";
import baseURL from "../../../base";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { Col, Menu, Row, Table } from "antd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { Modal } from "antd";
import { Card } from "antd";
import { useLayoutEffect } from "react";
import useScrollPosition from "./scroll";
import { ProgressBar } from "react-loader-spinner";
import Tooltip from '@mui/material/Tooltip';
import "../../../Style.css";
import { toast } from "react-toastify";

function FoodEntity() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [auditResult, setAuditResult] = useState({});
  const [table2, setTable2] = useState([]);
  const [totalTable, setTotalTable] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const userString = sessionStorage.getItem("Audit_user");
  const user = JSON.parse(userString);
  // const ScrollPosition = useScrollPosition();
  // console.log(ScrollPosition);

  useEffect(() => {
    (async () => {
      let data = {
        userUID: user.userUID,
      };
      const response = await apiPost(baseURL + config.GetFoodAudit, data);
      setrowData(response.data.data);
      // console.log(totalTable);
      // console.log(auditResult)
    })();
  }, [auditResult]);

  const [columnDef, setcolumnDef] = useState([
    {
      headerName: "Country", field: "country", width: "150", flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Store name", field: "storeName", width: "150", flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Check list status", field: "auditStatus", width: "150", flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Date", field: "auditDatetime", width: "150", flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "First name", field: "firstName", width: "150", flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Last name", field: "lastName", width: "150", flex: 3, sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "View",
      field: "auditUID",
      width: "100",
      cellStyle: { textAlign: "center" },
      cellRendererFramework: (params) => (
        <>
          {/* <Button onClick={() => userStatusFunc(params)}> <Switch
            checked={params.data.isActive === "1" ? true : false}/> </Button> */}
          <Tooltip title="View"> <IconButton onClick={() => handleauditView(params)}>
            <VisibilityIcon />
          </IconButton>
          </Tooltip>
        </>
      ),
    },
    // {
    //   headerName: 'View score', field: 'auditUID', width: '150', cellStyle: { textAlign: "center" }, cellRendererFramework: (params) => (<>
    //     {/* <Button onClick={() => userStatusFunc(params)}> <Switch
    //         checked={params.data.isActive === "1" ? true : false}/> </Button> */}
    //     <IconButton onClick={() => handlescoreView(params)}><VisibilityIcon /></IconButton></>
    //   )
    // },
  ]);

  // const [columnDefResult, setColumnDefResult] = useState([
  //   { headerName: "Country", field: "country", width: "100", flex: 3 },
  //   { headerName: "Store name", field: "storeName", width: "100", flex: 3 },
  //   {
  //     headerName: "Manager onduty",
  //     field: "managerOnduty",
  //     width: "100",
  //     flex: 3,
  //   },
  //   { headerName: "Food manager", field: "foodManager", width: "100", flex: 3 },
  //   { headerName: "Audit Date", field: "auditDatetime", width: "100", flex: 3 },
  //   {
  //     headerName: "Open meeting",
  //     field: "openingmeetingAttendees",
  //     width: "100",
  //     flex: 3,
  //   },
  //   {
  //     headerName: "Close meeting",
  //     field: "closingmeetingAttendees",
  //     width: "100",
  //     flex: 3,
  //   },
  //   {
  //     headerName: "View",
  //     field: "auditUID",
  //     width: "100",
  //     cellStyle: { textAlign: "start" },
  //     cellRendererFramework: (params) => (
  //       <>
  //         {/* <Button onClick={() => userStatusFunc(params)}> <Switch
  //       checked={params.data.isActive === "1" ? true : false}/> </Button> */}
  //         <IconButton onClick={() => handleauditView(params)}>
  //           <VisibilityIcon />
  //         </IconButton>
  //       </>
  //     ),
  //   },
  // ]);

  async function handleauditView(params) {

    // console.log(params.data);
    let data = {
      entityUID: params.data.auditEntityUID,
      auditUID: params.data.auditUID,
    };
    const response = await apiPost(baseURL + config.ViewAuditDetails, data);
    if (response.data.status === true && response.data.message === "Question Created Successfully") {
      // console.log(response.data);
      setTable2(response.data.data.scoreDetails);
      setAuditResult(response.data.data.auditDetails[0]);
      setTotalTable(response.data.data.totalauditDetails);
      setModalOpen(true);
    } else {
      toast.error("Please try again later")
      setModalOpen(false);

    }
  }
  // async function handlescoreView(params){
  //   handleauditView(params);

  // }

  const userStatusFunc = () => { };

  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  };

  const dataSource = [
    {
      key: "1",
      Country: auditResult.country,
      StoreName: auditResult.storeName,
      managerOnduty: auditResult.managerOnduty,
      foodManager: auditResult.foodManager,
      auditDatetime: auditResult.auditDatetime,
      openingmeetingAttendees: auditResult.openingmeetingAttendees,
      closingmeetingAttendees: auditResult.closingmeetingAttendees,
    },
  ];
  const columns = [
    {
      title: "Country",
      dataValue: auditResult.country,
    },
    {
      title: "Store name",
      dataValue: auditResult.storeName,
    },
    {
      title: "Manager on duty",
      dataValue: auditResult.managerOnduty,
    },
    {
      title: "Food manager",
      dataValue: auditResult.foodManager,
    },
    {
      title: "Audit date",
      dataValue: auditResult.auditDatetime,
    },
    {
      title: "Opening meeting",
      dataValue: auditResult.openingmeetingAttendees,
    },
    {
      title: "Closing meeting",
      dataValue: auditResult.closingmeetingAttendees,
    },
  ];

  const finalResultNames = [
    {
      id: 1,
      Name: "BUILDING_SANITATION",
    },
    {
      id: 2,
      Name: "EQUIPMENT_HYGIENE",
    },
    {
      id: 3,
      Name: "BPRODUCTION_HYGIENE",
    },
  ];

  // var lay1 = document.getElementById("scrollbar");
  // console.log(lay1);

  return (
    <>
      <div className="ag-theme-alpine" id="aggridheightWO">
        <AgGridReact
          defaultColDef={{
            editable: false,
            // enableRowGroup: true,
            // enablePivot: true,
            enableValue: true,

            // filter: "agTextColumnFilter",
            minWidth: 100,
            cellStyle: { textAlign: "left" },
          }}
          // suppressRowClickSelection={true}
          // groupSelectsChildren={true}
          // debug={true}
          // rowSelection={'multiple'}
          // /*  rowGroupPanelShow={'always'} */
          // pivotPanelShow={'always'}
          // enableRangeSelection={true}
          pagination={true}
          onGridReady={onGridReady}
          columnDefs={columnDef}
          rowData={rowData}
        />
      </div>
      <Modal
        title="Audit scoring and result panel"
        centered
        destroyOnClose={true}
        visible={modalOpen}
        onOk={() => { setModalOpen(false); setAuditResult({}); setTable2([]); setTotalTable({}) }}
        onCancel={() => { setModalOpen(false); setAuditResult({}); setTable2([]); setTotalTable({}) }}
        footer={[null]}
        maskClosable={false}
        width={1190}
      >
        {/* <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
      <AgGridReact
        defaultColDef={{
          editable: false,
          // enableRowGroup: true,
          // enablePivot: true,
          enableValue: true,
          sortable: true,
          resizable: true,
          filter: true,
          floatingFilter: true,
          filter: 'agTextColumnFilter',
          minWidth: 100,
          cellStyle: { textAlign: 'left' }
        }}
        pagination={true}
        onGridReady={onGridReady}
        columnDefs={columnDefResult}
        rowData={auditResult}

      />
    </div> */}

        {/* <Label></Label> */}
        {/* 
        <Card
          // title="Food safety audit result"
          bordered={true}
          style={{
            width: '400',
          }}
          className='auditresult'
        > */}
        {/* <div style={{ justifyContent: "center", display: "flex" }}>
            <h3 className='reportfoodentity'>Food safety audit result</h3>
          </div> */}

        {/* <Table pagination={false} dataSource={dataSource} columns={columns} /> */}
        <Row>
          <Col lg={7} md={7} sm={24} xs={24} >
            <div style={{ justifyContent: "start", display: "flex" }}>
              {columns ? (<table>
                <caption>Food safety audit result</caption>
                <tbody>

                  {columns?.map((q, i) => {
                    return (
                      <tr key={i}>
                        <th>
                          <span className="tableheader" style={{ paddingLeft: "7px", display: "flex" }}>{q.title}</span>
                        </th>
                        <td>
                          <span >{q.dataValue}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>) : (<ProgressBar
                height="50"
                width="50"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='#F4442E'
                barColor='#51E5FF'
              />)}

            </div>
          </Col>

          {/* <div className='resultdata'>Country         : {auditResult.country}</div>
      <div>Store name      : {auditResult.storeName}</div>
      <div>Manager On Duty : {auditResult.managerOnduty}</div>
      <div>Food manager    : {auditResult.foodManager}</div>
      <div>Audit date      : {auditResult.auditDatetime}</div>
      <div>Opening meeting : {auditResult.openingmeetingAttendees}</div>
      <div>Closing meeting : {auditResult.closingmeetingAttendees}</div> */}
          {/* </Card> */}

          <Col lg={11} md={17} sm={24} xs={24}>
            <div

            >
              {table2 ? (<table>
                <caption>valuation</caption>
                <div
                  id="scrollbar"
                  style={{ overflowY: "scroll", height: "55vh" }}
                >
                  <tbody>
                    {/* <tr>
                  <td></td>
                
                </tr> */}
                    <tr>
                      <td></td>
                      <th className="head">
                        <span>&#8544;</span>
                      </th>
                      <th className="head">
                        <span>&#8545;</span>
                      </th>
                      <th className="head">
                        <span>&#8546;</span>
                      </th>
                      <th className="head">
                        <span>&#8547;</span>
                      </th>
                      <th className="head">Score</th>
                      <th className="head">Status</th>
                    </tr>
                    {table2.map((q, i) => {
                      return (
                        <tr key={i}>
                          {/* <th>{q.auditTypeName}</th> */}
                          <th>
                            <span className="tableheader" style={{ paddingLeft: "7px", display: "flex" }}>
                              {q.auditTypeName}
                            </span>
                          </th>
                          <td>{q.A_count}</td>
                          <td>{q.B_count}</td>
                          <td>{q.C_count}</td>
                          <td>{q.D_count}</td>
                          <td>{parseInt(q.finalscore).toFixed(1)}<span>&#37;</span></td>
                          <td>{q.scorestatus}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </div>
              </table>) : (<ProgressBar
                height="50"
                width="50"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='#F4442E'
                barColor='#51E5FF'
              />)}

            </div>
          </Col>

          <Col lg={6} sm={24} xs={24}>
            <div className="foodtotalaudittable" style={{ justifyContent: "end", display: "flex", }}>
              {totalTable ? (<table>
                <caption>TOTAL AUDIT RESULT</caption>
                <tbody>
                  <tr>
                    <th className="head">
                      <span>&#8544;</span>
                    </th>
                    <th className="head">
                      <span>&#8545;</span>
                    </th>
                    <th className="head">
                      <span>&#8546;</span>
                    </th>
                    <th className="head">
                      <span>&#8547;</span>
                    </th>
                    <th className="head">
                      Score <span>&#37;</span>
                    </th>
                    <th className="head">Status</th>
                  </tr>
                  <tr>
                    <td>{totalTable.val1}</td>
                    <td>{totalTable.val2}</td>
                    <td>{totalTable.val3}</td>
                    <td>{totalTable.val4}</td>
                    <td>{parseInt(totalTable.scoreper).toFixed(1)}<span>&#37;</span></td>
                    <td>{totalTable.scorestatus}</td>
                  </tr>
                </tbody>
              </table>) : (<ProgressBar
                height="50"
                width="50"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='#F4442E'
                barColor='#51E5FF'
              />)}

            </div>
          </Col>
        </Row>
        <Row style={{ justifyContent: "end", display: "flex" }}>
          <Button
            style={{
              backgroundColor: "red",
              fontSize: "12px",
              padding: "7px",
              color: "white",
            }}
            onClick={() => { setModalOpen(false); setAuditResult({}); setTable2([]); setTotalTable({}) }}
          >
            Close
          </Button>
        </Row>
      </Modal>
    </>
  );
}

export default FoodEntity;

// <tbody>
// <tr>
//   <td></td>
//   {/* {table2.map((q)=>{
//     <div key={q.auditTypeUID} value={q.A_count}></div>
//     return(
//       <th>{q.A_count}</th>
//     )
//   })} */}
//  <th>A_count</th>
//  <th>B_count</th>
//  <th>C_count</th>
//  <th>D_count</th>
//  <th>Score percentage</th>
// </tr>
// <tr>
//    {table2.map((q)=>{
//     <div key={q.auditTypeUID} value={q.auditTypeUID}></div>
//     return(
//       <th>{q.auditTypeName}</th>
//     )
//   })}
//   {/* <th>col 1</th> */}
//   {table2.map((q)=>{
//     <div key={q.auditTypeUID} value={q.auditTypeUID}></div>
//     return(
//       <td>{q.A_count}</td>

//     )
//   })}
//   {table2.map((q)=>{
//     <div key={q.auditTypeUID} value={q.auditTypeUID}></div>
//     return(
//       <td>{q.B_count}</td>

//     )
//   })}
//   {table2.map((q)=>{
//     <div key={q.auditTypeUID} value={q.auditTypeUID}></div>
//     return(
//       <td>{q.C_count}</td>

//     )
//   })}
//   {table2.map((q)=>{
//     <div key={q.auditTypeUID} value={q.auditTypeUID}></div>
//     return(
//       <td>{q.D_count}</td>

//     )
//   })}
//   {table2.map((q)=>{
//     <div key={q.auditTypeUID} value={q.auditTypeUID}></div>
//     return(
//       <td>{q.scorePercentage}</td>

//     )
//   })}
//   {/* <td>data1</td>  */}
//   {/* <td>data2</td>
//   <td>data2</td>
//   <td>data2</td>
//   <td></td> */}
// </tr>
// </tbody>
