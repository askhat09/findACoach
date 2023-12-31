export default {
	namespaced: true,
	state() {
		return {
			requests: []
		}
	},
	mutations: {
		addRequest(state, payload) {
			state.requests.push(payload);
		},
		setRequests(state, payload) {
			state.requests = payload
		}
	},
	actions: {
		async contactCoach(context, payload) {
			const newContact = {
				userEmail: payload.email,
				message: payload.message,
			}

			const res = await fetch(`https://find-coaches-8ac11-default-rtdb.firebaseio.com/request/${payload.coachId}.json`, {
				method: 'POST',
				body: JSON.stringify(newContact)
			});

			if (!res.ok) {
				const error = new Error(res.message || "Failed to send!")
				throw error
			}

			const responseData = await res.json();

			newContact.id = responseData.name;
			newContact.coachId = payload.coachId;

			context.commit('addRequest', newContact)
		},
		async fetchRequests(context) {
			const coachId = context.rootGetters.userId;
			const token = context.rootGetters.token
			const res = await fetch(`https://find-coaches-8ac11-default-rtdb.firebaseio.com/request/${coachId}.json?auth=${token}`);

			const resData = await res.json();

			if (!res.ok) {
				const error = new Error(resData.message)
				throw error
			}

			const requests = []

			for (let key in resData) {
				const request = {
					id: key,
					coachId,
					userEmail: resData[key].userEmail,
					message: resData[key].message,
				}
				requests.push(request)
			}

			context.commit('setRequests', requests)
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