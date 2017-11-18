import React, {Component} from 'react';
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class PurchaseStepper extends Component {
  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select the amount of ETH you would like to exchange for LabCoin';
      case 1:
        return 'You will get 1000 LABCoin tokens';
      case 2: 
        return 'Are you ready ro sumbit the transaction';
    }
  }

  renderResetBox() {
    return (
      <p>
        Check your 
        <a href="#"
          onClick={(event) => {
            event.preventDefault();
            window.location.href = '/balance';
          }}
        > Balance
        </a>
      </p>
    )
  }

  renderContentBox() {
    const {finished, stepIndex} = this.state;

    return finished
      ? this.renderResetBox()
      : (
        <div>
          <p>{this.getStepContent(stepIndex)}</p>
          <div style={{marginTop: 12}}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label={stepIndex === 2 ? 'Confirm' : 'Next'}
              primary={true}
              onClick={this.handleNext}
            />
          </div>
        </div>
      )
  }

  render() {
    const {stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>
          <Step>
            <StepLabel>Select The amount of ETH</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify Transaction</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirmation</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>{this.renderContentBox()}</div>
      </div>
    )
  }
}

export default PurchaseStepper
