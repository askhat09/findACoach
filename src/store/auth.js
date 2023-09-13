export default {
	state() {
		return {
			id: 'c3'
		}
	},
	mutations: {
		setUser(state, payload) {
			state.id = payload.userId,
			state.token = payload.token,
			state.tokenExpiration = payload.tokenExpiration
		}
	},
	actions: {
		async login(context, payload) {
			const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7rPbwkGjdJxb8m79HNOUtBU2oLrEoE3Q', {
				method: 'POST',
				body: JSON.stringify({
					email: payload.email,
					password: payload.password,
					returnSecureToken: true,
				})
			});

			const resData = await res.json();

			if (!res.ok) {
				const error = new Error(res.message || 'Failed to fetch')
				throw error
			}

			console.log(resData);

			context.commit('setUser', {
				userId: resData.localId,
				token: res.idToken,
				tokenExpiration: res.expiresIn
			})
		},
		async signup(context, payload) {
			const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7rPbwkGjdJxb8m79HNOUtBU2oLrEoE3Q', {
				method: 'POST',
				body: JSON.stringify({
					email: payload.email,
					password: payload.password,
					returnSecureToken: true,
				})
			});

			const resData = await res.json();

			if (!res.ok) {
				const error = new Error(res.message || 'Failed to fetch')
				throw error
			}

			console.log(resData);

			context.commit('setUser', {
				userId: resData.localId,
				token: res.idToken,
				tokenExpiration: res.expiresIn
			})
		}
	},
	getters: {
		userId(state) {
			return state.id
		}
	}
}