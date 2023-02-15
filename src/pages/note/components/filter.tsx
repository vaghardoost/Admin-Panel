import { Component, ReactNode } from "react"
import { connect } from "react-redux"
import { Button, Stack, Panel, Form, TagPicker, ButtonGroup, Input, TagInput } from "rsuite"
import { ItemDataType } from "rsuite/esm/@types/common";
import { categoryListBuilder } from "../../../other";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { queryAction, refreshServer } from "../reducer/action";
import { Filter, State } from "../reducer/state";

interface Props {
    filter:Filter,
    category:ItemDataType<string>[],
    authors:{label:string,value:string}[],
}

class NoteFilter extends Component<Props> {
    public render(): ReactNode {
        const {Control,Group} = Form;
        return (
            <Panel collapsible bordered className="bg-light" header={<h5>فیلتر</h5>}>
                <Form onChange={(data)=>this.formData(data)}>
                    <Group>
                        <Control block accepter={Input} value={this.props.filter.id ?? ""} className='around' name="id" placeholder="شناسه"/>
                        <Control block accepter={Input} value={this.props.filter.title ?? ""} className='around' name="title" placeholder="عنوان"/>
                    </Group>
                    <Control block value={this.props.filter.category ?? []} data={this.props.category} name='category' placeholder='دسته بندی' accepter={TagPicker} style={{margin:'10px'}}/>
                    <Control block value={this.props.filter.author ?? []} data={this.props.authors} name='author' placeholder='نویسنده' accepter={TagPicker} style={{margin:'10px'}}/>
                    <Control block value={this.props.filter.tag ?? []} name="tag" placeholder="کلمات کلیدی" accepter={TagInput} style={{margin:'10px'}} trigger={"Enter"} data={[]}/>
                    <Stack justifyContent="flex-end">
                        <ButtonGroup>
                            <Button appearance="primary" size="sm"  onClick={()=>dispatch(actions.cleanFilter())}>پاک کردن فیلتر ها</Button>
                            <Button appearance="primary" size="sm"  onClick={()=>{dispatch(queryAction(this.props.filter))}}>اعمال فیلتر ها</Button>
                            <Button appearance="primary" size="sm" color="red" onClick={()=>{dispatch(refreshServer())}}>رفع اشکال سرور</Button>
                        </ButtonGroup>
                    </Stack>
                </Form>
            </Panel>
        )
    }

    private formData(data:Record<string,any>){
        const filter:Record<string,any> = {};
        for (const key in data) {
            const value = data[key];
            if (value){
                filter[key] = value;
            }
        }
        dispatch(actions.setFilter(filter));
    }
}

const mapStateToProps = (reducer:any):Props =>{
    const state:State = reducer.noteReducer;
    return {
        filter:state.filter,
        authors:[
        ],
        category:categoryListBuilder(state.categoryList)
    }
}

export default connect(mapStateToProps)(NoteFilter);