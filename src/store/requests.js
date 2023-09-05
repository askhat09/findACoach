export default {
	namespaced: true,
	state () {
		return {
			requests: []
		}
	},
	mutations: {
		addRequest(state, payload) {
			state.requests.push(payload);
		}
	},
	actions: {
		contactCoach(context, payload) {
			const newContact = {
				id: new Date().toISOString(),
				coachId: payload.coachId,
				userEmail: payload.email,
				message: payload.message,
			}

			context.commit('addRequest', newContact)
		}
	},
	getters: {
		requests(state, _, _2, rootGetters) {
			const coachId = rootGetters.userId
			return state.requests.filter(req => req.coachId === coachId)
		},
		hasRequests(_, getters) {
			return getters.requests && getters.requests.length > 0
		}
	}
}