import { Component, CSSProperties, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Input, Panel, TagInput } from "rsuite";
import { Note } from "../../../../model/note";

import { dispatch } from "../../../../redux";
import { actions } from "../../reducer";
import { addNote, update } from "../../reducer/actions";
import { State } from "../../reducer/state";

class NoteHeader extends Component<Props> {
  private imgStyle: CSSProperties = {
    width: '100%',
    borderRadius: '5px',
    textAlign: 'center',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center"
  }
  public render(): ReactNode {
    const { note, edit } = this.props;
    return <>
      <Panel bordered>
        <ButtonGroup justified style={{ marginBottom: '20px' }}>
          <Button size="sm" onClick={() => dispatch(actions.modalSave(true))} appearance="default">ذخیره پیش نویس</Button>
          <Button size="sm" onClick={() => dispatch(actions.modalLoad(true))} appearance="default">بارگذاری پیش نویس</Button>
          {
            (edit)
              ? <Button color='green' appearance="primary" size="sm" onClick={() => dispatch(update(note))}>ذخیره تغییرات</Button>
              : <Button color='green' appearance="primary" size="sm" onClick={() => dispatch(addNote(note))}>انتشار نوشته</Button>
          }
        </ButtonGroup>
        {
          (note.photo)
            ? <img style={this.imgStyle} src={`http://localhost:31375/photo/${note.photo}`} />
            : <h2 style={this.imgStyle}>نوشته بدون عکس</h2>
        }
        <ButtonGroup justified className='around'>
          <Button onClick={() => dispatch(actions.photoPicker(true))} size="sm">انتخاب تصویر</Button>
          <Button onClick={() => dispatch(actions.resetNotePhoto())} size="sm">بدون عکس</Button>
        </ButtonGroup>
        <Input value={note.title} onChange={(text) => dispatch(actions.changeTitle(text))} style={{ marginBottom: '20px' }} placeholder="عنوان نوشته" />
        <TagInput data={[]} value={note.tag} onChange={(text: string[]) => dispatch(actions.setTag((text === null) ? [] : text))} placeholder="کلمات کلیدی" style={{ marginBottom: '20px' }} block trigger={"Enter"} />
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
