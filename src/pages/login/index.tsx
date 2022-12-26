import { Component, ReactNode } from "react";
import { FlexboxGrid } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import LoginCard from './components/login-card'

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