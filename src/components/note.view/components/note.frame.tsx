import { Component, ReactNode } from "react"
import { Paragraph } from "../../../model/note"
import { NoteComponentText } from "./note.text"

export class NoteComponentFrame extends Component<{data:Paragraph}> {
  public render(): ReactNode {
    return(<>
      <div style={{ backgroundColor:"#aaaaaa",padding:"10px",margin:"10px",borderRadius:"5px" }}>
        <NoteComponentText data={this.props.data}/>
      </div>
    </>)
  }
}