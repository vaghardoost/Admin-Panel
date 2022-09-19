import {Component, ReactNode} from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom";
import { Button, ButtonGroup, Panel, PanelGroup, Placeholder, Stack, Table } from "rsuite"
import { Note } from "../../class/model/note"
import NoteViewer from "../../class/viewer";
import { State } from "./reducer";

interface Props {
    data:Note[]
}

class NoteTable extends Component<Props,{redirect?:string}> {

     constructor(props:Props){
          super(props);
          this.state = {
               redirect:""
          }
     }

     public render(): ReactNode {
          return (this.state.redirect !== "")
               ? <Navigate to={"/note/edit/"+this.state.redirect}/>
               : (
                    <>
                         <h5 className="around">
                              {(this.props.data.length > 0)?"فهرست نوشته ها":"هیچ موردی یافت نشد"}
                         </h5>      
                         <Panel bodyFill shaded>
                                   <PanelGroup className="bg-light" accordion>
                                   {
                                        this.props.data.map((note:Note):ReactNode=>{
                                             return (
                                                  <Panel 
                                                       header={
                                                       <Stack>
                                                            <h5>{note.title}</h5>
                                                       </Stack>
                                                       }
                                                  >
                                                  <div style={{maxHeight:'250px',overflowY: 'scroll'}}>
                                                       <NoteViewer note={note}/>
                                                  </div>
                                                  <Stack justifyContent="flex-end">
                                                       <ButtonGroup className="around">
                                                            <Button onClick={()=>{this.setState({redirect:note.id})}} appearance="primary">ویرایش نوشته</Button>
                                                            <Button onClick={()=>{}} appearance="primary">حذف نوشته</Button>
                                                       </ButtonGroup>
                                                  </Stack>
                                                  </Panel>
                                             )
                                        })
                                   }
                                   </PanelGroup>
                         </Panel>
                    </>
          )
    }
}

const mapStateToProps = (reducer:any):Props=> {
     const state:State = reducer.noteReducer;
     return {
          data:state.note
     }
}

export default connect(mapStateToProps)(NoteTable);
