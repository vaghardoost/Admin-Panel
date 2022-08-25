import { Component, ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import { Input, Panel, TagInput } from "rsuite";
import AddCategoryCartFather from "../caregory-add/add-cat-card-father";
import Editor from "./editor";

export default class AddNote extends Component{
    public render(): ReactNode {
        return (
            <Row>
                <Col md="8">
                    <Panel className="bg-light" shaded>
                        <Input style={{marginBottom:'20px'}} className="bg-light" placeholder="عنوان نوشته"/>
                        <Editor />
                        <TagInput placeholder="کلمات کلیدی" style={{marginTop:'20px'}} block trigger={"Enter"} data={[]} />
                    </Panel>
                </Col>
                <Col md="4">
                    <AddCategoryCartFather/>
                </Col>
            </Row>
        )
    }
}