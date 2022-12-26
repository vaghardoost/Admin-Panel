import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, ButtonToolbar, Input } from "rsuite";
import { dispatch } from "../../../../redux"
import { actions } from "../../reducer";
import { State } from "../../reducer/state";

interface Props {
    content:string
}

class EditTextComponent extends Component<Props>{

    private textField:React.RefObject<HTMLTextAreaElement> = React.createRef();

    public render(): ReactNode {
        return(
            <>
            <ButtonToolbar style={{marginBottom:"10px",marginTop:"10px"}}>
                <ButtonGroup style={{marginLeft:'10px'}}>
                    <Button size="sm" onClick={()=>this.patternContent("*","start-end")} appearance="primary">برجسته</Button>
                    <Button size="sm" onClick={()=>this.patternContent("**","start-end")} appearance="primary">کج</Button>
                    <Button size="sm" onClick={()=>this.patternContent("***","start-end")} appearance="primary">برجسته و کج</Button>
                </ButtonGroup>
                <ButtonGroup style={{marginLeft:'10px'}}>
                    <Button size="sm" onClick={()=>this.patternContent("*title ","append")} appearance="primary">تیتر</Button>
                    <Button size="sm" onClick={()=>this.patternContent('*frame ','append')} appearance="primary">کادر</Button>
                    <Button size="sm" onClick={()=>dispatch(actions.modalphoto(true))} appearance="primary">تصویر</Button>
                </ButtonGroup>
            </ButtonToolbar>
            <Input
                ref={this.textField}
                onChange={(text)=>{
                    dispatch(actions.changeContent(text));
                }}
                value={this.props.content} 
                dir="rtl" 
                as="textarea" 
                rows={20}/>
            </>
        )
    }


    private patternContent(sign:string,type:"start-end"|"start"|"append") {
        const start:number = this.textField.current?.selectionStart??0;
        const end:number = this.textField.current?.selectionEnd??0;
        const { content } = this.props;
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

        dispatch(actions.changeContent(result));

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

function mapStateToProps(reducer:any):Props{
    const state:State = reducer.addNoteReducer;
    return {
        content:state.raw
    }
}

export default connect(mapStateToProps)(EditTextComponent)