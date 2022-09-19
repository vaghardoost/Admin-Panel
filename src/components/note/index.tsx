import { Component, ReactNode } from "react"
import { Container, Content, Footer, Header } from "rsuite"
import NoteTable from "./table"
import NoteFilter from "./filter"
export default class Notes extends Component{
    public render(): ReactNode {
        return (
            <Container>
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