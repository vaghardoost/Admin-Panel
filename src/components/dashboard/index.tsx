import { Component, ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import DashCard from "./dash.card";

export default class Dashboard extends Component{
    public render(): ReactNode {
        return (
            <Row>
                <Col md="3">
                    <DashCard title="نوشته ها" value={10}/>
                </Col>
                <Col md="3">
                    <DashCard title="دسته بندی ها" value={10}/>
                </Col>
                <Col md="3">
                    <DashCard title="نویسندگان" value={10}/>
                </Col>
                <Col md="3">
                    <DashCard title="نام و نشان" value={10}/>
                </Col>
                
            </Row>
        );
    }
}