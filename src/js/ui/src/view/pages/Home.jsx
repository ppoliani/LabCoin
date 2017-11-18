import React, { Component } from 'react'
import HomeConnection from '../../bridge/HomeConnection'
import PurchaseStepper from '../token/PurchaseStepper'

class Home extends Component {
  render() {
    return (
      <div className='page'>
        <h1>Purchase Tokens</h1>
        <PurchaseStepper />
      </div>
    );
  }
}


export default HomeConnection(Home);
