import { Component, CSSProperties, ReactNode } from "react"
import { Note, Paragraph, Word } from "./model/note"

interface Props {
    note:Note
}

export default class NoteViewer extends Component<Props>{
    public render(): ReactNode {
        return (
            <>
                <h3>{this.props.note.title}</h3>
                {
                    this.props.note.content.map((paragraph:Paragraph):ReactNode=>{
                        return ParagraphViewer({data:paragraph});
                    })
                }
            </>
        );
    }
}

function ParagraphViewer(props:{data:Paragraph}){

    const { words, type } = props.data;
    let result:ReactNode = <p> <WordViewer data={words}/> </p>;
    switch (type) {
        case "h1":
            result = <h1> <WordViewer data={words}/> </h1>
            break;
        case "h2":
            result = <h2> <WordViewer data={words}/> </h2>
            break;
        case "h3":
            result = <h3> <WordViewer data={words}/> </h3>
            break;
        case "h4":
            result = <h4> <WordViewer data={words}/> </h4>
            break;
        case "h5":
            result = <h5> <WordViewer data={words}/> </h5>
            break;
        case "h6":
            result = <h6> <WordViewer data={words}/> </h6>
            break;
        case "tip":
            result = <TipViewer>{<WordViewer data={words}/>}</TipViewer>
    }


    function WordViewer(props:{data:Word[]}) {
        const words = props.data;
        const list:any[]=[];
        for (const word of words) {
            const {text,bold,italic} = word;
            let data:any = text + " ";
            if (bold) data = <strong> {text + " "} </strong>
            if (italic) data = <em> {text + " "} </em>
            list.push(data);
        }
        return <>{list}</>
    }

    function TipViewer(props:any){
        const style:CSSProperties = {
            backgroundColor:"#aaaaaa",
            padding:"10px",
            margin:"10px",
            borderRadius:"5px",
        }
        return (
            <div style={style}>
                {props.children}
            </div>
        )
    }

    return <>{result}</>
}

