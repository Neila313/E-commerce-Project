export const listProducts = (products) => ({
    type: "GET_PRODUCTS",
    products: products
});
export const oneProducts = (productdetails) => ({
    type: "GET_ONEPRODUCT",
    productdetails: productdetails
});

export const newProduct = (product) => ({
    type: "ADD_PRODUCTS",
    payload: product
})
export const changeProduct = (product) => ({
    type: "PUT_PRODUCTS",
    payload: product
})


export const deleteProduct = (id_product) => ({
    type: "DELETE_PRODUCTS",
    payload: id_product
})
