let timer;

export default {
	state() {
		return {
			id: null,
			token: null,
			didLogout: false,
		}
	},
	mutations: {
		setUser(state, payload) {
			state.id = payload.userId,
			state.token = payload.token
		},
		setDidLogout(state) {
			state.didLogout = true
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

			const expiresIn = +resData.expiresIn * 1000;
			const expirationDate = new Date().getTime() + expiresIn;

			localStorage.setItem('token', resData.idToken);
			localStorage.setItem('userId', resData.localId);
			localStorage.setItem('expirationDate', expirationDate)

			timer = setTimeout(() => {
				context.dispatch('autoLogout')
			}, expiresIn);

			context.commit('setUser', {
				userId: resData.localId,
				token: resData.idToken,
			})
		},
		tryLogin(context) {
			const expirationDate = localStorage.getItem('expirationDate');
			const expiresIn = +expirationDate - new Date().getTime();

			if (expiresIn < 0) {
				return
			}

			timer = setTimeout(() => {
				context.dispatch('autoLogout')
			}, expiresIn);

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
			localStorage.removeItem('token');
			localStorage.removeItem('userId');

			clearTimeout(timer)

			context.commit('setUser', {
				localId: null,
				idToken: null,
			})
		},
		autoLogout(context) {
			context.dispatch('logout');
			context.commit('setDidLogout');
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
		},
		didLogout(state) {
			return state.didLogout
		}
	}
}