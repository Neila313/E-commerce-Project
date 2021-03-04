const initialStates = {
    favorisproducts: [],

  };
  
  const favorisReducer = (state = initialStates, action) => {
   switch (action.type) {
    case "GET_FAVORIS":
        return {
          ...state,
          favorisproducts: action.favorisproducts
        };
       case "ADD_FAVORIS":
       return {
         ...state,
         favorisproducts: [...state.favorisproducts, action.payload]
       };

      
     default:
       return {
         ...state,
       };
   }
  };
  
  export default favorisReducer;