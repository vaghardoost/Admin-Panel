import { Component, ReactNode, createRef, RefObject } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Input, Modal, Panel, Stack, Table, TagInput } from "rsuite";
import { dispatch } from "../../class/redux/store";
import { Note,buildRaw } from "../../class/render";
import Editor from "./editor";
import { State,actions } from "./reducer";

interface Props {
    note:Note
    save:{
        modal:boolean
        status:'normal'|'validation'|'duplicate'
    }
    load:{
        modal:boolean
        selected?:string
    }
}

class AddNoteEditor extends Component<Props>{

    private saveDraftTextField:RefObject<HTMLInputElement> = createRef()

    public render(): ReactNode {
        return (
            <>
                <Modal overflow={true} backdrop="static" open={this.props.save.modal}>
                    <Modal.Header>
                        <h5>ذخیره پیش نویس</h5>
                        {
                            (this.props.save.status === 'validation')
                                ? <p className="fg-red">برای پیش نویس حتما یک نام انتخاب کنید</p>
                                : (this.props.save.status === 'duplicate')
                                    ? <p className="fg-red">یک پیش نویس دیگر با همین مشخصات ذخیره شده است نام دیگری انتخاب کنید</p>
                                    : <></>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        <Input ref={this.saveDraftTextField} placeholder="شناسه ذخیره پیش نویس"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup>
                            <Button onClick={()=>{dispatch(actions.modalSave(false))}} size="sm">بستن</Button>
                            <Button onClick={()=>this.saveDraft()} size="sm" appearance="primary" color="green">ذخیره</Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>

                <Modal overflow={true} backdrop="static" open={this.props.load.modal}>
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
                            <Button onClick={()=>this.loadDraftNote()} disabled={(this.props.load.selected === undefined)} size="sm" appearance="primary">
                                {
                                    (this.props.load.selected === undefined)
                                        ? "یکی را انتخاب کنید"
                                        : "بارگذاری " + this.props.load.selected
                                }
                            </Button>
                            {
                                (this.props.load.selected === undefined)
                                    ?<></>
                                    :<Button onClick={()=>this.removeDraftNote()} size="sm" appearance="primary" color="red">حذف پیش نویس</Button>
                            }
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>

                <Panel className="bg-light" shaded header={
                    <Stack justifyContent="space-between">
                        <h5>نوشته جدید</h5>
                            <ButtonGroup>
                                <Button onClick={()=>dispatch(actions.modalSave(true))} appearance="default">ذخیره پیش نویس</Button>
                                <Button onClick={()=>dispatch(actions.modalLoad(true))} appearance="default">بارگذاری پیش نویس</Button>
                                <Button appearance="primary" color='green'>انتشار نوشته</Button>
                            </ButtonGroup>
                    </Stack>
                }>
                    <Input value={this.props.note.title} onChange={(text)=>dispatch(actions.changeTitle(text))} style={{marginBottom:'20px'}} placeholder="عنوان نوشته"/>
                    <Editor />
                    <TagInput data={[]} value={this.props.note.tag} onChange={(text: string[]) => dispatch(actions.setTag((text === null) ? [] : text))} placeholder="کلمات کلیدی" style={{ marginTop: '20px' }} block trigger={"Enter"} />
                </Panel>
            </>
        )
    }

    private saveDraft(){
        const text = this.saveDraftTextField.current!.value;
        if (text === ""){
            dispatch(actions.modalSaveStatus('validation'));
            return;
        }
        if(localStorage.getItem(text) !== null){
            dispatch(actions.modalSaveStatus('duplicate'));
            return;
        }
        localStorage.setItem(text,JSON.stringify(this.props.note));
        dispatch(actions.modalSave(false));
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
        const data = localStorage.getItem(this.props.load.selected!)!;
        const note:Note = JSON.parse(data);
        const raw = buildRaw(note.content);
        dispatch(actions.changeContent(raw));
        dispatch(actions.setNote(note))
        dispatch(actions.modalLoad(false));
    }
    
    private removeDraftNote(){
        const {selected} = this.props.load;
        localStorage.removeItem(selected!);
        dispatch(actions.modalLoad(false));
    }
}

function mapStateToProps(reducer:any):Props {
    const state:State = reducer.addNoteReducer;
    return {
        note:state.note,
        save:{
            modal:state.draft.save.modal,
            status:state.draft.save.status
        },
        load:{
            modal:state.draft.load.modal,
            selected:state.draft.load.status
        }
    }
}

export default connect(mapStateToProps)(AddNoteEditor)
