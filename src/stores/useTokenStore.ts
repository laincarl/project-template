import create from 'zustand';

type TokenState = {
  authToken: string
  refreshToken: string
  setAuthToken: (authToken: string) => void
  setRefreshToken: (refreshToken: string) => void
}

const useTokenStore = create<TokenState>((set) => ({
  authToken: '',
  refreshToken: '',
  setAuthToken: (authToken) => set((state) => ({ ...state, authToken })),
  setRefreshToken: (refreshToken) => set((state) => ({ ...state, refreshToken })),
}));

export default useTokenStore;
