export const listCartProducts = (cartproducts) => ({
    type: "GET_CARTPRODUCTS",
    cartproducts: cartproducts
});

export const oneCartProducts = (onecartprod) => ({
    type: "GET_ONEPRODUCT",
    onecartprod: onecartprod
});

export const newCartProduct = (cartproduct) => ({
    type: "ADD_CARTPRODUCTS",
    payload: cartproduct
})
