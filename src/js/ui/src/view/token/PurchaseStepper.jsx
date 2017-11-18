import React, {Component} from 'react'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Spinner from '../common/Spinner'

const LAB_COINT_PRICE = 500;

class PurchaseStepper extends Component {
  state = {
    finished: false,
    stepIndex: 0,
    ethAmount: ''
  };
  
  handleAmountChange = (e, value) => {
    this.setState(Object.assign({}, this.state, {ethAmount: `${value}`}));
  }

  submitIfNeeded() {
    const {stepIndex, ethAmount} = this.state;

    if(stepIndex === 2) {
      this.props.onPurchase({ethAmount});
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    }, this.submitIfNeeded);
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderAmount() {
    return (
      <div>
        <span>Select the amount of ETH you would like to exchange for LabCoin</span>
        <TextField 
          hintText='ETH'
          value={this.state.ethAmount} 
          onChange={this.handleAmountChange}/>
      </div>
    )
  }

  renderSummary() {
    const {ethAmount} = this.state;

    return (
      <div>
        <span>You will receive {LAB_COINT_PRICE * Number(ethAmount)} LABCoins</span>
      </div>
    )
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.renderAmount();
      case 1:
        return this.renderSummary();
      case 2: 
        return 'Are you ready to sumbit the transaction';
    }
  }

  renderTxnResult({data}) {
    return (
      <div>
        <h3>Transaction successfully submitted</h3> 
        <ul>
          <li>Transaction Hash: {data.txnHash}</li>
          <li>Address: {data.address}</li>
        </ul>
        <br/>
        <span>Check your</span> 
        <a href="#"
          onClick={(event) => {
            event.preventDefault();
            window.location.href = '/balance';
          }}
        > Balance. 
        </a>
        Please copy the your public address.
      </div>
    )
  }

  renderTxnFailure() {
    return (
      <div>An unexpected error has occured. Please contant the support team.</div>
    )
  }

  renderLastStep() {
    return this.props.purchaseResult.matchWith({
      Empty: () => {},
      Loading: () => <Spinner />,
      Success: this.renderTxnResult,
      Failure: this.renderTxnFailure
    });

    return (
      <div>
        <div></div>
        <div>Transaction successfully submitted</div>
        Check your 
        <a href="#"
          onClick={(event) => {
            event.preventDefault();
            window.location.href = '/balance';
          }}
        > Balance
        </a>
      </div>
    )
  }

  renderContentBox() {
    const {finished, stepIndex} = this.state;

    return finished
      ? this.renderLastStep()
      : (
        <div>
          <div>{this.getStepContent(stepIndex)}</div>
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
            <StepLabel>Summary</StepLabel>
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
