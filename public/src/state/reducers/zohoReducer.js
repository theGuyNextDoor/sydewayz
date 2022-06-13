const reducer = (state={authenticated: false}, action) => {
  switch(action.type) {
    case 'logout':
      return { authenticated: false };
    case 'grantToken':
    return { authenticated: true, token: action.payload.token, refreshToken: action.payload.refreshToken};
    default:
      return state;
  }
}

export default reducer;