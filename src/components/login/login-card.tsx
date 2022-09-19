import { Component, createRef, ReactNode, RefObject } from "react";
import { connect } from "react-redux";
import { Button, Input, Panel } from "rsuite";
import { dispatch } from "../../class/redux";
import { State,login, loading } from "./reducer"

interface Props {
    status:'normal'|'error'|'vlidation'|'loading'|'success'
}

export class LoginCard extends Component<Props>{
    private userInput:RefObject<HTMLInputElement> = createRef();
    private passInput:RefObject<HTMLInputElement> = createRef();

    public render(): ReactNode {
        return(
            <>
                <Panel className="bg-light" bordered shaded style={{backgroundColor:"white"}}>
                    <h3 style={{textAlign:"center"}}>ورود مدیران</h3>
                    <p style={{marginBottom:"50px",textAlign:"center"}}>نام کاربری و رمز عبور را وارد کنید</p>
                    <Input ref={this.userInput} style={{marginBottom:"15px",textAlign:"center"}} placeholder="نام کاربری" />
                    <Input ref={this.passInput} style={{marginBottom:"15px",textAlign:"center"}} type="password" placeholder="رمز عبور" />
                    {
                        (this.props.status === 'error')
                            ? <Button onClick={()=>this.login()} color="red" appearance="primary" block>ورود مجدد</Button>
                            : (this.props.status === 'loading')
                                ? <Button loading size="sm" appearance="primary" block>ورود</Button>
                                : <Button onClick={()=>this.login()} appearance="primary" block>ورود</Button>
                    }
                </Panel>
            </>
        );
    }

    private login(){
        const username = this.userInput.current?.value ?? "";
        const password = this.passInput.current?.value ?? "";
        this.setState({
            button:<Button size="sm" loading appearance="primary" block>ورود</Button>
        });
        dispatch(loading());
        dispatch(login({username:username,password:password}));
    }
}

function mapStateToProps(reducer:any):Props {
    const state:State = reducer.loginReducer;
    return {
        status:state.status
    };
}

export default connect(mapStateToProps)(LoginCard)
