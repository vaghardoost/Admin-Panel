import { Link } from 'react-router-dom'
import './sidemenu.css'
export default () => <>
  <div className="sidemenu">
    <div className="sidemenu-header">
      <h3>امکانات</h3>
    </div>
    <div className="sidemenu-item">
      <h5>نوشته ها</h5>
      <ul>
        <li><Link to="/note">نوشته ها</Link></li>
        <li><Link to="/category">دسته بندی ها</Link></li>
        <li><Link to="/note/add">افزودن نوشته</Link></li>
        <li><Link to="/category/add">افزودن دسته بندی</Link></li>
      </ul>
    </div>
    <div className="sidemenu-item">
      <h5>مخزن فایل</h5>
      <ul>
        <li><Link to="/file/photo">مدیریت تصاویر</Link></li>
        <li><Link to="/">مدیریت صوتی</Link></li>
        <li><Link to="/">مدیریت ویدیو</Link></li>
        <li><Link to="/">مدیریت اسناد</Link></li>
      </ul>
    </div>
  </div>
</>