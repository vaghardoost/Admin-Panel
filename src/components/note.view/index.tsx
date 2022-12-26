import { Component, ReactNode } from "react"
import { Note } from "../../model/note"
import { NoteComponentFrame } from "./components/note.frame";
import { NoteComponentPhoto } from "./components/note.photo";
import { NoteComponentText } from "./components/note.text";
import { NoteComponentTitle } from "./components/note.title";

export class NoteComponent extends Component<{note:Note}>{
  public render(): ReactNode {
    return(
      <>
        {
          this.props.note.content?.map((content)=>{
            const {text,type,url} = content;
            function view():ReactNode {
              switch (type) {
                case "photo":
                  return <NoteComponentPhoto data={content}/>
                case "title":
                  return <NoteComponentTitle data={content}/>
                case "frame":
                  return <NoteComponentFrame data={content}/>
                default:
                  return <NoteComponentText data={content}/>
              }
            }
            return <div>{view()}</div>
          })
        }
      </>
    )
  }
}