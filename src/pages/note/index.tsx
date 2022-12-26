import { Component, ReactNode } from "react"
import { Container, Content, Footer, Header } from "rsuite"
import NoteTable from "./components/table"
import NoteFilter from "./components/filter"
import { dispatch } from "../../redux";
import { categoryListAction, queryAction } from "./reducer/action";
import ModalNote from "./components/modal.note";
import ModalRemove from "./components/modal.remove";

export default class Notes extends Component{
    constructor(props:any){
        super(props);
        dispatch(categoryListAction());
        dispatch(queryAction({}));
    }

    public render(): ReactNode {
        return (
            <Container>
                <ModalNote/>
                <ModalRemove/>
                <Header>
                    <h4 className='around'>مشاهده ی نوشته ها</h4>
                </Header>
                <Content>
                    <Container>
                        <div className="around">
                            <NoteFilter/>
                            <div style={{height:'10px'}}/>
                            <NoteTable/>
                        </div>
                    </Container>
                </Content>
                <Footer>
                    
                </Footer>
            </Container>
        )
    }
}