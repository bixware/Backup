/**
 * Selection Controls
 */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormGroup, FormControlLabel, FormControl, FormLabel, FormHelperText, Radio, RadioGroup, Checkbox, Switch } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const styles = {
	checked: {
		color: pink[500],
	},
	bgsuccess: {
		backgroundColor: '#25C975',
	},
	textsuccess: {
		color: '#25C975',
		'& + $bgsuccess': {
			backgroundColor: '#25C975',
		},
	},
	bgwarning: {
		backgroundColor: '#EEA222',
	},
	textwarning: {
		color: '#EEA222',
		'& + $bgwarning': {
			backgroundColor: '#EEA222',
		},
	},
	bgprimary: {
		backgroundColor: '#895DFF',
	},
	textprimary: {
		color: '#895DFF',
		'& + $bgprimary': {
			backgroundColor: '#895DFF',
		},
	},
	bgdanger: {
		backgroundColor: '#F04E6A',
	},
	textdanger: {
		color: '#F04E6A',
		'& + $bgdanger': {
			backgroundColor: '#F04E6A',
		},
	},
};

function SelectionControls(props) {
   const [checkedA, setCheckedA] = useState(true);
   const [checkedB, setCheckedB] = useState(false);
   const [checkedC, setCheckedC] = useState(true);
   const [checkedD, setCheckedD] = useState(true);
   const [checkedE, setCheckedE] = useState(true);
   const [checkedF, setCheckedF] = useState(false);
   const [checkedG, setCheckedG] = useState(true);
   const [checkedH, setCheckedH] = useState(true);
   const [checkedI, setCheckedI] = useState(false);
   const [checkedJ, setCheckedJ] = useState(true);
   const [checkedK, setCheckedK] = useState(false);
   const [checkedL, setCheckedL] = useState(false);
   const [checkedM, setCheckedM] = useState(true);
   const [checkedN, setCheckedN] = useState(false);
   const [checkedO, setCheckedO] = useState(false);
   const [checkedP, setCheckedP] = useState(false);
   const [checkedQ, setCheckedQ] = useState(false);
   const [checkedR, setCheckedR] = useState(false);

   const [genderRadio1, setGenderRadio1] = useState('male');
   const [genderRadio2, setGenderRadio2] = useState('male');
   const [genderRadio3, setGenderRadio3] = useState('male');

   const handleChange = (name, checked) => {
      console.log(name, checked)
      name(!checked);
	};

   const handleChangeRadio = (key,e) => {
      key(e.target.value);
	}

   const { classes } = props;
   return (
      <div className="selection-controls-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.selectionControls" />} match={props.match} />
         <div className="row">
            <RctCollapsibleCard
               colClasses="col-sm-6 col-md-6 col-xl-3"
               heading={<IntlMessages id="widgets.simpleCheckbox" />}
            >
               <FormGroup>
                  <FormControlLabel control={
                     <Checkbox color="primary" checked={checkedA} onChange={() => handleChange(setCheckedA,checkedA)} value="checkedA" />
                  } label="Option A"
                  />
                  <FormControlLabel control={
                     <Checkbox color="primary" checked={checkedB} onChange={() => handleChange(setCheckedB,checkedB)} value="checkedB" />
                  } label="Option B"
                  />
                  <FormControlLabel control={
                     <Checkbox color="primary" checked={checkedC} onChange={() => handleChange(setCheckedC,checkedC)} value="checkedC" />
                  } label="Option C"
                  />
               </FormGroup>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               colClasses="col-sm-6 col-md-6 col-xl-3"
               heading={<IntlMessages id="widgets.interminateSelection" />}
            >
               <FormGroup>
                  <FormControlLabel
                     control={
                        <Checkbox color="primary" checked={checkedD} onChange={() => handleChange(setCheckedD,checkedD)} value="checkedD" indeterminate />
                     } label="Indeterminate 1"
                  />
                  <FormControlLabel
                     control={
                        <Checkbox color="primary" checked={checkedE} onChange={() => handleChange(setCheckedE,checkedE)} value="checkedE" indeterminate />
                     } label="Indeterminate 2"
                  />
                  <FormControlLabel
                     control={
                        <Checkbox color="primary" checked={checkedF} onChange={() => handleChange(setCheckedF,checkedF)} value="checkedF" indeterminate />
                     } label="Indeterminate 3"
                  />
               </FormGroup>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               colClasses="col-sm-6 col-md-6 col-xl-3"
               heading={<IntlMessages id="widgets.disabledCheckbox" />}
            >
               <FormGroup>
                  <FormControlLabel disabled onChange={() => handleChange(setCheckedG, checkedG)} control={<Checkbox value={checkedG} />} label="UnSelected" />
                  <FormControlLabel disabled onChange={() => handleChange(setCheckedH, checkedH)} control={<Checkbox checked value={checkedH} />} label="Selected" />
                  <FormControlLabel disabled onChange={() => handleChange(setCheckedI, checkedI)} control={<Checkbox value={checkedI} />} label="Disabled" />
               </FormGroup>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               colClasses="col-sm-6 col-md-6 col-xl-3"
               heading={<IntlMessages id="widgets.customColorCheckbox" />}
            >
               <FormGroup>
                  <FormControlLabel
                     control={
                        <Checkbox color="primary" checked={checkedJ} onChange={() => handleChange(setCheckedJ,checkedJ)}
                           classes={{ checked: classes.checked, }} value="checkedJ" />
                     } label="custom color 1"
                  />
                  <FormControlLabel
                     control={
                        <Checkbox color="primary" checked={checkedK} onChange={() => handleChange(setCheckedK,checkedK)}
                           classes={{ checked: classes.checked, }} value="checkedK" />
                     } label="custom color 2"
                  />
                  <FormControlLabel
                     control={
                        <Checkbox color="primary" checked={checkedL} onChange={() => handleChange(setCheckedL,checkedL)}
                           classes={{ checked: classes.checked, }} value="checkedL" />
                     } label="custom color 3"
                  />
               </FormGroup>
            </RctCollapsibleCard>
         </div>
         <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
               <RctCollapsibleCard
                  heading={<IntlMessages id="widgets.VerticalStyleCheckbox" />}
               >
                  <FormGroup>
                     <FormControlLabel control={
                        <Checkbox color="primary" checked={checkedM} onChange={() => handleChange(setCheckedM,checkedM)} value="checkedM" />
                     } label="Option M"
                     />
                     <FormControlLabel control={
                        <Checkbox color="primary" checked={checkedN} onChange={() => handleChange(setCheckedN,checkedN)} value="checkedN" />
                     } label="Option N"
                     />
                     <FormControlLabel control={
                        <Checkbox color="primary" checked={checkedO} onChange={() => handleChange(setCheckedO,checkedO)} value="checkedO" />
                     } label="Option O"
                     />
                  </FormGroup>
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  heading={<IntlMessages id="widgets.radioButtons" />}
               >
                  <div className="rct-block-title">
                     <div className="row">
                        <div className="col-sm-12 col-md-5">
                           <FormControl component="fieldset" required className={classes.formControl}>
                              <FormLabel component="legend">Gender</FormLabel>
                              <RadioGroup aria-label="gender" name="gender1" className={classes.group} value={genderRadio1}
                                 onChange={(e) => handleChangeRadio(setGenderRadio1,e)} >
                                 <FormControlLabel value="female" control={<Radio />} label="Female" />
                                 <FormControlLabel value="male" control={<Radio />} label="Male" />
                                 <FormControlLabel value="other" control={<Radio />} label="Other" />
                                 <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                              </RadioGroup>
                           </FormControl>
                        </div>
                        <div className="col-sm-12 col-md-7">
                           <FormControl component="fieldset" required>
                              <FormLabel component="legend">Gender</FormLabel>
                              <RadioGroup row aria-label="gender" name="gender2" value={genderRadio2} onChange={(e) => handleChangeRadio(setGenderRadio2, e)} >
                                 <FormControlLabel value="male" control={<Radio />} label="Male" />
                                 <FormControlLabel value="female" control={<Radio />} label="Female" />
                                 <FormControlLabel value="other" control={<Radio />} label="Other" />
                                 <FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />
                              </RadioGroup>
                           </FormControl>
                        </div>
                     </div>
                  </div>
               </RctCollapsibleCard>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
               <RctCollapsibleCard
                  heading={<IntlMessages id="widgets.horizontalStyleCheckbox" />}
               >
                  <FormGroup row>
                     <FormControlLabel control={
                        <Checkbox color="primary" checked={checkedP} onChange={() => handleChange(setCheckedP,checkedP)} value="checkedP" />
                     } label="Option M"
                     />
                     <FormControlLabel control={
                        <Checkbox color="primary" checked={checkedQ} onChange={() => handleChange(setCheckedQ,checkedQ)} value="checkedQ" />
                     } label="Option N"
                     />
                     <FormControlLabel control={
                        <Checkbox color="primary" checked={checkedR} onChange={() => handleChange(setCheckedR,checkedR)} value="checkedR" />
                     } label="Option O"
                     />
                  </FormGroup>
               </RctCollapsibleCard>
               <div className="row">
                  <RctCollapsibleCard
                     colClasses="col-sm-12 col-md-6"
                     heading={<IntlMessages id="widgets.disabledRadio" />}
                  >
                     <FormControl component="fieldset" required>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender3" value={genderRadio2} onChange={() => handleChange()} >
                           <FormControlLabel value="male2" disabled control={<Radio />} label="Male" />
                           <FormControlLabel value="female2" disabled control={<Radio />} label="Female" />
                           <FormControlLabel value="other2" disabled control={<Radio />} label="Other" />
                           <FormControlLabel value="disabled2" disabled control={<Radio />} label="Disabled" />
                        </RadioGroup>
                     </FormControl>
                  </RctCollapsibleCard>
                  <RctCollapsibleCard
                     colClasses="col-sm-12 col-md-6"
                     heading={<IntlMessages id="widgets.withError" />}
                  >
                     <FormControl component="fieldset" required error>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender4" value={genderRadio3} onChange={(e) => handleChangeRadio(setGenderRadio3, e)}>
                           <FormControlLabel value="male" control={<Radio />} label="Male" />
                           <FormControlLabel value="female" control={<Radio />} label="Female" />
                           <FormControlLabel value="other" control={<Radio />} label="Other" />
                           <FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />
                        </RadioGroup>
                        <FormHelperText>You can display an error</FormHelperText>
                     </FormControl>
                  </RctCollapsibleCard>
               </div>
            </div>
         </div>
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.switches" />}
            contentCustomClasses="d-flex justify-content-between align-center"
         >
            <Switch checked={checkedA} onChange={() => handleChange(setCheckedA,checkedA)} aria-label="checkedA" />
            <Switch checked={checkedB} onChange={() => handleChange(setCheckedB,checkedB)} aria-label="checkedB"
               classes={{ checked: classes.textsuccess }} />
            <Switch checked={checkedC} onChange={() => handleChange(setCheckedC,checkedC)} aria-label="checkedC"
               classes={{ checked: classes.textwarning }} />
            <Switch checked={checkedD} onChange={() => handleChange(setCheckedD,checkedD)} aria-label="checkedD"
               classes={{ checked: classes.textprimary }} />
            <Switch checked={checkedE} onChange={() => handleChange(setCheckedE,checkedE)} aria-label="checkedE"
               classes={{ checked: classes.textdanger }} />
            <Switch checked={false} aria-label="checkedF" disabled />
            <Switch checked aria-label="checkedG" disabled />
         </RctCollapsibleCard>
      </div>
   );
}

export default withStyles(styles)(SelectionControls);
