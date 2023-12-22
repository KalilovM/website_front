import {create} from 'zustand'


type UserStore = {
  username: string | null
  email: string | null
  avatar: string | null
  tokens: {
    access: string | null
    refresh: string | null
  }
  requestLoading: boolean
}

type UserActions = {
  isAuthenticated: boolean
  login: (username: string, password: string) => void
  logout: () => void
  register: (username: string, email: string, password: string) => void
  setRequestLoading: (loading: boolean) => void
//   TODO: handle token functions
}


const initialState= {
  username: null,
  email: null,
  avatar: null,
  tokens: {
    access: null,
    refresh: null
  },
  isAuthenticated: false,
  requestLoading: false,
}

const userStore = create<UserStore & UserActions>()((set) => ({
  ...initialState,
  login: (username, password) => set((state) => ({
    username: username,
    password: password,
  })),
  logout: () => set((state) => ({
    ...initialState,
  })),
  register: (username, email, password) => set((state) => ({
    username: username,
    email: email,
    password: password,
  })),
  setRequestLoading: (isLoading) => set((state) => ({
    requestLoading: isLoading
  }))

}))

// TODO: not sure if this creates each time new store or not

export default userStore