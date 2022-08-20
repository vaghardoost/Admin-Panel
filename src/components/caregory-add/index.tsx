import { Component, ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import AddCategoryCart from "./add-cat-card";
import AddCategoryCartFather from "./add-cat-card-father";

export default class AddCategory extends Component<Properties,State>{
    public render(): ReactNode {
        return(
            <Row>
                <Col md="4">
                    <AddCategoryCart/>
                </Col>
                <Col md="8">
                    <AddCategoryCartFather/>
                </Col>
            </Row>
        )
    }
}

type Properties = {

}

type State = {

}
