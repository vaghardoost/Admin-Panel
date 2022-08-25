import { Component, CSSProperties, Fragment, ReactNode } from "react";
import { Panel } from "rsuite";
import noteMaker, { Note, Paragraph, Word } from "../../../class/render";

export default class ViewerComponent extends Component<Properties,State>{

    constructor(props:any){
        super(props);
        this.state = {
            content:noteMaker(
                this.props.title,
                this.props.tag,
                this.props.content
            )
        }
    }

    public render(): ReactNode {
        return (
            <Panel bordered dir="rtl" className="bg-light">
                <h3>{this.props.title}</h3>
                <JsonViewer data={this.state.content} />
            </Panel>
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


interface Properties{
    title:string
    content:string
    tag:string[]
}

interface State{
    content:Note
}
