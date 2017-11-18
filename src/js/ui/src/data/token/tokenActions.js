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
    partial(fetch, 'POST', PROOF_URL)
  );
}

export const getBalanceRoot = fetch => {
  const getUrl = pubKey => constructUrl(TOKEN_URL, Map({pubKey}));
  const fetchData = (fetch) ['∘'] (getUrl);

  return createAction(
    GET_TOKEN_BALANCE,
    fetchData
  );
}


export const purchaseTokens = partial(purchaseTokensRoot, fetch)
export const getBalance = partial(getBalanceRoot, fetch)
