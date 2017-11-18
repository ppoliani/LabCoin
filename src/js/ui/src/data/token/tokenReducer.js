import {Map, List} from 'immutable'
import {handleActions} from 'redux-actions'
import {GET_TOKEN_BALANCE, PURCHASE_TOKENS} from './tokenActions'
import AsyncData from '../core/AsyncData'

const handlePurchaseTokens = (state, action) => state.set('purchaseResult', action.payload);
const handleUpdateBalances = (state, {payload}) => state.set('info', payload)

const TokenModel = Map({
  purchaseResult: AsyncData.Empty(),
  info: AsyncData.Empty()
});

export default handleActions({
  [PURCHASE_TOKENS]: handlePurchaseTokens,
  [GET_TOKEN_BALANCE]: handleUpdateBalances
}, TokenModel)
