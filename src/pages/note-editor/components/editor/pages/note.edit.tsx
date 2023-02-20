import { connect } from 'react-redux'
import { PanelGroup } from 'rsuite';
import { Note } from '../../../../../model/note'
import { State } from '../../../reducer/state'
import EditorAppend from './sections/editor.append';
import EditorCaption from './sections/editor.caption';
import EditorCode from './sections/editor.code';
import EditorFrame from './sections/editor.frame';
import EditorPhoto from './sections/editor.photo';
import EditorTitle from './sections/editor.title';


function Editor({data:{content:data}}:Props) {
    return <>
      <PanelGroup accordion>
        {
          data?.map((section,index)=>{
            switch (section.type) {
              case 'caption':
                return <EditorCaption index={index} key={section.id}/>
              case 'frame':
                return <EditorFrame index={index} key={section.id}/>
              case 'title':
                return <EditorTitle index={index} key={section.id} />
              case 'photo':
                return <EditorPhoto index={index} key={section.id} />
              case 'code':
                return <EditorCode index={index} key={section.id} />
              default:
                return <h4 className='fg-red around center'>خطای قسمت ناشناخته</h4>
            }
          })
        }
      </PanelGroup>
      <EditorAppend/>
    </>
}

interface Props {
  data:Note
}

const mapStateToProps = (reducer:any):Props => {
  const state:State = reducer.addNoteReducer;
  return { data: state.note }
}

export default connect(mapStateToProps)(Editor);
