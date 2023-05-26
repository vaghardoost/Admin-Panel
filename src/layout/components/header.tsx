
import { useNavigate } from "react-router-dom"
import { Menu } from "antd"
import { dispatch } from "../../redux";
import { actions } from "../reducer";
import { loadNamespace } from "../reducer/actions";

export default () => {
  const navigate = useNavigate();
  return <>
    <Menu
      selectable={false}
      mode="horizontal"
      style={{ width: '100%' }}
      items={[
        {
          label: 'مدیریت فضای نام',
          key: 'namespace',
          onClick: () => {
            dispatch(actions.openModal());
            dispatch(loadNamespace());
          }
        },
        {
          label: 'تیکت پشتیبانی',
          key: 'ticket',
          onClick: () => { }
        },
        {
          label: 'تنظیمات حساب کاربری',
          key: 'account',
          onClick: () => { }
        },
        {
          label: 'خروج',
          key: 'exit',
          onClick: () => {
            sessionStorage.clear();
            window.location.replace('/login')
          }
        },
      ]}
    />
  </>
}