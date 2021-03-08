const initialStates = {
    recapCommande: [],
    detailCommande: []

  };
  
  const commandeReducer = (state = initialStates, action) => {
   switch (action.type) {
    case "GET_COMMANDE":
        return {
          ...state,
          recapCommande: action.recapCommande
        }; 
    case "GET_DETAILCOMMANDE":
        return {
          ...state,
          detailCommande: action.detailCommande
        }; 
     default:
       return {
         ...state,
       };
   }
  };
  
  export default commandeReducer;