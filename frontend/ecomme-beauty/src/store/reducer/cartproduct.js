const initialStates = {
    cartproducts: [],

  };
  
  const cartproductsReducer = (state = initialStates, action) => {
   switch (action.type) {

    case "GET_CARTPRODUCTS":
    return {
      ...state,
      cartproducts: action.cartproducts
    };

       case "ADD_CARTPRODUCTS":
       return {
         ...state,
         cartproducts: [...state.cartproducts, action.payload]
       };

       case "DELETE_CARTPRODUCTS":
        let indexOfElemToDelete  = state.cartproducts.map(e => e.id_product).indexOf(action.payload);
        return {
          ...state,
                cartproducts: [
                  ...state.cartproducts.slice(0, indexOfElemToDelete),
                  ...state.cartproducts.slice(
                    indexOfElemToDelete + 1,
                    state.cartproducts.length
                  ),
                ],
        };
      
     default:
       return {
         ...state,
       };
   }
  };
  
  export default cartproductsReducer;