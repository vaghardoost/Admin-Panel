import { Component, ReactNode } from "react";
import { Button, Input, Panel } from "rsuite";

export default class AddCategoryCart extends Component{
    public render(): ReactNode {
        return (
            <Panel shaded bordered className="bg-light" header="دسته بندی جدید">
                <Input placeholder="عنوان دسته بندی را وارد کنید" style={{marginBottom:'15px'}}/>
                <Button block appearance="primary">ذخیره</Button>
            </Panel>
        )
    }
}