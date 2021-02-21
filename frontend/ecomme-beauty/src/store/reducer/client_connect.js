const initialStates = {
    token: null,
    id: null,
    email: null
    
 };
 
 const clientReducer = (state = initialStates, action) => {
   switch (action.type) {
     case "SIGNIN_CLIENT":
       return {
         ...state,
         token: action.token,
         id: action.id,
         email: action.email
         
       };
  
     default:
       return {
         ...state,
       };
   }
 };
 
 export default clientReducer;