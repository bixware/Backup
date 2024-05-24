/**
 * Sweet Alert Advance Ui Components
 */
import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from '@material-ui/core/Button';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';

function SweetAlertComponent(props) {
   const [basic, setBasic] = useState(false);
   const [withDes, setWithDes] = useState(false);
   const [success, setSuccess] = useState(false);
   const [warning, setWarning] = useState(false);
   const [customIcon, setCustomIcon] = useState(false);
   const [withHtml, setWithHtml] = useState(false);
   const [prompt, setPrompt] = useState(false);
   const [passwordPrompt, setPasswordPrompt] = useState(false);
   const [customStyle, setCustomStyle] = useState(false);

	/**
	 * On Confirm dialog
	 * @param {string} key
	 */
	const onConfirm = (key) => {
      key(false);
	}

	/**
	 * Open Alert
	 * @param {key} key
	 */
	const openAlert = (key) => {
      key(true);
	}

	/**
	 * On Cancel dialog
	 * @param {string} key
	 */
	const onCancel = (key) => {
      key(false)
	}

   return (
      <div className="sweet-alert-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.sweetAlert" />} match={props.match} />
         <div className="row">
            <RctCollapsibleCard
               customClasses="p-20 text-center"
               colClasses="col-sm-6 col-lg-4 col-xl-3"
            >
               <h5 className="mb-20">Basic Alert</h5>
               <Button
                  variant="contained"
                  color="primary"
                  className="text-white"
                  onClick={() => openAlert(setBasic)}
               >
                  Basic
               </Button>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               customClasses="p-20 text-center"
               colClasses="col-sm-6 col-lg-4 col-xl-3"
            >
               <h5 className="mb-20">Description Alert</h5>
               <Button
                  variant="contained"
                  color="primary"
                  className="text-white"
                  onClick={() => openAlert(setWithDes)}
               >
                  With Description
               </Button>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               customClasses="p-20 text-center"
               colClasses="col-sm-6 col-lg-4 col-xl-3"
            >
               <h5 className="mb-20">Success Alert</h5>
               <Button
                  variant="contained"
                  color="primary"
                  className="text-white"
                  onClick={() => openAlert(setSuccess)}
               >
                  Success
               </Button>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               customClasses="p-20 text-center"
               colClasses="col-sm-6 col-lg-4 col-xl-3"
            >
               <h5 className="mb-20">Warning Alert</h5>
               <Button
                  variant="contained"
                  color="primary"
                  className="text-white"
                  onClick={() => openAlert(setWarning)}
               >
                  Warning
               </Button>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               customClasses="p-20 text-center"
               colClasses="col-sm-6 col-lg-4 col-xl-3"
            >
               <h5 className="mb-20">Custom Icon Alert</h5>
               <Button
                  variant="contained"
                  color="primary"
                  className="text-white"
                  onClick={() => openAlert(setCustomIcon)}
               >
                  Custom Icon
               </Button>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               customClasses="p-20 text-center"
               colClasses="col-sm-6 col-lg-4 col-xl-3"
            >
               <h5 className="mb-20">With Html Alert</h5>
               <Button
                  variant="contained"
                  color="primary"
                  className="text-white"
                  onClick={() => openAlert(setWithHtml)}
               >
                  With Html
               </Button>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               customClasses="p-20 text-center"
               colClasses="col-sm-6 col-lg-4 col-xl-3"
            >
               <h5 className="mb-20">Prompt Alert</h5>
               <Button
                  variant="contained"
                  color="primary"
                  className="text-white"
                  onClick={() => openAlert(setPrompt)}
               >
                  Prompt
               </Button>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               customClasses="p-20 text-center"
               colClasses="col-sm-6 col-lg-4 col-xl-3"
            >
               <h5 className="mb-20">Password Prompt Alert</h5>
               <Button
                  variant="contained"
                  color="primary"
                  className="text-white"
                  onClick={() => openAlert(setPasswordPrompt)}
               >
                  Password Prompt
               </Button>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               customClasses="p-20 text-center"
               colClasses="col-sm-6 col-lg-4 col-xl-3"
            >
               <h5 className="mb-20">Custom Style Alert</h5>
               <Button
                  variant="contained"
                  color="primary"
                  className="text-white"
                  onClick={() => openAlert(setCustomStyle)}
               >
                  Custom Style
               </Button>
            </RctCollapsibleCard>
         </div>
         <SweetAlert
            show={basic}
            title="Here's a message!"
            onConfirm={() => onConfirm(setBasic)}
            btnSize="sm"
         />
         <SweetAlert
            show={withDes}
            title="Here's a message!"
            btnSize="sm"
            onConfirm={() => onConfirm(setWithDes)}
         >
            It's pretty, isn't it?
         </SweetAlert>
         <SweetAlert
            success
            show={success}
            title="Good job!"
            btnSize="sm"
            onConfirm={() => onConfirm(setSuccess)}>
            You clicked the button!
         </SweetAlert>
         <SweetAlert
            warning
            btnSize="sm"
            show={warning}
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="success"
            title="Are you sure?"
            onConfirm={() => onConfirm(setWarning)}
            onCancel={() => onCancel(setWarning)}
         >
            You will not be able to recover this imaginary file!
         </SweetAlert>
         <SweetAlert
            custom
            btnSize="sm"
            show={customIcon}
            showCancel
            confirmBtnText="Yes"
            cancelBtnText="No"
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="warning"
            customIcon={`${ process.env.PUBLIC_URL }/assets/images/avatars/user-1.jpg`}
            title="Do you like thumbs?"
            onConfirm={() => onConfirm(setCustomIcon)}
            onCancel={() => onCancel(setCustomIcon)}
         >
            You will find they are up!
         </SweetAlert>
         <SweetAlert
            show={withHtml}
            btnSize="sm"
            title={<span>HTML <small>Title</small>!</span>}
            onConfirm={() => onConfirm(setWithHtml)}
         >
            <span>A custom <span style={{ color: '#642aff' }}>html</span> message.</span>
         </SweetAlert>
         <SweetAlert
            input
            btnSize="sm"
            show={prompt}
            showCancel
            cancelBtnBsStyle="danger"
            title="An input!"
            placeHolder="Write something"
            onConfirm={() => onConfirm(setPrompt)}
            onCancel={() => onCancel(setPrompt)}
         >
            Write something interesting:
         </SweetAlert>
         <SweetAlert
            input
            btnSize="sm"
            show={passwordPrompt}
            inputType="password"
            title="Enter Password"
            required
            validationMsg="You must enter your password!"
            onConfirm={() => onConfirm(setPasswordPrompt)}
         />
         <SweetAlert
            customClass="custom-alert"
            show={customStyle}
            btnSize="sm"
            style={{ backgroundColor: 'blueviolet', color: 'white !important' }}
            title="Yay!"
            onConfirm={() => onConfirm(setCustomStyle)}
            confirmBtnBsStyle="danger"
         >
            <div className="text-white">Its blueviolet!</div>
         </SweetAlert>
      </div>
   );
}

export default SweetAlertComponent;