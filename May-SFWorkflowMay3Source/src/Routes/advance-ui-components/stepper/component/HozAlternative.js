import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@material-ui/core';

function getSteps() {
   return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(stepIndex) {
   switch (stepIndex) {
      case 0:
         return 'Select campaign settings...';
      case 1:
         return 'What is an ad group anyways?';
      case 2:
         return 'This is the bit I really care about!';
      default:
         return 'Uknown stepIndex';
   }
}

function HorizontalLabelPositionBelowStepper() {
   const [activeStep, setActiveStep] = useState(0)
   
   const handleNext = () => {
      setActiveStep(activeStep + 1);
   };

   const handleBack = () => {
      setActiveStep(activeStep - 1);
   };

   const handleReset = () => {
      setActiveStep(0);
   };

   const steps = getSteps();

   return (
      <div>
         <Stepper activeStep={activeStep} alternativeLabel className="stepper-rtl">
            {steps.map(label => {
               return (
                  <Step key={label}>
                     <StepLabel>{label}</StepLabel>
                  </Step>
               );
            })}
         </Stepper>
         <div>
            {activeStep === steps.length ? (
               <div className="pl-40">
                  <p>All steps completed - you&quot;re finished</p>
                  <Button variant="contained" className="btn btn-success text-white" onClick={handleReset}>Reset</Button>
               </div>
            ) : (
                  <div className="pl-40">
                     <p>{getStepContent(activeStep)}</p>
                     <Button variant="contained" className="btn-danger text-white mr-10 mb-10" disabled={activeStep === 0} onClick={handleBack}>
                        Back
                     </Button>
                     <Button variant="contained" color="primary" className="text-white mr-10 mb-10" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                     </Button>
                  </div>
               )}
         </div>
      </div>
   );
}

export default HorizontalLabelPositionBelowStepper