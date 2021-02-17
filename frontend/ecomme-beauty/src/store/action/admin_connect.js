export const loginAdmin = (admin) => ({
    type: "SIGNIN_ADMIN",
    token: admin.token,
    id: admin.id,
    email: admin.email,
   
})