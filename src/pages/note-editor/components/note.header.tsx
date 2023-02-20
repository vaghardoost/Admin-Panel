import { Component, CSSProperties, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Input, Panel, Stack, TagInput } from "rsuite";
import { Note } from "../../../model/note";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { addNote, update } from "../reducer/actions";
import { State } from "../reducer/state";

class NoteHeader extends Component<Props> {
  private imgStyle: CSSProperties = {
    width: '100%',
    borderRadius: '5px'
  }
  public render(): ReactNode {
    return <>
      <Panel bordered style={{height:'100%'}}>
        <img style={this.imgStyle} src="http://localhost:31375/photo/463f9a74449b0e04360c511b3d5e2a18.jpeg" />
        <ButtonGroup justified className='around'>
          <Button>انتخاب تصویر</Button>
          <Button>بدون عکس</Button>
        </ButtonGroup>
        <Input value={this.props.note.title} onChange={(text) => dispatch(actions.changeTitle(text))} style={{ marginBottom: '20px' }} placeholder="عنوان نوشته" />
        <TagInput data={[]} value={this.props.note.tag} onChange={(text: string[]) => dispatch(actions.setTag((text === null) ? [] : text))} placeholder="کلمات کلیدی" style={{ marginBottom: '20px' }} block trigger={"Enter"} />

        <ButtonGroup justified>
          <Button size="sm" onClick={() => dispatch(actions.modalSave(true))} appearance="default">ذخیره پیش نویس</Button>
          <Button size="sm" onClick={() => dispatch(actions.modalLoad(true))} appearance="default">بارگذاری پیش نویس</Button>
          {
            (this.props.edit)
              ? <Button color='green' appearance="primary" size="sm" onClick={() => dispatch(update(this.props.note))}>ذخیره تغییرات</Button>
              : <Button color='green' appearance="primary" size="sm" onClick={() => dispatch(addNote(this.props.note))}>انتشار نوشته</Button>
          }
        </ButtonGroup>

      </Panel>
    </>
  }
}

interface Props {
  note: Note
  edit?: string
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.addNoteReducer;
  return {
    edit: state.edit,
    note: state.note
  }
}

export default connect(mapStateToProps)(NoteHeader);
