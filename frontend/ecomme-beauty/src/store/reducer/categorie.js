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
       case "ADD_CATEGORY":
       return {
         ...state,
         categories: [...state.categories, action.payload]
         
        //  
       };
       case "DELETE_CATEGORY":
      let indexOfElemToDelete  = state.categories.map(e => e.id_category).indexOf(action.payload);
      return {
        ...state,
        categories: [
                ...state.categories.slice(0, indexOfElemToDelete),
                ...state.categories.slice(
                  indexOfElemToDelete + 1,
                  state.categories.length
                ),
              ],
      };


       

     default:
       return {
         
         ...state,
       };
   }
  };
  
  export default categoryReducer;