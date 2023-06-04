import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../pages/login"
import { Layout } from "antd"
const { Content } = Layout
export default () => {
  return (
    <Layout>
      <Content style={{ height: '100vh' }}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to='login' />} />
        </Routes>
      </Content>
    </Layout>
  )
}