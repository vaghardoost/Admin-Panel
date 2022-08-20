import { Component, ReactNode } from "react";
import { Button, Input, Panel } from "rsuite";

export default class LoginCard extends Component{
    public render(): ReactNode {
        return(
            <Panel headerRole="" bordered shaded style={{backgroundColor:"white"}}>
                <h3 style={{textAlign:"center"}}>ورود مدیران</h3>
                <p style={{marginBottom:"50px",textAlign:"center"}}>نام کاربری و رمز عبور را وارد کنید</p>
                <Input style={{marginBottom:"15px",textAlign:"center"}} placeholder="نام کاربری" />
                <Input style={{marginBottom:"15px",textAlign:"center"}} type="password" placeholder="رمز عبور" />
                <Button appearance="primary" block>ورود</Button>
            </Panel>
        );
    }
}