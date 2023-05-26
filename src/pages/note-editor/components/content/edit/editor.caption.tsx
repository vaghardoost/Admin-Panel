import { connect } from 'react-redux'
import { Card } from 'antd';

import { State } from '../../../reducer/state'
import RichtextEditor from "../../../../../components/richtext.editor"
import { dispatch } from "../../../../../redux";
import { actions } from "../../../reducer";
import { Caption, Note } from '../../../../../model/note';
import { getActions } from './_section.actions';

const EditorCaption = ({ index, note: { content } }: Props) => {

  const caption: Caption = {
    richtext: [],
    ...content![index],
    type: 'caption'
  }

  return <>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      extra={getActions(index, content!.length - 1)}
      title="پاراگراف">
      <RichtextEditor
        onChange={(richtext) => {
          caption.richtext = richtext;
          dispatch(actions.updateSection({ index: index, section: caption }))
        }}
        richtext={caption.richtext} />
    </Card>
  </>

}

interface Props {
  index: number
  note: Note
}

const mapStateToProps = (reducer: any) => {
  const { note }: State = reducer.addNoteReducer;
  return {
    note: note
  };
}

export default connect(mapStateToProps)(EditorCaption);
