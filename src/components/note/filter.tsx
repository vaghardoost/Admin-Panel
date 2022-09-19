import { Component, ReactNode } from "react"
import { connect } from "react-redux"
import { Button, Stack, Panel, Form, TagPicker, ButtonGroup, Input, TagInput, FlexboxGrid } from "rsuite"
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { dispatch } from "../../class/redux";
import { Filter, actions, State, query } from "./reducer"

interface Props {
    filter:Filter,
    category:{label:string,value:string}[],
    authors:{label:string,value:string}[],
}

class NoteFilter extends Component<Props> {
    public render(): ReactNode {
        const {Control,Group} = Form;
        return (
            <Panel collapsible shaded className="bg-light" header={<h5>فیلتر</h5>}>
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
                            <Button appearance="primary" onClick={()=>dispatch(actions.cleanFilter())}>پاک کردن فیلتر ها</Button>
                            <Button appearance="primary" onClick={()=>{dispatch(query(this.props.filter))}}>اعمال فیلتر ها</Button>
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
            { label:'فرهنگ وقردوست', value:'5546546' },
            { label:'رامین ابراهیمی', value:'2654568' },
            { label:'محمدجواد دونده', value:'1115799' },
        ],
        category:[]
    }
}

export default connect(mapStateToProps)(NoteFilter);