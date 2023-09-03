import { createStore } from "vuex";

import coacheModule from "./coaches.js";

const store = createStore({
	modules: {
		coaches: coacheModule
	}
});

export default store