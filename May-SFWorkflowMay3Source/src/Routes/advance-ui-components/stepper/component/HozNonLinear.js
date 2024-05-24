import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function getSteps() {
   return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
   switch (step) {
      case 0:
         return 'Step 1: Select campaign settings...';
      case 1:
         return 'Step 2: What is an ad group anyways?';
      case 2:
         return 'Step 3: This is the bit I really care about!';
      default:
         return 'Unknown step';
   }
}

export default function HorizontalNonLinearStepper() {
   const [activeStep, setActiveStep] = React.useState(0);
   const [completed, setCompleted] = React.useState({});
   const steps = getSteps();

   const totalSteps = () => {
      return steps.length;
   };

   const completedSteps = () => {
      return Object.keys(completed).length;
   };

   const isLastStep = () => {
      return activeStep === totalSteps() - 1;
   };

   const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
   };

   const handleNext = () => {
      const newActiveStep =
         isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
      setActiveStep(newActiveStep);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleStep = (step) => () => {
      setActiveStep(step);
   };

   const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
   };

   const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
   };

   return (
      <div className="hoz-linear-stepper">
         <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
               <Step key={label}>
                  <StepButton onClick={handleStep(index)} completed={completed[index]}>
                     {label}
                  </StepButton>
               </Step>
            ))}
         </Stepper>
         <div>
            {allStepsCompleted() ? (
               <div className="pl-40">
                  <p>All steps completed - you&quot;re finished</p>
                  <Button variant="contained" className="btn-success text-white" onClick={handleReset}>Reset</Button>
               </div>
            ) : (
                  <div className="pl-40">
                     <p>{getStepContent(activeStep)}</p>
                     <Button variant="contained" className="btn-danger text-white mr-10 mb-10" disabled={activeStep === 0} onClick={handleBack}>
                        Back
                     </Button>
                     <Button variant="contained" color="primary" className="text-white mr-10 mb-10" onClick={handleNext}>
                        Next
                     </Button>
                     {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                           <Typography variant="caption">
                              Step {activeStep + 1} already completed
                           </Typography>
                        ) : (
                        <Button variant="contained" color="primary" className="text-white mr-10 mb-10" onClick={handleComplete}>
                           {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                     ))}
                  </div>
               )}
         </div>
      </div>
   );
}
