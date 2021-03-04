export const listCartProducts = (cartproducts) => ({
    type: "GET_CARTPRODUCTS",
    cartproducts: cartproducts
});

export const deleteCartProduct = (id_product) => ({
    type: "DELETE_CARTPRODUCTS",
    payload: id_product
})


export const newCartProduct = (cartproduct) => ({
    type: "ADD_CARTPRODUCTS",
    payload: cartproduct
})
