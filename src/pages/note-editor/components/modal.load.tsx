import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Modal, Table } from "rsuite";
import { Note } from "../../../model/note";
import { dispatch } from "../../../redux";
import { objectToPattern } from "../../../render";
import { actions } from "../reducer";
import { State } from "../reducer/state";

interface Props {
    modal:boolean
    selected?:string
    note:Note
}

class LoadModal extends Component<Props> {
    public render(): ReactNode {
        return (
            <Modal overflow={true} backdrop="static" open={this.props.modal}>
                    <Modal.Title>
                        <h5>بارگذاری پیش نویس</h5>
                    </Modal.Title>
                    <Modal.Body>
                        <Table data = {this.loadDraftList()} onRowClick={(data)=>dispatch(actions.modalLoadSelect(data.id.props.children))}>
                        
                            <Table.Column resizable width={150}>
                                <Table.HeaderCell>شناسه</Table.HeaderCell>
                                <Table.Cell dataKey={'id'} />
                            </Table.Column>

                            <Table.Column resizable width={400}>
                                <Table.HeaderCell>عنوان</Table.HeaderCell>
                                <Table.Cell dataKey={'title'} />
                            </Table.Column>
                            
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup>
                            <Button onClick={()=>{dispatch(actions.modalLoad(false))}} size="sm">بستن</Button>
                            <Button onClick={()=>this.loadDraftNote()} disabled={(this.props.selected === undefined)} size="sm" appearance="primary">
                                {
                                    (this.props.selected === undefined)
                                        ? "یکی را انتخاب کنید"
                                        : "بارگذاری " + this.props.selected
                                }
                            </Button>
                            {
                                (this.props.selected === undefined)
                                    ?<></>
                                    :<Button onClick={()=>this.removeDraftNote()} size="sm" appearance="primary" color="red">حذف پیش نویس</Button>
                            }
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>
        )
    }

    private removeDraftNote(){
        const {selected} = this.props;
        localStorage.removeItem(selected!);
        dispatch(actions.modalLoad(false));
    }

    private loadDraftList(){
        const list:any[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const record = JSON.parse(localStorage.getItem(key!)!);
            list.push({
                id:<p className="selectable-text">{key}</p>,
                title:<p className="selectable-text">{record.title}</p>
            });
        }
        return list;
    }
    
    private loadDraftNote(){
        const data = localStorage.getItem(this.props.selected!)!;
        const note:Note = JSON.parse(data);
        const raw = objectToPattern(note.content!);
        dispatch(actions.changeContent(raw));
        dispatch(actions.setNote(note))
        dispatch(actions.modalLoad(false));
    }
}

const mapStateToProps = (reducer:any):Props=>{
    const state:State = reducer.addNoteReducer;
    return {
        modal:state.draft.load.modal,
        selected:state.draft.load.status,
        note:state.note
    }
}

export default connect(mapStateToProps)(LoadModal);