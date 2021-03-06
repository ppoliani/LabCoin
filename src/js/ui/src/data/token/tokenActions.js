import {createAction} from 'redux-actions'
import {Map} from 'immutable'
import fetch, {constructUrl} from '../../services/api'
import {partial} from '../../services/fn'

export const PURCHASE_TOKENS = 'TOKEN::PURCHASE_TOKENS';
export const GET_TOKEN_BALANCE = 'TOKEN::GET_TOKEN_BALANCE';

const TOKEN_URL = 'http://localhost:5000/tokens';

export const purchaseTokensRoot = fetch => {
  return createAction(
    PURCHASE_TOKENS,
    partial(fetch, `${TOKEN_URL}/purchase`, 'POST')
  );
}

export const getBalanceRoot = fetch => {
  const getUrl = address => constructUrl(`${TOKEN_URL}/balance`, Map({address}));
  const fetchData = (fetch) ['∘'] (getUrl);

  return createAction(
    GET_TOKEN_BALANCE,
    fetchData
  );
}


export const purchaseTokens = purchaseTokensRoot(fetch)
export const getBalance = getBalanceRoot(fetch)
