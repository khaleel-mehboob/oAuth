const { FETCH_USER } = require('../actions/types');

const authReducer =  function(state = null, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}

export default authReducer;