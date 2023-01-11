import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Input, Panel, Stack, TagInput } from "rsuite";
import { Note } from "../../../model/note";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { addNote, update } from "../reducer/actions";
import { State } from "../reducer/state";
import EditArea from "./editor";

interface Props {
    note:Note
    edit?:string
}

class NoteEditor extends Component<Props>{

    public render(): ReactNode {
        return (
            <Panel className="bg-light" bordered header={
                <Stack justifyContent="space-between">
                    <h5>
                        {(this.props.edit)?'ویرایش نوشته':'نوشته جدید'}
                    </h5>
                        <ButtonGroup>
                            <Button onClick={()=>dispatch(actions.modalSave(true))} appearance="default">ذخیره پیش نویس</Button>
                            <Button onClick={()=>dispatch(actions.modalLoad(true))} appearance="default">بارگذاری پیش نویس</Button>
                            {
                                (this.props.edit)
                                    ? <Button onClick={()=>dispatch(update(this.props.note))} appearance="primary" color='green'>ذخیره تغییرات</Button>
                                    : <Button onClick={()=>dispatch(addNote(this.props.note))} appearance="primary" color='green'>انتشار نوشته</Button>
                            }
                        </ButtonGroup>
                </Stack>
            }>
                <Input value={this.props.note.title} onChange={(text)=>dispatch(actions.changeTitle(text))} style={{marginBottom:'20px'}} placeholder="عنوان نوشته"/>
                <EditArea />
                <TagInput data={[]} value={this.props.note.tag} onChange={(text: string[]) => dispatch(actions.setTag((text === null) ? [] : text))} placeholder="کلمات کلیدی" style={{ marginTop: '20px' }} block trigger={"Enter"} />
            </Panel>
        )
    }

}

function mapStateToProps(reducer:any):Props {
    const state:State = reducer.addNoteReducer;
    return {
        note:state.note,
        edit:state.edit
    }
}

export default connect(mapStateToProps)(NoteEditor)
