import { createStore } from "vuex";

import coacheModule from "./coaches.js";
import requestModule from "./requests.js";

const store = createStore({
	modules: {
		coaches: coacheModule,
		requests: requestModule,
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