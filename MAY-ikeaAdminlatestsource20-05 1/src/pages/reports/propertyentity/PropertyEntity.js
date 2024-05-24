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
import { Col, Menu, Row } from "antd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { Modal } from "antd";
import { Card } from "antd";
import { Label } from "reactstrap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import usePagination from "../../../hooks/usePagination";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ProgressBar } from "react-loader-spinner";
import Tooltip from '@mui/material/Tooltip';
import "../../../Style.css";
// import "../../../Style.css";

function PropertyEntity() {
  const [rowData, setrowData] = useState(null);
  const [gridApi, setgridApi] = useState(null);
  const [auditResult, setAuditResult] = useState({});
  const [table2, setTable2] = useState([]);
  const [totalTable, setTotalTable] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const userString = sessionStorage.getItem("Audit_user");
  const user = JSON.parse(userString);

  useEffect(() => {
    (async () => {
      let data = {
        userUID: user.userUID,
      };
      const response = await apiPost(baseURL + config.GetPropertyAudit, data);
      setrowData(response.data.data);
      // console.log(response.data.data);
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
          <Tooltip title="View"><IconButton onClick={() => handleauditView(params)}>
            <VisibilityIcon />
          </IconButton></Tooltip>
        </>
      ),
    },
  ]);

  async function handleauditView(params) {
    setModalOpen(true);
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

    } else {
      toast.error("Please try again later")
      setModalOpen(false);
    }
  }

  const userStatusFunc = () => { };

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

  const { paginate, count, currentItems, currentPage } = usePagination(
    table2,
    6
  );

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
        width={1237}
      >
        <Row gutter={8}>
          <Col lg={7} md={9} sm={24} xs={24}>
            <div className="propertytable1" style={{ justifyContent: "start", display: "flex" }}>
              {columns ? (<table>
                <caption>Property audit result</caption>
                <tbody>
                  {columns.map((q, i) => {
                    return (
                      <tr key={i}>
                        {/* <th>{q.title}</th> */}
                        <th>
                          <span className="tableheader" style={{ paddingLeft: "7px", display: "flex" }}>{q.title}</span>
                        </th>
                        <td>{q.dataValue}</td>
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
          <Col lg={10} md={15} sm={24} xs={24}>
            <div style={{ marginLeft: "-25px", display: "flex" }}>
              {table2 ? (<table>
                <caption>valuation</caption>
                <div className="propertytable2" style={{ height: "70vh", overflowY: "scroll" }}>
                  <tbody className="tbodyproperty">
                    {/* <tr>
                  <td></td>
                
                </tr> */}
                    <tr>
                      <td></td>
                      <th className="head">Max score</th>
                      <th className="head">Not OK</th>
                      <th className="head">OK</th>
                      <th className="head">Good example</th>
                      <th className="head">
                        <span>Score&#37;</span>
                      </th>
                    </tr>
                    {table2.map((q, i) => {
                      return (
                        <tr key={i}>
                          {/* <th>{q.auditTypeName}</th> */}
                          <th>
                            <span className="tableheader" style={{ paddingLeft: "7px", display: "flex" }}>{q.auditTypeName}</span>
                          </th>
                          <td >{q.maxpoints}</td>
                          <td>{q.nokcount}</td>
                          <td>{q.okcount}</td>
                          <td>{q.goodcount}</td>
                          <td>{q.scorepercentage}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </div>
                {/* <Pagination
                  count={count}
                  page={currentPage}
                  onChange={(e, p) => paginate(p)}
                /> */}
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
          <Col lg={7}>
            <div className="propertyreport" style={{ justifyContent: "start", display: "flex" }}>
              {totalTable ? (<table>
                <caption>TOTAL AUDIT RESULT</caption>
                <tbody>
                  <tr>
                    <th className="head">Max score</th>
                    <th className="head">Not OK</th>
                    <th className="head">OK</th>
                    <th className="head">Good example</th>
                    <th className="head">
                      <span>Score&#37;</span>
                    </th>
                    <th className="head">Score status</th>
                  </tr>
                  <tr>
                    <td>{totalTable.maxscore}</td>
                    <td>{totalTable.nokval}</td>
                    <td>{totalTable.okval}</td>
                    <td>{totalTable.goodval}</td>
                    <td>{totalTable.scoreper}</td>
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

export default PropertyEntity;
