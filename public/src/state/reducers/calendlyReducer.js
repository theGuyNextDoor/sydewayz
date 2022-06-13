const reducer = (state={ appointments: [], calls: [] }, action) => {
  switch(action.type) {
    case 'stageAppointments':
      return {...state, appointments: action.payload };
    case 'stageCalls':
      return {...state, calls: action.payload };
    case 'logout':
    return { appointments: [], calls: [] };
    default:
      return state;
  }
}

export default reducer;