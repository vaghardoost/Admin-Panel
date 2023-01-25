import { connect } from 'react-redux'
import { State } from '../../reducer/state'
import { Button, ButtonGroup, Panel } from 'rsuite'
import RichtextEditor from "../../../../components/richtext.editor"
import { dispatch } from '../../../../redux';
import { actions } from '../../reducer';
import { Caption, Note, RichText } from '../../../../model/note';

function EditorCaption({index,note:{content}}:Props) {

  const caption:Caption = {
    richtext:[],
    ...content![index],
    type:'caption'
  }
  const length = content!.length - 1;

  return <>
    <Panel bodyFill header={<h4>نوشته خام</h4>}>
      <RichtextEditor onChange={(richtext)=>onChange(richtext)} richtext={caption.richtext}/>
      <ButtonGroup className='around'>
        { (index !== 0) ? <Button onClick={()=>move('up')}>انتقال به بالا</Button>:<></> }
        { (index !== length) ? <Button onClick={()=>move('down')}>انتقال به پایین</Button>:<></> }
        <Button onClick={()=>remove()}>حذف</Button>
      </ButtonGroup>
    </Panel>
  </>

  function move(dest:'up'|'down') {
    dispatch(actions.moveSection({ dest: dest, index: index}));
  }

  function remove() {
    dispatch(actions.removeSection({ index: index}));
  }

  function onChange(richtext:RichText[]){
    caption.richtext = richtext;
    dispatch( actions.updateSection({ index:index, section:caption }) )
  }
}

interface Props {
  index:number
  note:Note
}

const mapStateToProps = (reducer:any) => {
  const { note }:State = reducer.addNoteReducer;
  return {
    note:note
  };
}

export default connect(mapStateToProps)(EditorCaption);
