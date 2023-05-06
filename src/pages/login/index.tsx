import { Component, ReactNode } from "react";
import LoginCard from './components/login-card'
import './stylesheet/module.login.css'

export default class Login extends Component {
    public render(): ReactNode {
        return <>
            <div className="container-fluid back">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <LoginCard />
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    }
}