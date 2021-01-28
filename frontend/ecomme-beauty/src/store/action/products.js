export const listProducts = (products) => ({
    type: "GET_PRODUCTS",
    products: products
});

export const newProduct = (product) => ({
    type: "ADD_PRODUCTS",
    payload: product
})