const state = () => {
    return {
        userImg: null
    }
}
const getters = {
    userImg(state) {
        return state.userImg
    }
}
const actions = {
    async login(context, payload){
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQFehzdEuRumzKzzzrtM7cFDqrBzEI1Pg`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const responseData = await response.json()
        if(!response.ok) {
            //error...
            const error = new Error(responseData.message || 'Failed to authenticate.')
            throw error
        }
        return responseData
    },
    async signUp(context, payload) {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQFehzdEuRumzKzzzrtM7cFDqrBzEI1Pg`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const responseData = await response.json()
        if(!response.ok) {
            //error...
            const error = new Error(responseData.message || 'Failed to authenticate.')
            throw error
        }
        return responseData
    },
    async setImage(context, payload) {
        const response = await fetch(`https://doanminhduc97-2c799-default-rtdb.firebaseio.com/avatar.json?auth=${payload.token}`, {
            method: 'POST',
            body: JSON.stringify(payload.bodyRequest)
        });
        if(!response.ok) {
            //error....
            console.log('falseeee')
        }
    },
    async getImage(context, payload) {
        const response = await fetch(`https://doanminhduc97-2c799-default-rtdb.firebaseio.com/avatar.json?auth=${payload.token}`)
        const resData = await response.json();
        if (!response.ok) {
            //error....
        }
        let avatarUsers = {}
        for (const key in resData) {
            if (resData[key].userId === payload.userId) {
                avatarUsers = resData[key]
                return avatarUsers
            }
        }
    }
}
export default {
    namespaced: true,
    state,
    actions,
    getters
}