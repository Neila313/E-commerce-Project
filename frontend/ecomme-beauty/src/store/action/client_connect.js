export const loginClient = (client) => ({
    type: "SIGNIN_CLIENT",
    token: client.token,
    id: client.id,
    email: client.email,
})