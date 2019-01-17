const pciReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_PCI':
            return action.payload;
        default:
            return state;
    }
  };
  
  
  export default pciReducer;