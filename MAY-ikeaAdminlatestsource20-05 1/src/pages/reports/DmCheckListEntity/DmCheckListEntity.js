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
import Tooltip from '@mui/material/Tooltip';
import "../../../Style.css";

function DmCheckListEntity() {
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
      const response = await apiPost(baseURL + config.GetDMCheckAudit, data);
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
        <><Tooltip title="View">
          <IconButton onClick={() => handleauditView(params)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
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
    // console.log(response.data);
    setTable2(response.data.data.scoreDetails);
    setAuditResult(response.data.data.auditDetails[0]);
    setTotalTable(response.data.data.totalauditDetails);
  }

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
        width={700}
      >
        <Row gutter={8}>
          <Col lg={12} md={12} sm={24} xs={24} >
            <div style={{ justifyContent: "start", display: "flex" }}>
              <table>
                <caption>DM check list result</caption>
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
          <Col lg={12} md={12} sm={24} xs={24}>
            <div style={{
              justifyContent: "start", display: "flex",
              overflowY: "scroll", height: "77vh"
            }}>
              <table>
                <caption>valuation</caption>
                <tbody>
                  {/* <tr>
                  <td></td>
                
                </tr> */}
                  <tr>
                    <td></td>
                    <th className="head">OK</th>
                    <th className="head">NOT OK</th>
                    <th className="head">NOT APPLICABLE</th>
                  </tr>
                  {table2.map((q, i) => {
                    return (
                      <tr key={i}>
                        <th>
                          <span className="tableheader" style={{ paddingLeft: "7px", display: "flex" }}>{q.auditTypeName}</span>
                        </th>
                        <td>{q.A_count}</td>
                        <td>{q.B_count}</td>
                        <td>{q.C_count}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
              marginTop: "10px"
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

export default DmCheckListEntity;
