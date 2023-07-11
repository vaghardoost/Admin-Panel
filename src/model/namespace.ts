export default interface NamespaceModel {
  id: string
  name: string
  state: "Run" | "Suspend" | "Close"
  operator: string
  author: string[]
  include: ("blog" | "news" | "shop")[]
  primaryColor: string
  secoundColor: string
  founder: string
  datapack?: string
}
