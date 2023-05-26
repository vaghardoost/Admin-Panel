import { connect } from "react-redux";
import { dispatch } from "./redux";

import { changeStatus } from "./pages/login/reducer";
import FreeRoutes from "./routes/free";
import PrivateLayout from "./layout";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

interface Props {
  hasToken: boolean
}

function App({ hasToken }: Props) {
  return <>
    <ConfigProvider theme={
      {
        token: {
          fontFamily: 'Dana',
        },
        components: {
          Menu: {
            colorPrimary: '#2980B9'
          },
        }
      }
    }>
      <BrowserRouter>
        {hasToken ? <PrivateLayout /> : <FreeRoutes />}
      </BrowserRouter>
    </ConfigProvider>
  </>
}

const mapStateToProps = (): Props => {
  const token = sessionStorage.getItem('token');
  const result = (token !== null);
  if (result) {
    dispatch(changeStatus(result));
  }
  return { hasToken: result }
}

export default connect(mapStateToProps)(App)
