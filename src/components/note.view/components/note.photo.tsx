import { Component, ReactNode } from "react"
import { Panel, Stack } from "rsuite"
import { Paragraph } from "../../../model/note"
import { NoteComponentText } from "./note.text"

export class NoteComponentPhoto extends Component<{data:Paragraph}> {
  
  public render(): ReactNode {
    return(<>
    <Stack justifyContent="center">
      <Panel bodyFill bordered style={{display: 'inline-block',}}>
        <img style={{maxHeight:340}} src={this.props.data.url}/>
        {
          (this.props.data.text.length > 0)
          ?
            <div style={{padding:'10px'}}>
              <NoteComponentText data={this.props.data}/>
            </div>
          :
            <></>
        }
      </Panel>
    </Stack>
    </>)
  }
  
}