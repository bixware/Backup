import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";

const UnauthorizedPage = () => {
  // const reduxState = useSelector(state => state);
  const [redirectCount, setRedirectCount] = useState(5);
  /* const [intervalId,seIntervalId]=useState(null); */
  const history = useHistory();
  // useEffect(() => {

  //   const interval = setInterval(() => {
  //       // reduceCount();
  //     }, 1000);

  //     return () => clearInterval(interval);
  // }, []);


  // const reduceCount=()=>
  // {

  //   if(redirectCount!=1)
  //   {
  //       setRedirectCount(redirectCount-1); 
  //   }
  //   else
  //   {
  //       redirectFun();
  //   }

  // }
  // const redirectFun=()=>
  // {
  //   if(reduxState.userReducer.isLoggedIn)
  //   {
  //       if(reduxState.userReducer.roleUID==1)
  //       {
  //           history.push("/corporate/admin/dashboard");
  //       }
  //       else
  //       {
  //           history.push("/");
  //       }

  //   }
  //   else{
  //       history.push("/");
  //   }

  //   /* history.push("/NewEmployment"); */
  // }
  return (
    <div id="app" style={{ backgroundColor: '#3852A4', minHeight: '100vh', position: 'fixed', overflowY: 'scroll', width: '100%', textAlign: 'center' }}>

      <div className="successcard" style={{ marginTop: '4%' }}>
        <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
          <i className="checkmark successi">✓</i>
        </div>
        <h1 className="pagenotfountH1">403</h1>
        {/* <p className="successp"><button onClick={redirectFun} style={{borderRadius: '32px'}} type="button" className="btn btn-success redirectPagenotfond">Redirect &nbsp;&nbsp;&nbsp; <b>{redirectCount}</b> </button>  </p> */}
      </div>

    </div>
  );
};

export default UnauthorizedPage;