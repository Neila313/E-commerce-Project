export const listCategory = (categories) => ({
    type: "GET_CATEGORY",
    categories: categories
});

export const newCategory = (categorie) => ({
    type: "ADD_CATEGORY",
    payload: categorie
})
export const deleteCategory = (id_category) => ({
    type: "DELETE_CATEGORY",
    payload: id_category
})
