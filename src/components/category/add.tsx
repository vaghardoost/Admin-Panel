import { Component, ReactNode } from "react"
import { connect } from "react-redux";
import { Button, Form, Input, Panel, Stack } from "rsuite";

class AddCategory extends Component{
    public render(): ReactNode {
        return (
            <Panel className="bg-light" shaded header={<h5>افزودن دسته بندی</h5>}>
                <h6 style={{marginBottom:'10px'}}>زیرشاخه:root</h6>
                <Input placeholder="عنوان دسته بندی" />
                <Button appearance="primary" block style={{marginTop:'10px'}}>ذخیره</Button>
            </Panel>
        )
    }
}

export default connect()(AddCategory);
