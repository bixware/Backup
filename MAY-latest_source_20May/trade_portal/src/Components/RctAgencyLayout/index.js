/**
 * Rct Horizontal Menu Layout
 */
import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

// Components
import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";
//import ThemeOptions from "Components/ThemeOptions/ThemeOptions";
import AgencyMenu from "../AgencyMenu/AgencyMenu";
//import AgencyMenuManager from "Components/AgencyMenu/AgencyMenuManager";

function RctAgencyLayout(props) {
  const settings = useSelector((state) => state.settings);
  const { agencyLayoutBgColors, enableBgImage } = settings;
  const renderPage = () => {
    const { pathname } = props.location;
    const { children, match } = props;
    if (
      pathname === `${match.url}/chat` ||
      pathname.startsWith(`${match.url}/mail`) ||
      pathname === `${match.url}/admin/todo`
    ) {
      return (
        <div
          className="rct-page-content p-0"
          style={{ height: "calc(100vh - 15.5rem)" }}
        >
          {children}
        </div>
      );
    }
    return (
      <Scrollbars
        className="rct-scroll"
        autoHide
        autoHideDuration={100}
        style={{ height: "calc(100vh - 15.5rem)" }}
      >
        <div className="rct-page-content">{children}</div>
      </Scrollbars>
    );
  };
  const getActiveLayoutBg = () => {
    if (!enableBgImage) {
      for (const layoutBg of agencyLayoutBgColors) {
        if (layoutBg.active) {
          return layoutBg.class;
        }
      }
    } else {
      return "app-boxed-v2";
    }
  };

  // const userString = sessionStorage.getItem("bixware_user");
  // const user = JSON.parse(userString);
  // let roleUID = user.roleUID;
  return (
    <div
      className={`app-boxed`}
      style={{
        background:"linear-gradient(0deg, #EC2F4B 0%, #009FFF 100%)"
          // roleUID == 1
          //   ? "linear-gradient(0deg, #EC2F4B 0%, #009FFF 100%)"
          //   : // : "linear-gradient( #24243e 0%, #302b63 100%,#0f0c29)",
          //     "linear-gradient(0deg, #240B36 0%, #C31432 100%)",
      }}
    >
      <div className="app-container">
        <div className="rct-page-wrapper">
          <div className="rct-app-content">
            <div className="app-header">
              <Header agencyMenu />
            </div>
            <div className="rct-page">
            <AgencyMenu /> 
              {/* {roleUID == 1 ? <AgencyMenu /> : <AgencyMenuManager />} */}
              {renderPage()}
            </div>
            {/* <ThemeOptions /> */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RctAgencyLayout);
