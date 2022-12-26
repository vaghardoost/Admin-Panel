import { Component, ReactNode } from "react"
import { Paragraph } from "../../../model/note"

export class NoteComponentTitle extends Component<{data:Paragraph}> {
  public render(): ReactNode {
    return(
      <h3 style={{marginBottom:'20px',marginTop:'20px'}}>
          {
            this.props.data.text.map((word)=>{
              return word.content + " ";
            })
          }
      </h3>
    )
  }
}