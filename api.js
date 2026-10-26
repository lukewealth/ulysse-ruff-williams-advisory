const api = {
  get: async (url, config) => ({ data: {}, status: 200 }),
  post: async (url, data, config) => ({ data: {}, status: 200 }),
  put: async (url, data, config) => ({ data: {}, status: 200 }),
  delete: async (url, config) => ({ data: {}, status: 200 }),
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} },
  },
};

const login = async (credentials) => ({ success: true, token: 'mock-token' });
const logout = async () => ({ success: true });
const getUserProfile = async () => ({ id: '123', name: 'User' });

export default api;
export { login, logout, getUserProfile };
