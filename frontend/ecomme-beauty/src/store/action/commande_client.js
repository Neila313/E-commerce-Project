export const listCommande = (recapCommande) => ({
    type: "GET_COMMANDE",
    recapCommande: recapCommande
});
export const detailListCommande = (detailCommande) => ({
    type: "GET_DETAILCOMMANDE",
    detailCommande: detailCommande
});
