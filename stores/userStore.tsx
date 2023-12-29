import {create} from 'zustand'


type UserStore = {
  username: string | null
  email: string | null
  avatar: string | null
}

type UserActions = {
  isAuthenticated: boolean
  login: (username: string, password: string, avatar: string) => void
  logout: () => void
}


const initialState= {
  username: null,
  email: null,
  avatar: null,
  isAuthenticated: false,
}

const userStore = create<UserStore & UserActions>()((set) => ({
  ...initialState,
  login: (username, email, avatar) => set((state) => ({
    username: username,
    email: email,
    avatar: avatar,
    isAuthenticated: true
  })),
  logout: () => set((state) => ({
    ...initialState,
  })),

}))

// TODO: not sure if this creates each time new store or not

export default userStore