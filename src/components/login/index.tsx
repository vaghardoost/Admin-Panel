import { Component, ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginCard from './login-card'
export default class Login extends Component {
    public render(): ReactNode {
        return (
            <Container>
                <Row>
                    <Col md="4"></Col>
                    <Col md="4">
                        <div style={{marginTop:"40%"}}>
                            <LoginCard/>
                        </div>
                    </Col>
                    <Col md="4"></Col>
                </Row>
            </Container>
        )
    }
}