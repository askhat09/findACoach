import { createStore } from "vuex";

import coacheModule from "./coaches.js";
import requestModule from "./requests.js";
import authModule from "./auth.js";

const store = createStore({
	modules: {
		coaches: coacheModule,
		requests: requestModule,
		auth: authModule,
	},
});

export default store