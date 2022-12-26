import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Container, Content, Header } from "rsuite";
import { dispatch } from "../../../../redux";
import { actions } from "../../reducer";
import { State } from "../../reducer/state";
import CodeViewComponent from "./code";
import EditTextComponent from "./editor";
import ViewerComponent from "./viewer";

interface Props{
    page:'edit'|'code'|'view'
}

class EditArea extends Component<Props> {
    public render(): React.ReactNode {
        return(
            <Container>
                <Header>
                    <ButtonGroup size="sm" style={{marginBottom:"20px"}}>
                        <Button appearance={(this.props.page === 'edit')?"primary":"default"} onClick={()=>{this.changePage('edit')}}>ویرایشگر</Button>
                        <Button appearance={(this.props.page === 'view')?"primary":"default"} onClick={()=>{this.changePage('view')}}>نمایش محتوا</Button>
                        <Button appearance={(this.props.page === 'code')?"primary":"default"} onClick={()=>{this.changePage('code')}}>قالب json</Button>
                    </ButtonGroup>
                </Header>
                <Content>
                    {
                        (this.props.page === 'edit')
                            ? <EditTextComponent/>
                            : (this.props.page === 'view')
                                ? <ViewerComponent/>
                                : <CodeViewComponent/>
                    }
                </Content>
            </Container>
        )
    }

    private changePage(page:'edit'|'code'|'view'){
        dispatch(actions.changePage(page))
    }
}

function mapStateToProps(reducer:any):Props {
    const state:State = reducer.addNoteReducer;
    return {
        page:state.page
    }
}

export default connect(mapStateToProps)(EditArea)