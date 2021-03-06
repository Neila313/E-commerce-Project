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
         let cartProductIndex = state.cartproducts.findIndex(e => e.id_product === action.payload.id_product);
         if (cartProductIndex == -1){
          return {
            ...state,
            cartproducts: [...state.cartproducts, action.payload]
          };
         } 
         state.cartproducts[cartProductIndex].qty += action.payload.qty
         return {
          ...state,
          cartproducts: [...state.cartproducts]
        };
      
       case "DELETE_CARTPRODUCTS":
        return {
          ...state,
                cartproducts: state.cartproducts.filter(e => e.id_product !== action.payload)
        };
      
     default:
       return {
         ...state,
       };
   }
  };
  
  export default cartproductsReducer;