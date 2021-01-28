const initialStates = {
    categories: []
    
  };
  
  const categoryReducer = (state = initialStates, action) => {
   switch (action.type) {
    case "GET_CATEGORY":
      return {
        ...state,
        categories: action.categories
      };
    //    case "ADD_PRODUCTS":
    //    return {
    //      ...state,
    //      products: [...state.products, action.payload]
    //    };
  
     default:
       return {
         ...state,
       };
   }
  };
  
  export default categoryReducer;