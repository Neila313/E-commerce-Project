const initialStates = {
    cartproducts: [],
    onecartprod: []

  };
  
  const cartproductsReducer = (state = initialStates, action) => {
   switch (action.type) {

    case "GET_CARTPRODUCTS":
    return {
      ...state,
      cartproducts: action.cartproducts
    };
    case "GET_ONECARTPRODUCT":
      return {
        ...state,
        onecartprod: action.onecartprod
      };
       case "ADD_CARTPRODUCTS":
       return {
         ...state,
         cartproducts: [...state.cartproducts, action.payload]
       };
      
     default:
       return {
         ...state,
       };
   }
  };
  
  export default cartproductsReducer;