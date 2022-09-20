import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Input, Panel, Stack, TagInput } from "rsuite";
import { dispatch } from "../../class/redux";
import Editor from "./editor";
import { State,actions } from "./reducer";
import { Note } from "../../class/model/note";

interface Props {
    note:Note
}

class AddNoteEditor extends Component<Props>{

    public render(): ReactNode {
        return (
            <Panel className="bg-light" shaded header={
                <Stack justifyContent="space-between">
                    <h5>نوشته جدید</h5>
                        <ButtonGroup>
                            <Button onClick={()=>dispatch(actions.modalSave(true))} appearance="default">ذخیره پیش نویس</Button>
                            <Button onClick={()=>dispatch(actions.modalLoad(true))} appearance="default">بارگذاری پیش نویس</Button>
                            <Button appearance="primary" color='green'>انتشار نوشته</Button>
                        </ButtonGroup>
                </Stack>
            }>
                <Input value={this.props.note.title} onChange={(text)=>dispatch(actions.changeTitle(text))} style={{marginBottom:'20px'}} placeholder="عنوان نوشته"/>
                <Editor />
                <TagInput data={[]} value={this.props.note.tag} onChange={(text: string[]) => dispatch(actions.setTag((text === null) ? [] : text))} placeholder="کلمات کلیدی" style={{ marginTop: '20px' }} block trigger={"Enter"} />
            </Panel>
        )
    }

}

function mapStateToProps(reducer:any):Props {
    const state:State = reducer.addNoteReducer;
    return {
        note:state.note
    }
}

export default connect(mapStateToProps)(AddNoteEditor)
