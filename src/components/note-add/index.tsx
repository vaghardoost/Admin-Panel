import { Component, ReactNode } from "react";
import { FlexboxGrid } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import CategpryList from "./note.category";
import AddNoteEditor from "./note.editor"
import { dispatch } from "../../class/redux/store";
import { loadNote } from "./reducer";

interface Props {
    id?:string
}

export default class AddNote extends Component<Props>{

    constructor(props:Props){
        super(props);
        const {id} = this.props;
        if(id){
            dispatch(loadNote(id));
        }
    }

    public render(): ReactNode {
        return (
            <FlexboxGrid>
                <FlexboxGridItem colspan={16}>
                    <div className="around">
                        <AddNoteEditor/>
                    </div>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={8}>
                    <div className="around">
                        <CategpryList/>
                    </div>
                </FlexboxGridItem>
            </FlexboxGrid>
        )
    }
}