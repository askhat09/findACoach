export default {
	state() {
		return {
			id: null,
			token: null,
			tokenExpiration: null,
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
			context.dispatch('auth', {
				...payload,
				mode: 'login'
			})
		},
		async signup(context, payload) {
			context.dispatch('auth', {
				...payload,
				mode: 'signup'
			})
		},
		async auth(context, payload) {
			const mode = payload.mode;
			let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7rPbwkGjdJxb8m79HNOUtBU2oLrEoE3Q';
			if (mode === 'signup') {
				url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7rPbwkGjdJxb8m79HNOUtBU2oLrEoE3Q'
			}
			const res = await fetch(url, {
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

			localStorage.setItem('token', resData.idToken);
			localStorage.setItem('userId', resData.localId);

			context.commit('setUser', {
				userId: resData.localId,
				token: resData.idToken,
				tokenExpiration: resData.expiresIn
			})
		},
		tryLogin(context) {
			const token = localStorage.getItem('token');
			const userId = localStorage.getItem('userId');

			if (token && userId) {
				context.commit('setUser', {
					token,
					userId,
					tokenExpiration: null,
				})
			}
		},
		logout(context) {
			context.commit('setUser', {
				localId: null,
				idToken: null,
				expiresIn: null,
			})
		}
	},
	getters: {
		userId(state) {
			return state.id
		},
		token(state) {
			return state.token
		},
		isAuth(state) {
			return !!state.token
		}
	}
}