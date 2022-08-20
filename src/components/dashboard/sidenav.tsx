import { Component, ReactNode } from "react";
import { Nav, Sidenav } from "rsuite";

export default class SideMenu extends Component<Properties,State>{
    public render(): ReactNode {
        return (
            <Sidenav defaultOpenKeys={['content','account']}>
                <Sidenav.Header>
                    <div style={style}>داشبورد</div>
                </Sidenav.Header>
                <Sidenav.Body>
                    <Nav>
                        <Nav.Menu eventKey={'content'} title="مدیریت محتوا">
                            <Nav.Item panel style={panelStyle}>نوشته ها</Nav.Item>
                            <Nav.Item>مشاهده همه</Nav.Item>
                            <Nav.Item>جستجو</Nav.Item>
                            <Nav.Item>افزودن</Nav.Item>
                            <Nav.Item divider />

                            <Nav.Item panel style={panelStyle}>دسته بندی ها</Nav.Item>
                            <Nav.Item>مشاهده همه</Nav.Item>
                            <Nav.Item>جستجو</Nav.Item>
                            <Nav.Item>افزودن</Nav.Item>
                            <Nav.Item divider />

                        </Nav.Menu>
                        <Nav.Menu eventKey={'account'} title="حساب کاربری">
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
    textAlign:"center"
}

const panelStyle:React.CSSProperties = {
    padding: '15px 20px',
    fontSize:14,
    fontWeight:"bold"
}

type State = {}

type Properties = {}