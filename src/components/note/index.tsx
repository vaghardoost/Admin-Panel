import { Component, ReactNode } from "react"
import { Button, Container, Content, FlexboxGrid, Footer, Header, Panel, Table,Input } from "rsuite"
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem"
import NoteTable from "./table"

export default class Notes extends Component{
    public render(): ReactNode {
        return (
            <Container>
                <Header>
                    <Panel className="bg-light around">
                    <div style={{float:"left"}}>
                            <Input/>
                        </div>
                        <div style={{float:"left"}}>
                            <Input/>
                        </div>
                        
                    </Panel>
                </Header>
                <Content>
                    <div className="around">
                        <NoteTable/>
                    </div>
                </Content>
                <Footer>
                    
                </Footer>
            </Container>
        )
    }
}