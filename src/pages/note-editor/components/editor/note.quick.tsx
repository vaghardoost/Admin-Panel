import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, Panel } from "rsuite";
import { SectionType } from "../../../../model/note";
import { dispatch } from "../../../../redux";
import { actions } from "../../reducer";
import { State } from "../../reducer/state";
import EditorCaption from "./pages/sections/editor.caption";
import EditorCode from "./pages/sections/editor.code";
import EditorFrame from "./pages/sections/editor.frame";
import EditorPhoto from "./pages/sections/editor.photo";
import EditorTitle from "./pages/sections/editor.title";

class NoteQuickEditor extends Component<Props> {

  public render(): ReactNode {
    return (!this.props.visible)
      ? <></>
      :
      <>
        <Panel bordered style={{ backgroundColor: 'white', maxHeight: '500px', overflowY: 'scroll' }}>
          {this.getComponent()}
          <Button onClick={() => {dispatch(actions.resetQuick())}}>بستن</Button>
        </Panel>
      </>
  }

  private getComponent() {
    switch (this.props.section!.type) {
      case 'caption':
        return <EditorCaption index={this.props.index!} key={this.props.section!.id} />
      case 'frame':
        return <EditorFrame index={this.props.index!} key={this.props.section!.id} />
      case 'title':
        return <EditorTitle index={this.props.index!} key={this.props.section!.id} />
      case 'photo':
        return <EditorPhoto index={this.props.index!} key={this.props.section!.id} />
      case 'code':
        return <EditorCode index={this.props.index!} key={this.props.section!.id} />
      default:
        return <h4 className='fg-red around center'>خطای قسمت ناشناخته</h4>
    }
  }
}

interface Props {
  visible: boolean
  index?: number
  section?: SectionType
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.addNoteReducer;
  return { ...state.quick }
}

export default connect(mapStateToProps)(NoteQuickEditor);