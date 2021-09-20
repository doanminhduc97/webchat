import { createStore } from 'vuex'

import homeMessage from './modules/homeMessage'
import auth from './modules/auth'

export default createStore({
    modules: {
        homeMessage,
        auth
    }
})