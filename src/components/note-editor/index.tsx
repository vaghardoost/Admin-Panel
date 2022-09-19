import { Component, ReactNode } from "react";
import { Container, Content, FlexboxGrid, Header } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import CategpryList from "./note.category";
import AddNoteEditor from "./note.editor"
import { dispatch } from "../../class/redux";
import { loadNote } from "./reducer";

interface Props {
    id?:string
}

export default class AddNote extends Component<Props>{
    constructor(props:Props){
        super(props);
        if (props.id) dispatch(loadNote(props.id))
    }

    public render(): ReactNode {
        return (
            <Container>
                <Header>
                    <h4 className='around'>
                        {
                            (this.props.id)
                                ? "ویرایشگر نوشته"
                                : "افزودن نوشته"
                        }
                    </h4>
                </Header>
                <Content>
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
                </Content>
            </Container>
        )
    }
}