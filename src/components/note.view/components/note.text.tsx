import { Component, ReactNode } from "react"
import { Paragraph } from "../../../model/note"

export class NoteComponentText extends Component<{data:Paragraph}> {
  public render(): ReactNode {
    const { text } = this.props.data;
    return(<p>
      {
        text.map((word)=>{
          const {style} = word;
          switch (style) {
            case "bold":
              return <span style={{fontWeight:'bold'}}> {word.content} </span>
            case "italic":
              return <span style={{fontStyle:'italic'}}> {word.content} </span>
            case "italicBold":
              return <span style={{fontStyle:'italic',fontWeight:'bold'}}> { word.content } </span>
            default:
              return word.content + " "
          }
        })
      }
    </p>)
  }
}