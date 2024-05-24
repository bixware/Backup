/**
 * Data Table
 */
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { apiPost, apiFormDatePost, setLoggedInuser } from "../Api/apiCommon";
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// intl messages
import IntlMessages from "Util/IntlMessages";
import baseURL from "baseurl";

function NewlyOffered(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiPost("admin/getnewregisterlist", {});

        setData(response.data.empTypeList);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    "Employee ID",
    "Employee Name",
    "Store Code",
    "Store Name",
    "Gender",
    "Email",
    "Manager Name",
  ];

  const options = {
    filterType: "dropdown",
  };
  return (
    <div className="data-table-wrapper">
      <PageTitleBar
        title={<IntlMessages id="sidebar.dataTable" />}
        match={props.match}
      />
      <RctCollapsibleCard heading="Data Table" fullBlock>
        <MUIDataTable
          title={"Employee list"}
          data={data}
          columns={columns}
          options={options}
        />
      </RctCollapsibleCard>
    </div>
  );
}

export default NewlyOffered;
