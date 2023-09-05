export default {
	namespaced: true,
	state() {
		return {
			coaches: [
				{
					id: 'c1',
					firstName: 'Maximilian',
					lastName: 'Schwarzmüller',
					areas: ['frontend', 'backend', 'career'],
					description:
						"I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
					hourlyRate: 30
				},
				{
					id: 'c2',
					firstName: 'Julie',
					lastName: 'Jones',
					areas: ['frontend', 'career'],
					description:
						'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
					hourlyRate: 30
				}
			]
		}
	},
	mutations: {
		registerCoach(state, payload) {
			state.coaches.push(payload);
		}
	},
	actions: {
		registerCoach(context, data) {
			const formattedData = {
				id: 'c3',
				firstName: data.firstName,
				lastName: data.lastName,
				areas: data.areas,
				description: data.description,
				hourlyRate: data.rate,
			}
			context.commit('registerCoach', formattedData)
		}
	},
	getters: {
		coaches(state) {
			return state.coaches
		},
		hasCoaches(state) {
			return state.coaches && state.coaches.length > 0;
		},
		isCoach(state, getters, rootState, rootGetters) {
			const coaches = getters.coaches;
			const userId = rootGetters.userId;
			return coaches.some(coach => coach.id === userId);
		}
	},
}