 const initialStates = {
  products: []
  
};

const productsReducer = (state = initialStates, action) => {
 switch (action.type) {
  case "GET_PRODUCTS":
    return {
      ...state,
      products: action.products
    };
     case "ADD_PRODUCTS":
     return {
       ...state,
       products: [...state.products, action.payload]
     };

   default:
     return {
       ...state,
     };
 }
};

export default productsReducer;