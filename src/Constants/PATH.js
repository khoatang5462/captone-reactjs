export const PATH = {
  USER: {
    PROFILE: '/api/users',
    GET_PROFILE: (userId) => `/api/users/${userId}`,
    UPDATE_PROFILE: (userId) => `/api/users/${userId}`,
    CHANGE_PASSWORD: '/api/users/change-password'
  },
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout'
  }
}
