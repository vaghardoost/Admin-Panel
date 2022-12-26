import { Component, ReactNode } from "react";
import { Container, Content, FlexboxGrid, Header } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import NoteCategory from "./components/note.category";
import NoteEditor from "./components/note.editor"
import { dispatch } from "../../redux";
import { loadNote } from "./reducer/actions";
import SaveModal from "./components/modal.save";
import LoadModal from "./components/modal.load";
import ModalPhoto from "./components/modal.photo";
import ModalAlert from "./components/modal.alert";

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
            <>
                <SaveModal/>
                <LoadModal/>
                <ModalPhoto/>
                <ModalAlert/>
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
                                    <NoteEditor/>
                                </div>
                            </FlexboxGridItem>
                            <FlexboxGridItem colspan={8}>
                                <div className="around">
                                    <NoteCategory/>
                                </div>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                    </Content>
                </Container>
            </>
        )
    }
}