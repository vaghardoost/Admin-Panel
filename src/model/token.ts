export interface TokenModel {
  id: string
  username: string
  role: "Admin" | "Author" | "Operator" | "Manager"
  iat: number
  exp: number
}