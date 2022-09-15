import { Component, ReactNode } from "react";
import { FlexboxGrid, Row } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { dispatch } from "../../class/redux/store";
import { changeStatus } from "./reducer";
import LoginCard from './login-card'
export default class Login extends Component {

    public render(): ReactNode {
        return (
            <FlexboxGrid justify="center">
                <FlexboxGridItem colspan={6}>
                    <div style={{marginTop:'40%'}}>
                        <LoginCard/>
                    </div>
                </FlexboxGridItem>
            </FlexboxGrid>
        )
    }
}