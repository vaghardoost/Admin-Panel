import React, { Component, ReactNode } from "react";
import { Button, ButtonGroup, ButtonToolbar, Panel, Input, Tag } from "rsuite";

export default class EditTextComponent extends Component<Properties,State>{

    private textField:React.RefObject<HTMLTextAreaElement> = React.createRef();

    constructor(props:Properties){
        super(props);
        this.state = {content : this.props.content}
    }

    public render(): ReactNode {
        return(
            <Panel bordered className="bg-light">
                <ButtonToolbar style={{marginBottom:"10px",marginTop:"10px"}}>
                    <ButtonGroup>
                        <Button onClick={()=>this.patternContent("**","start-end")} appearance="primary" color="green">برجسته</Button>
                        <Button onClick={()=>this.patternContent("*","start-end")} appearance="primary" color="green">کج</Button>
                        <Button onClick={()=>this.patternContent("***","start-end")} appearance="primary" color="green">برجسته و کج</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={()=>this.patternContent("#","append")} appearance="primary" color="green">h1</Button>
                        <Button onClick={()=>this.patternContent("##","append")} appearance="primary" color="green">h2</Button>
                        <Button onClick={()=>this.patternContent("###","append")} appearance="primary" color="green">h3</Button>
                        <Button onClick={()=>this.patternContent("####","append")} appearance="primary" color="green">h4</Button>
                        <Button onClick={()=>this.patternContent("#####","append")} appearance="primary" color="green">h5</Button>
                        <Button onClick={()=>this.patternContent("#######","append")} appearance="primary" color="green">h6</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button appearance="primary" color="green">کادر</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <Input
                    ref={this.textField}
                    onChange={(text)=>{
                        this.setState({content:text});
                        this.props.onChange(text);
                    }}
                    value={this.state.content} 
                    dir="rtl" 
                    as="textarea" 
                    rows={20}/>
            </Panel>
        )
    }


    private patternContent(sign:string,type:"start-end"|"start"|"append") {
        const start:number = this.textField.current?.selectionStart??0;
        const end:number = this.textField.current?.selectionEnd??0;
        const { content } = this.state;
        let result:string = "";

        switch(type){
            case "start":
                result = selectedTextStart();
                break;
            case "start-end":
                result = selectedTextStartEnd();
                break;
            case "append":
                result = append();
        }

        this.setState({content:result});
        this.props.onChange(result);

        function selectedTextStartEnd():string {
            return (start === end)
            ? content
            : content.slice(0,start) + sign + content.slice(start,end) + sign + content.slice(end)
        }

        function selectedTextStart():string {
            return (start === end)
            ? content
            : content.slice(0,start) + sign + content.slice(start)
        }

        function append(){
            return (start === 0 && end === 0)
            ? sign + " " + content
            : content + "\n" + sign + " "
        }
    }
}

interface Properties {
    content:string
    onChange:(text:string)=>void
}

interface State {
    content:string
}

