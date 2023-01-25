import { convertFromRaw, Editor, EditorState, RawDraftContentBlock, RawDraftContentState, RichUtils } from "draft-js"
import { Component, ReactNode } from "react"
import { Button, ButtonGroup } from "rsuite"
import { RichText, RichWeight } from "../../model/note"
import { generate } from 'randomstring'

export default class RichTextView extends Component<Props,State> {

  constructor(props:Props){
    super(props);
    this.state = {
      editorState:this.buildRaw()
    }
  }

  public render(): ReactNode {    
    return <>
      <div className="editor">
        <ButtonGroup className='around'>
          <Button size="sm" onClick={()=>this.style('BOLD')}>برجسته</Button>
          <Button size="sm" onClick={()=>this.style('ITALIC')}>کج</Button>
          <Button size="sm" onClick={()=>this.style('UNDERLINE')}>زیر خط</Button>
          <Button size="sm" onClick={()=>this.style('STRIKETHROUGH')}>وسط خط</Button>
        </ButtonGroup>
        <div className="around">
          <Editor
            editorState = {this.state.editorState}
            onChange = {(state)=>{this.onChange(state)}}
            handleKeyCommand = {(command,editorState)=>this.handleKeyCommand(command,editorState)}
          />
        </div>
      </div>
    </>
  }

  
  private onChange(editorState:EditorState){
    this.setState({editorState:editorState});
    this.props.onChange(this.buildRich())
  }

  private handleKeyCommand(command: string, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.setState({editorState:newState});
      return 'handled';
    }
    return 'not-handled';
  }

  private style(style:string) {
    const newState = RichUtils.toggleInlineStyle(this.state.editorState,style)
    this.setState({editorState:newState});
  }

  private buildRaw():EditorState {
    const raw:RawDraftContentState = {
      blocks: [],
      entityMap: {}
    }
    
    for (const { content } of this.props.richtext) {
      const block:RawDraftContentBlock = {
        text: "",
        key: generate({length:8,charset:'0123456789abcdef'}),
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: []
      }

      for (let i = 0; i < content.length; i++) {
        const {text,style} = content[i];
        for (const item of style!.weight!) {
          block.inlineStyleRanges.push({
            offset:block.text.length,
            length:text.length,
            style:item,
          })
        }
        block.text += text;
      }

      raw.blocks.push(block);
    }
    
    const newState = EditorState.createWithContent(convertFromRaw(raw));
    return newState;
  }

  private buildRich():RichText[] {
    const { editorState } = this.state;
    const blockMap = editorState.getCurrentContent().getBlockMap();
    const richTextList:RichText[] = [];
  
    blockMap.forEach((block,key)=>{
      const styles:StylesNote = JSON.parse((JSON.stringify(editorState.getBlockTree(key!).get(0))));
      const richText:RichText = { content:[] };
  
      for (const item of styles.leaves) {
        item.style = block!.getCharacterList().get(item.start)?.getStyle().toJS();
        richText.content.push({
          text:block!.getText()!.substring(item.start,item.end),
          style:{ weight:item.style }
        })
      }

      richTextList.push(richText);
    });
    
    return richTextList;
  }

}

interface Props {
  richtext: RichText[]
  onChange: (richtext:RichText[]) => void
}

interface State {
  editorState:EditorState
}

interface StylesNote { 
  start:number,
  end:number,
  leaves:{
    start:number,
    end:number,
    style:RichWeight[]
  }[]
}
