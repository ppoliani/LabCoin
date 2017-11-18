import {Map} from 'immutable'
import {handleActions} from 'redux-actions'
import {GET_TOKEN_BALANCE, PURCHASE_TOKENS} from './tokenActions'
import AsyncData from '../core/AsyncData'

const handlePurchaseTokens = (state, action) => state.set('purchaseResult', action.payload);
const handleUpdateBalances = (state, {payload: balance}) => state.setIn(['balances', balance.pubKey], balance.value)

const TokenModel = Map({
  purchaseResult: AsyncData.Empty(),
  balances: Map({})
});

export default handleActions({
  [PURCHASE_TOKENS]: handlePurchaseTokens,
  [GET_TOKEN_BALANCE]: handleUpdateBalances
}, TokenModel)
