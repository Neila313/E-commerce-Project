const initialStates = {
    token: null,
    id: null,
    email: null
    
 };
 
 const adminReducer = (state = initialStates, action) => {
   switch (action.type) {
     case "SIGNIN_ADMIN":
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
 
 export default adminReducer;