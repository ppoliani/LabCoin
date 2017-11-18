import {connect} from 'react-redux'
import {getBalance} from '../data/token/tokenActions'

export default Balance => {
  const mapStateToProps = state => ({
    token: state.token
  });

  const mapDispatchToProps = dispatch => ({
    getBalance: (dispatch) ['∘'] (getBalance)
  });

  return connect(mapStateToProps, mapDispatchToProps)(Balance);
}
