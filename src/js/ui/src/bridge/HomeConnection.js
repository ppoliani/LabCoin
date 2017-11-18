import {connect} from 'react-redux'
import {purchaseTokens} from '../data/token/tokenActions'

export default Home => {
  const mapStateToProps = state => ({
    token: state.token
  });

  const mapDispatchToProps = dispatch => ({
    purchaseTokens: (dispatch) ['∘'] (purchaseTokens)
  });

  return connect(mapStateToProps, mapDispatchToProps)(Home);
}
