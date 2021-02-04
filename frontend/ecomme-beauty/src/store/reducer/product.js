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

     case "DELETE_PRODUCTS":
      let indexOfElemToDelete  = state.products.map(e => e.id_product).indexOf(action.payload);
      return {
        ...state,
              products: [
                ...state.products.slice(0, indexOfElemToDelete),
                ...state.products.slice(
                  indexOfElemToDelete + 1,
                  state.products.length
                ),
              ],
      };

   default:
     return {
       ...state,
     };
 }
};

export default productsReducer;