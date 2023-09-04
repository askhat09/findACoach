import { createStore } from "vuex";

import coacheModule from "./coaches.js";

const store = createStore({
	modules: {
		coaches: coacheModule
	},
	state() {
		return {
			id: 'c3'
		}
	},
	getters: {
		userId(state) {
			return state.id
		}
	}
});

export default store