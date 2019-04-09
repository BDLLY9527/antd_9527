const defaultState = {
    inputValue:'123',
    list:[{
        name:'asd'
    }]
};
export default (state = defaultState,action) => {
    if(action.type === 'change_input_value'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        // console.log(newState)
        return newState
    }
    return state;
}