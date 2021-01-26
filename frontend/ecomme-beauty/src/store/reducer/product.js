const initialStates = {
    products: []
    
 };

 const productsReducer = (state = initialStates, action) => {
    return {
        ...state,
        products: action.products
      };
 }

 export default productsReducer;