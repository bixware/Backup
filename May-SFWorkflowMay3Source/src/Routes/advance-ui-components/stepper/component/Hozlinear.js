import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

function getSteps() {
   return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
   switch (step) {
      case 0:
         return 'Select campaign settings...';
      case 1:
         return 'What is an ad group anyways?';
      case 2:
         return 'This is the bit I really care about!';
      default:
         return 'Unknown step';
   }
}

export default function HorizontalNonLinearStepperWithError() {

   const [activeStep, setActiveStep] = React.useState(0);
   const [skipped, setSkipped] = React.useState(new Set());
   const steps = getSteps();

   const isStepOptional = (step) => {
      return step === 1;
   };

   const isStepSkipped = (step) => {
      return skipped.has(step);
   };

   const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
         newSkipped = new Set(skipped.values());
         newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
         // You probably want to guard against something like this,
         // it should never occur unless someone's actively trying to break something.
         throw new Error("You can't skip a step that isn't optional.");
      }

      setSkipped((prevSkipped) => {
         const newSkipped = new Set(prevSkipped.values());
         newSkipped.add(activeStep);
         return newSkipped;
      });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleReset = () => {
      setActiveStep(0);
   };

   return (
      <div className="hoz-linear-stepper">
         <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
               const stepProps = {};
               const labelProps = {};
               if (isStepOptional(index)) {
                  labelProps.optional = (
                     <p type="caption">Optional</p>
                  );
               }
               if (isStepSkipped(index)) {
                  stepProps.completed = false;
               }
               return (
                  <Step key={label} {...stepProps}>
                     <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
               );
            })}
         </Stepper>
         <div>
            {activeStep === steps.length ? (
               <div>
                  <p className="">
                     All steps completed - you&quot;re finished
                     </p>
                  <Button variant="contained" onClick={handleReset} className="btn-success text-white">
                     Reset
                     </Button>
               </div>
            ) : (
                  <div className="pl-40">
                     <p>{getStepContent(activeStep)}</p>
                     <div>
                        <Button disabled={activeStep === 0} onClick={handleBack} className="btn-danger text-white mr-10 mb-10" >
                           Back
                  </Button>
                        {isStepOptional(activeStep) && (
                           <Button variant="contained" onClick={handleSkip} className="btn-info text-white mr-10 mb-10" >
                              Skip
                    </Button>
                        )}
                        <Button variant="contained" onClick={handleNext} color="primary" className="text-white mr-10 mb-10">
                           {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                     </div>
                  </div>
               )}
         </div>
      </div>
   );
}
