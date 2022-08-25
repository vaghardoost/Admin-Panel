import React, { Component } from "react";
import { Button, ButtonGroup, Container, Content, Header } from "rsuite";
import CodeViewComponent from "./code";
import EditTextComponent from "./editor";
import ViewerComponent from "./viewer";

export default class Editor extends Component<Properties,State> {

    private editText:React.RefObject<EditTextComponent> = React.createRef();

    constructor(props:any){
        super(props);
        this.state = {
            content : this.props.content ?? "",
            page:<EditTextComponent onChange={(text)=>{this.setState({content:text})}} content={this.props.content ?? ""} ref={this.editText}/>,
            index:0
        }
    }

    public render(): React.ReactNode {
        return(
            <Container>
                <Header>
                    <ButtonGroup style={{marginBottom:"20px"}}>
                        <Button appearance={(this.state.index === 0)?"primary":"ghost"} onClick={()=>{this.changePage(0)}}>ویرایشگر</Button>
                        <Button appearance={(this.state.index === 1)?"primary":"ghost"} onClick={()=>{this.changePage(1)}}>نمایش محتوا</Button>
                        <Button appearance={(this.state.index === 2)?"primary":"ghost"} onClick={()=>{this.changePage(2)}}>قالب json</Button>
                    </ButtonGroup>
                </Header>
                <Content> {this.state.page} </Content>
            </Container>
        )
    }

    private changePage(index:number){
        const pages = [
            <EditTextComponent onChange={(text)=>{this.setState({content:text})}} content={this.state.content} ref={this.editText}/>,
            <ViewerComponent title="" tag={[]} content={this.state.content}/>,
            <CodeViewComponent title="" tag={[]} content={this.state.content}/>
        ];
        this.setState({
            page:pages[index],
            index:index
        })
    }
}

interface Properties{
    content?:string
}

interface State{
    content:string
    page:React.ReactNode
    index:number
}
