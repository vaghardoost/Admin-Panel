import { Component, CSSProperties, Fragment, ReactNode } from "react";
import { connect } from "react-redux";
import { Panel } from "rsuite";
import { Note, Paragraph, Word,noteMaker } from "../../../class/render";

interface Props{
    note:Note
}

class ViewerComponent extends Component<Props>{

    public render(): ReactNode {
        return (
            <>
                <h3>{this.props.note.title}</h3>
                <JsonViewer data={this.props.note} />
            </>
        )
    }

}

function JsonViewer(props:{data:Note}) {
    const paragraphList = props.data.content;
    const result:ReactNode[] = [];
    for (const paragraph of paragraphList) {
        result.push(<ParagraphView data={paragraph}/>)
    }
    return <Fragment>{result}</Fragment>;
}

function ParagraphView(props:{data:Paragraph}){
    const { words, type } = props.data;
    let result:ReactNode = <p> <WordView data={words}/> </p>;
    switch (type) {
        case "h1":
            result = <h1> <WordView data={words}/> </h1>
            break;
        case "h2":
            result = <h2> <WordView data={words}/> </h2>
            break;
        case "h3":
            result = <h3> <WordView data={words}/> </h3>
            break;
        case "h4":
            result = <h4> <WordView data={words}/> </h4>
            break;
        case "h5":
            result = <h5> <WordView data={words}/> </h5>
            break;
        case "h6":
            result = <h6> <WordView data={words}/> </h6>
            break;
        case "tip":
            result = <TipView>{<WordView data={words}/>}</TipView>
    }

    return <Fragment>{result}</Fragment>
}

function TipView(props:any){
    const style:CSSProperties = {
        backgroundColor:"#aaaaaa",
        padding:"10px",
        margin:"10px",
        borderRadius:"5px",
    }
    return (
        <Fragment>
            <div style={style}>
                {props.children}
            </div>
        </Fragment>
    )

}

function WordView(props:{data:Word[]}) {
    const words = props.data;
    const list:any[]=[];
    for (const word of words) {
        const {text,bold,italic} = word;
        let data:any = text + " ";
        if (bold) data = <strong> {text + " "} </strong>
        if (italic) data = <em> {text + " "} </em>
        list.push(data);
    }
    return <Fragment>{list}</Fragment>
}

function mapStateToProps(reducer:any):Props {
    const state = reducer.addNoteReducer;
    return {
        note:state.note
    }
}
export default connect(mapStateToProps)(ViewerComponent)