import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { apiPost } from "../../../api/apiCommon";
import config from "../../../config";
import { useState, useEffect } from "react";
import baseURL from "../../../base";
import Button from "@mui/material/Button";
import { Col, Row } from "antd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { Modal } from "antd";
import usePagination from "../../../hooks/usePagination";
import { ProgressBar } from "react-loader-spinner";

import Tooltip from '@mui/material/Tooltip';
import "../../../Style.css";
import InfiniteScroll from "react-infinite-scroll-component";

function SecurityEntity() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [auditResult, setAuditResult] = useState({});
  const [table2, setTable2] = useState([]);
  const [totalTable, setTotalTable] = useState({});
  // const [count, setCount] = React.useState(0);
  const [table3, setTable3] = useState([]);
  const [pokemonData, setPokemonData] = useState();
  // Setting up states for InfiniteScroll
  const [scrollData, setScrollData] = useState();
  const [hasMoreValue, setHasMoreValue] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const userString = sessionStorage.getItem("Audit_user");
  const user = JSON.parse(userString);

  useEffect(() => {
    (async () => {
      let data = {
        userUID: user.userUID,
      };
      const response = await apiPost(baseURL + config.GetSafetyAudit, data);
      setrowData(response.data.data);
      // console.log(response);
    })();
  }, []);

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
      cellStyle: { textAlign: "start" },
      cellRendererFramework: (params) => (
        <>
          {/* <Button onClick={() => userStatusFunc(params)}> <Switch
            checked={params.data.isActive === "1" ? true : false}/> </Button> */}
          <Tooltip title="Edit">  <IconButton onClick={() => handleauditView(params)}>
            <VisibilityIcon />
          </IconButton></Tooltip>

        </>
      ),
    },
  ]);


  const loadScrollData = async () => {

    try {
      setScrollData(pokemonData.slice(0, scrollData.length + 8));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleOnRowsScrollEnd = () => {
    if (scrollData.length <= pokemonData.length) {
      setHasMoreValue(true);
      loadScrollData();
    } else {
      setHasMoreValue(false);
    }
  };

  async function handleauditView(params) {
    // console.log(gridApi)
    setModalOpen(true);
    // console.log(params.data);
    let data = {
      entityUID: params.data.auditEntityUID,
      auditUID: params.data.auditUID,
    };
    const response = await apiPost(baseURL + config.ViewAuditDetails, data);
    // console.log(response.data);
    setTable2(response.data.data.scoreDetails);
    setAuditResult(response.data.data.auditDetails[0]);
    setTotalTable(response.data.data.totalauditDetails);
    setPokemonData(response.data.data.scoreDetails);
    // Let's set up primary array of items to render in InfiniteScroll

    setScrollData(response.data.data.scoreDetails);
    let array = [];

    response.data.data.scoreDetails.forEach((q) => {
      array.push({
        "auditTypeName": q.auditTypeName,
        "oK": q.ok_count,
        "nOTOK": q.nok_count,
        "n/A": q.na_count,
        "priority": q.p_count,
        "riskRating": q.r_count,
        "score": q.s_count,
      });
    });
    // console.log(array);
    setTable3(array);
  }

  const { paginate, count, currentItems, currentPage } = usePagination(
    table2,
    8
  );

  const onGridReady = (params) => {
    setgridApi(params.api);

    params.api.sizeColumnsToFit();
  };
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

  const exampleMetadata = [
    {
      columnName: "AuditTypeName",
      order: 0,
      locked: false,
      visible: true,
      displayName: "",
    },
    {
      columnName: "OK",
      order: 1,
      locked: false,
      visible: true,
      displayName: "Employee Name",
    },
    {
      columnName: "NOT OK",
      order: 2,
      locked: false,
      visible: true,
    },
    {
      columnName: "N/A",
      order: 3,
      locked: false,
      visible: true,
    },
    {
      columnName: "Priority",
      order: 4,
      locked: false,
      visible: true,
    },
    {
      columnName: "Risk Rating",
      order: 5,
      locked: false,
      visible: true,
    },
    {
      columnName: "Score",
      order: 6,
      locked: false,
      visible: true,
    },
  ];

  const someData = [
    {
      AuditTypeName: 0,
      OK: "Mayer Leonard",
      "NOT OK": "Kapowsin",
      "N/A": "Hawaii",
      Priority: "United Kingdom",
      "Risk Rating": "Ovolo",
      Score: "Ovolo",
    },
  ];

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
        width={1200}
      >
        <Row gutter={8}>
          <Col lg={8}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24}>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <table style={{ width: "100%" }}>
                    <caption>Security check list result</caption>
                    <tbody>
                      {columns.map((q, i) => {
                        return (
                          <tr key={i}>
                            <th>
                              <span className="tableheader" style={{ paddingLeft: "7px", display: "flex" }}>{q.title}</span>
                            </th>
                            <td>{q.dataValue}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24}>
                <div style={{
                  justifyContent: "start", display: "flex", overflowX: "scroll",
                  width: "100%"
                }}>
                  <table>
                    <caption>TOTAL Check list RESULT</caption>
                    <tbody>
                      <tr>
                        <th className="head">OK</th>
                        <th className="head">NOT OK</th>
                        <th className="head">N/A</th>
                        <th className="head">Priority</th>
                        <th className="head">Risk Rating</th>
                        <th className="head">Score</th>
                        <th className="head">
                          <span>Score&#37;</span>
                        </th>
                        <th className="head">Status</th>
                      </tr>
                      <tr>
                        <td>{totalTable.okval}</td>
                        <td>{totalTable.nokval}</td>
                        <td>{totalTable.naval}</td>
                        <td>{totalTable.priorityval}</td>
                        <td>{totalTable.ratingval}</td>
                        <td>{totalTable.scoreval}</td>
                        <td>{totalTable.scoreper}</td>
                        <td>{totalTable.scorestatus}</td>

                      </tr>
                    </tbody>
                    {/* <h4> {totalTable.scoreper}-{totalTable.scorestatus}</h4> */}
                  </table>
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={16} md={24} sm={24} xs={24}>
            <div style={{ justifyContent: "start", display: "flex" }}>

              <table id="listingTable">
                <caption>valuation</caption>
                <tbody>
                  {/* <tr>
                  <td></td>
                
                </tr> */}
                  {scrollData ? (
                    <InfiniteScroll
                      dataLength={scrollData.length}
                      next={handleOnRowsScrollEnd}
                      hasMore={hasMoreValue}
                      scrollThreshold={1}
                      // Let's get rid of second scroll bar
                      style={{ overflowY: "scroll" }}
                      height="76vh"
                    >
                      <tr>
                        <td></td>
                        <th className="head">OK</th>
                        <th className="head">NOT OK</th>
                        <th className="head">N/A</th>
                        <th className="head">Priority</th>
                        <th className="head">Risk Rating</th>
                        <th className="head">Score</th>
                      </tr>
                      {scrollData.map((q, i) => {
                        return (
                          <tr key={i}>
                            <th>
                              <span className="tableheader" style={{ paddingLeft: "7px", display: "flex" }}>
                                {q.auditTypeName}-{q.auditsubtypeName}
                              </span>
                            </th>
                            <td>{q.ok_count}</td>
                            <td>{q.nok_count}</td>
                            <td>{q.na_count}</td>
                            <td>{q.p_count}</td>
                            <td>{q.r_count}</td>
                            {q.s_count === null ? (<td>0</td>) : (<td>{q.s_count}</td>)}
                          </tr>
                        );
                      })}
                    </InfiniteScroll>) : (<ProgressBar
                      height="50"
                      width="50"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor='#F4442E'
                      barColor='#51E5FF'
                    />)}
                </tbody>

              </table>

            </div>
          </Col>
        </Row>
        <Row style={{ justifyContent: "end", display: "flex" }} >
          <Button
            style={{
              backgroundColor: "red",
              fontSize: "12px",
              padding: "7px",
              color: "white",
            }}
            onClick={() => {
              setModalOpen(false); setAuditResult({}); setTable2([]); setTotalTable({})
            }}
          >
            Close
          </Button>
        </Row>
      </Modal>
    </>
  );
}

export default SecurityEntity;
