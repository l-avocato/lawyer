import * as React from "react";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import "./StepsCases.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const StepsCases = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
    "step4",
  ];

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
    <div style={{ display: "flex" }}>
      <div style={{width:"30%"}}>
        <NavbarDashboard />
      </div>

      <div style={{display:"flex", flexDirection:"column",alignItems:"center", gap:"6rem"}}>
        <Box
          sx={{
            width: "100%",
            position: "relative",
            top: "8rem",
          }}
        >
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  Step {activeStep + 1}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                 
                 
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: "inline-block" }}
                      >
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? "Finish"
                          : "Complete Step"}
                      </Button>
                    ))}
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
{activeStep ===0 &&<div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" , gap:"-2rem"}}>
          <div className="name-case">
            <p style={{backgroundColor:'blue'}}> Name Of Cases</p>
            <input
              className="inputCase"
              type="text"
              placeholder="Name of case"
            />
          </div>

          <div className="cases2"> 
           <input type="file" />
          </div>

          <div className="name-case">
            <p>Aim Of the Monitring plan </p>
            <input
              className="inputCase2"
              type="text"
              placeholder="Enter the monitoring plan"
            />
          </div>
        </div>
     
      </div>}


 {activeStep === 1 && 
    <div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" , gap:"-2rem"}}>
          <div className="name-case">
            <p style={{backgroundColor:'red'}}> Name Of Cases 1</p>
            <input
              className="inputCase"
              type="text"
              placeholder="Name of case"
            />
          </div>

          <div className="cases2"> 
           <input type="file" />
          </div>

          <div className="name-case">
            <p>Aim Of the Monitring plan </p>
            <input
              className="inputCase2"
              type="text"
              placeholder="Enter the monitoring plan"
            />
          </div>
        </div>
     
      </div>
 } 
  {activeStep === 2 && 
    <div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" , gap:"-2rem"}}>
          <div className="name-case">
            <p style={{backgroundColor:'yellow'}}> Name Of Cases 2</p>
            <input
              className="inputCase"
              type="text"
              placeholder="Name of case"
            />
          </div>

          <div className="cases2"> 
           <input type="file" />
          </div>

          <div className="name-case">
            <p>Aim Of the Monitring plan </p>
            <input
              className="inputCase2"
              type="text"
              placeholder="Enter the monitoring plan"
            />
          </div>
        </div>
     
      </div>
 } 
     {activeStep === 3 && 
    <div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" , gap:"-1rem"}}>
          <div className="name-case">
            <p style={{backgroundColor:'green'}}> Name Of Cases 3</p>
            <input
              className="inputCase"
              type="text"
              placeholder="Name of case"
            />
          </div>

          <div className="cases2"> 
           <input type="file" />
          </div>

          <div className="name-case">
            <p>Aim Of the Monitring plan </p>
            <input
              className="inputCase2"
              type="text"
              placeholder="Enter the monitoring plan"
            />
          </div>
        </div>
     
      </div>
 } 


 <div style={{display: 'flex',alignItems:'center', gap:'2rem' , marginLeft:'38rem'}}>
     
        <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
      </div>
     </div>
    </div>
  );
};

export default StepsCases;
