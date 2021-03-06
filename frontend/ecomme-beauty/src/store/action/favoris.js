export const listFavoris = (favorisproducts) => ({
    type: "GET_FAVORIS",
    favorisproducts: favorisproducts
});
export const newFavorisProduct = (favorisproducts) => ({
    type: "ADD_FAVORIS",
    payload: favorisproducts
})
export const deleteFavorisProduct = (id_product) => ({
    type: "DELETE_FAVORIS",
    payload: id_product
})
