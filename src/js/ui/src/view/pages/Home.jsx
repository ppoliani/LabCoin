import React, { Component } from 'react'
import HomeConnection from '../../bridge/HomeConnection'
import PurchaseStepper from '../token/PurchaseStepper'
import Countdown from '../common/Countdown'

class Home extends Component {
  render() {
    const {purchaseTokens, token} = this.props;

    return (
      <div className='page'>
        <h1>Purchase Tokens</h1>
        <Countdown endtime={new Date('11/30/2017')}/>
        <PurchaseStepper 
          onPurchase={purchaseTokens}
          purchaseResult={token.get('purchaseResult')} />
      </div>
    );
  }
}


export default HomeConnection(Home);
