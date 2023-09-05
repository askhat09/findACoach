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
	}
}