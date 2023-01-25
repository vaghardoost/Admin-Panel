import { connect } from "react-redux"
import { Button, ButtonGroup, Input, Panel } from "rsuite"
import { Note, Title } from "../../../../model/note"
import { dispatch } from "../../../../redux"
import { actions } from "../../reducer"
import { State } from "../../reducer/state"

function EditorTitle({note:{content},index}:Props) {
  
  const title:Title = {
    header:'h1',
    text:'',
    ...content![index],
    type:'title'
  }

  const TitleHeader = `${title.header}` as keyof JSX.IntrinsicElements;
  const length = content!.length - 1;
  
  return <>
    <Panel bodyFill header={<h4>عنوان</h4>}>
      <div className="around editor">
        <ButtonGroup className="around">
          <Button onClick={()=>setH('h1')} appearance={(title.header === 'h1')?'primary':'default'}>h1</Button>
          <Button onClick={()=>setH('h2')} appearance={(title.header === 'h2')?'primary':'default'}>h2</Button>
          <Button onClick={()=>setH('h3')} appearance={(title.header === 'h3')?'primary':'default'}>h3</Button>
          <Button onClick={()=>setH('h4')} appearance={(title.header === 'h4')?'primary':'default'}>h4</Button>
          <Button onClick={()=>setH('h5')} appearance={(title.header === 'h5')?'primary':'default'}>h5</Button>
          <Button onClick={()=>setH('h6')} appearance={(title.header === 'h6')?'primary':'default'}>h6</Button>
        </ButtonGroup>
        <Input value={title.text} onChange={updateTag} placeholder="عنوان"/>
        <div className="around">
          <TitleHeader>{title.text}</TitleHeader>
        </div>
      </div>
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
  
  function updateTag(text:string) {
    title.text = text;
    dispatch( actions.updateSection({ index:index, section:title }) );
  }

  function setH(tag:"h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
    title.header = tag;
    dispatch( actions.updateSection({ index:index, section:title }) )
  }
}

interface Props {
  note:Note
  index:number
}

function mapStateToProps(reducer:any) {
  const state:State = reducer.addNoteReducer;
  return {
    note:state.note
  }
}

export default connect(mapStateToProps)(EditorTitle)