import React, { useState, useRef, useEffect } from "react";
import { useCallback } from "react";
import { apiPost } from "../../../api/apiCommon";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import baseURL from "../../../base";
import config from "../../../config";
import useInfinityScroll from "./infinityScrollerhook";

const OnBoarding = () => {
  // infinty scroller
  const scroller = useRef(null);
  const [pageSize, setPageSize] = useState(10);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
  /**
   * Observer instance
   */
  // const observe = useCallback(() => {
  //   const observer = new IntersectionObserver((items) => {
  //     items.forEach((item) => {
  //       if (item.isIntersecting) {
  //         console.log(pageSize);
  //         // calls a function called load more
  //         updatePageSize();
  //       }
  //     });
  //   });
  //   observer.observe(scroller.current);
  // }, [scroller]);

  // // update the page size
  // const updatePageSize = () => {
  //   setPageSize((pageSize) => pageSize + 10);
  //   return true;
  // };

  const observe = useCallback(() => {
    const observer = new IntersectionObserver((items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          // console.log(pageSize);
          updatePageSize();
        }
      });
    });
    if (scroller.current) {
      observer.observe(scroller.current);
    }
  }, [scroller, pageSize]);

  const updatePageSize = useCallback(() => {
    setPageSize((pageSize) => pageSize + 10);
  }, []);

  const [table2, setTable2] = useState([]);

  const [checkedRows, setSelectedRowIds] = useState(false);

  const { Provider } = useInfinityScroll();

  useEffect(() => {
    (async () => {
      let data = {
        entityUID: "1",
        auditUID: "49",
      };
      const response = await apiPost(baseURL + config.ViewAuditDetails, data);
      // console.log(response.data);
      setTable2(response.data.data.scoreDetails);
      // console.log(auditResult)
    })();
  }, []);
  return (
    <>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: "47%",
          top: "45%",
          zIndex: "999999",
        }}
      >
        {rowData ? (
          <ColorRing
            visible={isVisible}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#283179", "#283179", "#283179", "#283179", "#283179"]}
            style={{ left: "50%", height: "47vh" }}
          />
        ) : (
          <ColorRing
            visible={pageSize > 10}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#283179", "#283179", "#283179", "#283179", "#283179"]}
            style={{ left: "50%", height: "47vh" }}
          />
        )}
      </div> */}

      <Provider>
        {table2 ? (
          <table>
            <caption>valuation</caption>
            <div id="scrollbar" style={{ overflowY: "scroll", height: "55vh" }}>
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
                </tr>
                {table2.map((q, i) => {
                  return (
                    <tr key={i}>
                      {/* <th>{q.auditTypeName}</th> */}
                      <th>
                        <span className="tableheader">{q.auditTypeName}</span>
                      </th>
                      <td>{q.A_count}</td>
                      <td>{q.B_count}</td>
                      <td>{q.C_count}</td>
                      <td>{q.D_count}</td>
                      <td>{q.scorePercentage}</td>
                    </tr>
                  );
                })}
              </tbody>
            </div>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </Provider>
      {/* {showLoadingSpinner && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-70%)",
            background: "rgba(38, 24, 87, 0.842)",
            borderRadius: "10px",
            color: "#fff",
            zIndex: "9999",
          }}
        >
          <div
            className={showLoadingSpinner ? "show-loading-spinner" : ""}
            style={{ fontSize: "1em", color: "#fff" }}
          >
            <div
              className="spinner-border spinner-border-sm"
              style={{ fontSize: "inherit" }}
              role="status"
            >
              <span className="visually-hidden"></span>
            </div>
            <span style={{ fontWeight: 600, color: "#fff" }}>Loading</span>
          </div>
        </div>
      )} */}
    </>
  );
};

export default OnBoarding;
// import React, { useState } from "react";
// import styled from "styled-components";
// import { useTable, useSortBy } from "react-table";
// import { apiPost } from "../../../api/apiCommon";
// import config from "../../../config";
// import { useEffect } from "react";
// import baseURL from "../../../base";

// import InfiniteScroll from "react-infinite-scroll-component";

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }
//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `;

// function Table({ columns, data, update }) {
//   // Use the state and functions returned from useTable to build your UI

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     state: { sortBy },
//   } = useTable(
//     {
//       columns,
//       data,
//     },
//     useSortBy
//   );

//   React.useEffect(() => {
//     console.log("sort");
//   }, [sortBy]);

//   // Render the UI for your table
//   return (
//     <InfiniteScroll
//       dataLength={rows.length}
//       next={update}
//       hasMore={true}
//       loader={<h4>Loading more 2 itens...</h4>}
//     >
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                   {column.render("Header")}
//                   <span>
//                     {column.isSorted
//                       ? column.isSortedDesc
//                         ? " 🔽"
//                         : " 🔼"
//                       : ""}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         <tbody {...getTableBodyProps()}>
//           {rows.map((row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </InfiniteScroll>
//   );
// }

// function Reacttable() {
//   const [items, setItems] = useState(40);
//   const [tabledata, setTableData] = useState();

//   useEffect(() => {
//     (async () => {
//       let data = {
//         userUID: "22",
//       };
//       const response = await apiPost(baseURL + config.GetFoodAudit, data);
//       setTableData(response.data.data);
//       // console.log(auditResult)
//     })();
//   }, []);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Name",
//         columns: [
//           {
//             Header: "First Name",
//             accessor: "firstName",
//           },
//           {
//             Header: "Last Name",
//             accessor: "lastName",
//           },
//         ],
//       },
//       {
//         Header: "Info",
//         columns: [
//           {
//             Header: "Age",
//             accessor: "age",
//           },
//           {
//             Header: "Visits",
//             accessor: "visits",
//           },
//           {
//             Header: "Status",
//             accessor: "status",
//           },
//           {
//             Header: "Profile Progress",
//             accessor: "progress",
//           },
//         ],
//       },
//     ],
//     []
//   );

//   const fetchMoreData = () => {
//     setTimeout(() => {
//       setItems(items.concat(2));
//     }, 1500);
//   };

//   const data = React.useMemo(() => items, [items]);

//   return (
//     <Styles>
//       <Table columns={columns} data={data} update={fetchMoreData} />
//     </Styles>
//   );
// }

// export default Reacttable;
