import { createRef, RefObject } from "react";
import { connect } from "react-redux";
import { Button, Card, Input, InputRef, Space, message } from "antd";
import { BulbOutlined, EnterOutlined, QuestionCircleOutlined, } from "@ant-design/icons"

import { dispatch } from "../../../redux";
import { loading } from "../reducer";
import { loginAction } from "../reducer/actions";
import { State } from "../reducer/state";

interface Props {
  status: 'normal' | 'error' | 'loading' | 'success'
  message?: string
}

const userInput: RefObject<InputRef> = createRef();
const passInput: RefObject<InputRef> = createRef();

function LoginCard({ status, message: msg_text }: Props) {
  const [messageApi, contextHolder] = message.useMessage();

  function login() {
    const username = userInput.current?.input?.value ?? "";
    const password = passInput.current?.input?.value ?? "";
    if (username === "" || password === "") {
      messageApi.open({
        type: 'error',
        content: 'نام کاربری و رمز عبور را وارد نکرده اید'
      })
      return;
    }
    dispatch(loading());
    dispatch(loginAction({ username: username, password: password }));
  }

  if (status === 'error') {
    messageApi.open({
      type: 'error',
      content: msg_text
    })
  }

  return <>
    {contextHolder}
    <Card
      title={<h5 className="center">ورود مدیران و نویسندگان</h5>}
      dir="ltr"
      actions={[<BulbOutlined />, <EnterOutlined />, <QuestionCircleOutlined />]}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input disabled={status === 'loading'} placeholder="نام کاربری" ref={userInput} />
        <Input.Password disabled={status === 'loading'} placeholder="رمز عبور" ref={passInput} />
        <Button onClick={() => login()} loading={status === 'loading'} type="primary" block>ورود به سیستم</Button>
      </Space>
    </Card>
  </>


}


function mapStateToProps(reducer: any): Props {
  const state: State = reducer.loginReducer;
  return {
    status: state.status,
    message: state.message,
  };
}

export default connect(mapStateToProps)(LoginCard)
