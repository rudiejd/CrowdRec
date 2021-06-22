const initialState = {vars: {}};


// reducer for updating the dynamic variables 
const reducer = (state = initialState, action) =>  {
  const newState = JSON.parse(JSON.stringify(state));
  if (action.type === 'CHANGE') {
    newState.vars[action.name.name] = action.name.value;
  }
  return newState;
}

export default reducer; 