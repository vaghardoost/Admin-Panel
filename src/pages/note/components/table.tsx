import { Component, ReactNode } from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom";
import { Button, ButtonGroup, Panel, PanelGroup, Stack } from "rsuite"
import { Category } from "../../../model/category";
import { Note } from "../../../model/note"
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { getNoteAction } from "../reducer/action";
import { State } from "../reducer/state";

interface Props {
    data:Note[]
    categoryList:Category[]
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
                    <Panel bodyFill bordered>
                        <PanelGroup accordion>
                        {
                        this.props.data.map((note:Note):ReactNode=>{
                            return (
                                <Panel header={<Stack><h5>{note.title}</h5></Stack>}>
                                    <div style={{maxHeight:'250px',overflowY: 'scroll'}}>
                                        <h3>{note.title}</h3>
                                        <h5>{this.getCategoryData(note.category!).label}</h5>
                                    </div>
                                    <Stack justifyContent="flex-end">
                                        <ButtonGroup className="around">
                                            <Button onClick={()=>{dispatch(getNoteAction(note.id!))}} appearance="primary">مشاهده</Button>
                                            <Button onClick={()=>{this.setState({redirect:note.id})}} appearance="primary">ویرایش نوشته</Button>
                                            <Button onClick={()=>{dispatch(actions.removeModal({open:true,id:note.id!}))}} appearance="primary">حذف نوشته</Button>
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

    private getCategoryData(id:string):Category{
        for (const cat of this.props.categoryList) {
            if(cat.id === id){
                return cat;
            }
        }
        return {
            id: "no category",
            label: "دسته بندی یافت نمیشود",
            parent: "",
            description: '',
        }
    }
}

const mapStateToProps = (reducer:any):Props=> {
    const state:State = reducer.noteReducer;
    return {
        data:state.note,
        categoryList:state.categoryList
    }
}

export default connect(mapStateToProps)(NoteTable);
