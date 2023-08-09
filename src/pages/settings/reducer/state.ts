export default interface State {
  loading: boolean
  photos: string[],
  namespace?: {
    id: string
    name: string
    avatar: string
    description: string
    state: "اجرا" | "معلق" | "درحال بارگذاری"
    datapack?: string
  }
}

export const initialState: State = {
  loading: true,
  photos: [],
}
