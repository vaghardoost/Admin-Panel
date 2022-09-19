import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Nav, Sidenav } from "rsuite";

export default class SideMenu extends Component<Properties,State>{
    public render(): ReactNode {
        return (
            <Sidenav defaultOpenKeys={['content','account']}>
                <Sidenav.Header>
                    <div style={style}>
                        <Link to="dashboard">
                            <p className="fg-light">داشبورد</p>
                        </Link>
                    </div>
                </Sidenav.Header>
                <Sidenav.Body>
                    <Nav>
                        <Nav.Menu title="مدیریت محتوا">

                            <Nav.Item panel style={panelStyle}>نوشته ها</Nav.Item>
                            <Nav.Item> <Link to="/note">مشاهده همه</Link> </Nav.Item>
                            <Nav.Item> <Link to="/note/add">افزودن</Link> </Nav.Item>
                            <Nav.Item divider />

                            <Nav.Item panel style={panelStyle}>دسته بندی ها</Nav.Item>
                            <Nav.Item>مدیریت دسته بندی ها</Nav.Item>
                            <Nav.Item divider />

                            <Nav.Item panel style={panelStyle}>مخزن فایل ها</Nav.Item>
                            <Nav.Item>عکس</Nav.Item>
                            <Nav.Item>صدا</Nav.Item>
                            <Nav.Item>ویدئو</Nav.Item>
                            <Nav.Item>فایل</Nav.Item>
                            <Nav.Item divider />

                        </Nav.Menu>

                        

                        <Nav.Menu title="حساب کاربری">
                            <Nav.Item>تغییر رمز</Nav.Item>
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        )
    }
}

const style:React.CSSProperties = {
    background: "grey",
    color: 'white',
    padding:"10px",
    fontSize:"large",
    textAlign:"center",
}

const panelStyle:React.CSSProperties = {
    padding: '15px 20px',
    fontSize:14,
    fontWeight:"bold"
}

type State = {}

type Properties = {}
