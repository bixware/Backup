import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  Redirect,
} from "react-router-dom";
// import RctBoxedLayout from "Container/RctBoxedLayout";
/* import DataTable from "Routes/tables/data-table";
import OnboardindDataTable from "Routes/tables/onboarding-table"; */
import RctBoxedLayout from "Container/RctBoxedLayout";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import AgencyMenu from "../../Components/AgencyMenu/AgencyMenu";

const corporateComponent = () => {
  return (
    <>
      <>
        <RctBoxedLayout />
      </>
    </>
  );
};

export default corporateComponent;
