import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
   },
   button: {
      marginRight: theme.spacing(1),
   },
   backButton: {
      marginRight: theme.spacing(1),
   },
   completed: {
      display: 'inline-block',
   },
   instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
   },
}));

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

export default function HorizontalNonLinearAlternativeLabelStepper() {
   const classes = useStyles();
   const [activeStep, setActiveStep] = React.useState(0);
   const [completed, setCompleted] = React.useState(new Set());
   const [skipped, setSkipped] = React.useState(new Set());
   const steps = getSteps();

   const totalSteps = () => {
      return getSteps().length;
   };

   const isStepOptional = (step) => {
      return step === 1;
   };

   const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
         // You probably want to guard against something like this
         // it should never occur unless someone's actively trying to break something.
         throw new Error("You can't skip a step that isn't optional.");
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
         const newSkipped = new Set(prevSkipped.values());
         newSkipped.add(activeStep);
         return newSkipped;
      });
   };

   const skippedSteps = () => {
      return skipped.size;
   };

   const completedSteps = () => {
      return completed.size;
   };

   const allStepsCompleted = () => {
      return completedSteps() === totalSteps() - skippedSteps();
   };

   const isLastStep = () => {
      return activeStep === totalSteps() - 1;
   };

   const handleNext = () => {
      const newActiveStep =
         isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed
            // find the first step that has been completed
            steps.findIndex((step, i) => !completed.has(i))
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
      const newCompleted = new Set(completed);
      newCompleted.add(activeStep);
      setCompleted(newCompleted);

      /**
       * Sigh... it would be much nicer to replace the following if conditional with
       * `if (!this.allStepsComplete())` however state is not set when we do this,
       * thus we have to resort to not being very DRY.
       */
      if (completed.size !== totalSteps() - skippedSteps()) {
         handleNext();
      }
   };

   const handleReset = () => {
      setActiveStep(0);
      setCompleted(new Set());
      setSkipped(new Set());
   };

   const isStepSkipped = (step) => {
      return skipped.has(step);
   };

   function isStepComplete(step) {
      return completed.has(step);
   }

   return (
      <div className={classes.root}>
         <Stepper alternativeLabel nonLinear activeStep={activeStep}>
            {steps.map((label, index) => {
               const stepProps = {};
               const buttonProps = {};
               if (isStepOptional(index)) {
                  buttonProps.optional = <Typography variant="caption">Optional</Typography>;
               }
               if (isStepSkipped(index)) {
                  stepProps.completed = false;
               }
               return (
                  <Step key={label} {...stepProps}>
                     <StepButton
                        onClick={handleStep(index)}
                        completed={isStepComplete(index)}
                        {...buttonProps}
                     >
                        {label}
                     </StepButton>
                  </Step>
               );
            })}
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
                  <Button variant="contained" className="btn-danger text-white mr-10 mb-10" disabled={activeStep === 0} onClick={handleBack} >
                     Back
                  </Button>
                  <Button variant="contained" color="primary" className="text-white mr-10 mb-10" onClick={handleNext}>
                     Next
                  </Button>
                  {isStepOptional(activeStep) &&
                     !completed.has(activeStep) && (
                        <Button variant="contained" className="btn-info text-white mr-10 mb-10" onClick={handleSkip}>
                           Skip
                        </Button>
                     )}
                  {activeStep !== steps.length &&
                     (completed.has(activeStep) ? (
                        <Typography variant="caption" className={classes.completed}>
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
