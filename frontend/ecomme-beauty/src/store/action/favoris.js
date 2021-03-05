export const listFavoris = (favorisproducts) => ({
    type: "GET_FAVORIS",
    favorisproducts: favorisproducts
});
export const newFavorisProduct = (favorisproducts) => ({
    type: "ADD_FAVORIS",
    payload: favorisproducts
})
