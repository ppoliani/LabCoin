import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import BalanceConnection from '../../bridge/BalanceConnection'
import Countdown from '../common/Countdown'
import Spinner from '../common/Spinner'
import {noop} from '../../services/fn'

class Balance extends Component {
  state = {
    address: ''
  }

  renderCurrentHolding(holdings) {
    return (
      <div>Holdings: {holdings}</div>
    )
  }

  renderTxnText({args}) {
    return (
      <div>Bought {args.tokens} LABCoins for {args.buyPrices} ETH</div>
    )
  }

  rendeTxnDetails(txn) {
    return [
      <List key={0}>
        <ListItem key={0}>Transaction Hash: {txn.transactionHash}</ListItem>
        <ListItem key={1}>Block Hash: {txn.blockHash}</ListItem>
        <ListItem key={2}>Block Number: {txn.blockNumber}</ListItem>
      </List>
    ]
  }

  renderTxn = (txn, key) => {
    return (
      <ListItem 
        key={key} 
        primaryText={this.renderTxnText(txn)} 
        primaryTogglesNestedList={true}
        nestedItems={this.rendeTxnDetails(txn)}/>
    )
  }

  renderTxns(txns) {
    return (
      <List>{txns.map(this.renderTxn)}</List>
    )
  }

  handleSumbit = () => {
    this.props.getBalance(this.state.address);
  }

  handleAddressChange = (e, address) => {
    this.setState({address})
  }

  renderForm() {
    return (
      <div>
        <span>Select the amount of ETH you would like to exchange for LabCoin</span>
        <br/>
        <TextField 
          hintText='Enter your address'
          value={this.state.address} 
          onChange={this.handleAddressChange}/>
        <RaisedButton
          label='Find'
          primary={true}
          onClick={this.handleSumbit} />
      </div>
    )
  }

  render() {
    const {purchaseTokens, token} = this.props;

    return (
      <div className='page'>
        <h1>Purchase Tokens</h1>
        <Countdown endtime={new Date('11/30/2017')}/>
        {this.renderForm()}
        {
          token.get('info').matchWith({
            Empty: noop,
            Loading: () => <Spinner />,
            Success: ({data}) => (
              <div>
                {this.renderCurrentHolding(data.balance)}
                {this.renderTxns(data.logs)}
              </div>
            ),
            Failure: noop
          })
        }
      </div>
    );
  }
}


export default BalanceConnection(Balance);
