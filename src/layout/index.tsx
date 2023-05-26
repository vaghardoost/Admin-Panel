import { Layout } from "antd"

import Body from "./components/body";
import SideMenu from "./components/side";
import HeaderMenu from "./components/header";
import Namespace from "./components/namespace";

const { Content, Sider } = Layout;

export default () => {
  return <>
    <Namespace />
    <Layout style={{ height: '100vh' }}>
      <Sider>
        <SideMenu />
      </Sider>
      <Layout >
        <HeaderMenu />
        <Content style={{ overflowY: 'scroll' }}>
          <Body />
        </Content>
      </Layout>
    </Layout>
  </>
}
