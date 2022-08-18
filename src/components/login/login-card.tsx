import { Component, ReactNode } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default class LoginCard extends Component{
    public render(): ReactNode {
        return(
            <Container>
                <Row>
                    <Col md="2" sm="2" lg="4"></Col>
                    <Col md="8" sm="8" lg="4">
                        <Card style={{marginTop:"100px"}}>
                            <Card.Body>
                                <Card.Title>
                                    <h3 style={{textAlign:"center"}}>ورود</h3>
                                    <p dir="rtl" style={{textAlign:"center"}}>پنل مدیریت cms</p>
                                </Card.Title>
                                <input style={{marginTop:"15px",textAlign:"center"}} type="text" className="form-control" placeholder="نام کاربری"/>
                                <input style={{marginTop:"15px",marginBottom:"45px",textAlign:"center"}} type="password" className="form-control" placeholder="رمز عبور"/>
                                <button className="btn btn-success" style={{width:"100%"}}>ورود</button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="2" sm="2" lg="4"></Col>
                </Row>
                <Row>
                    <p style={{textAlign:"center"}}>طراحی و برنامه نویسی : فرهنگ وقردوست</p>
                </Row>
            </Container>
        )
    }
}