import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || '',
    profile: null,
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.accessToken),
  },
  actions: {
    setToken(token) {
      this.accessToken = token || ''
      if (token) {
        localStorage.setItem('access_token', token)
      } else {
        localStorage.removeItem('access_token')
      }
    },
    setProfile(profile) {
      this.profile = profile || null
    },
    logout() {
      this.setToken('')
      this.setProfile(null)
    },
  },
})
