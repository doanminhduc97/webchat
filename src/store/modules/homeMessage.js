import { SET_MESSAGE, GET_MESSAGE } from '../mutation-types'

const state = () => {
    return {
        messages: []
    }
}

const getters = {
    messages: state => {
        return state.messages
    }
}
const mutations = {
    [SET_MESSAGE] (state, message) {
        state.messages.unshift(message)
    },
    [GET_MESSAGE] (state, message) {
        state.messages = message
    }
}
const actions = {
    async setMessage(context, payload) {
        let messageData = {
            userName: payload.userName,
            userId: payload.userId,
            message: payload.message,
            // base64: payload.base64,
            time: payload.time
        }
        const response = await fetch(`https://doanminhduc97-2c799-default-rtdb.firebaseio.com/messages.json?auth=${payload.token}`, {
            method: 'POST',
            body: JSON.stringify(messageData)
        });
        if(!response.ok) {
            //error....
            console.log('falseeee')
        }
        context.commit(SET_MESSAGE, messageData)
    },
    async loadMessages(context, payload) {
        const res = await fetch(`https://doanminhduc97-2c799-default-rtdb.firebaseio.com/messages.json?auth=${payload.token}`)
        const resData = await res.json();
        if (!res.ok) {
            //error....
        }
        const messages = []
        for (const key in resData) {
            const message = {
                userName: resData[key].userName,
                userId: resData[key].userId,
                message: resData[key].message,
                time: resData[key].time
            }
            messages.unshift(message)
        }
        context.commit(GET_MESSAGE, messages)
        return messages
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}