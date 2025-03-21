export const PATH = {
    USER: {
        PROFILE: '/users',
        GET_PROFILE: (userId) => `/users/${userId}`,
        UPDATE_PROFILE: (userId) => `/users/${userId}`,
        CHANGE_PASSWORD: '/users/change-password',
    },
    AUTH: {
        LOGIN: '/auth/signin',
        REGISTER: '/auth/signup',
        LOGOUT: '/auth/logout',
    },
    JOB: {
        GET_JOB_TYPES: '/loai-cong-viec',
        GET_JOBS_BY_NAME: (name) => `/cong-viec/lay-danh-sach-cong-viec-theo-ten/${name}`,
        GET_JOB_TYPE_BY_ID: (id) => `/loai-cong-viec/${id}`, 
    },
};