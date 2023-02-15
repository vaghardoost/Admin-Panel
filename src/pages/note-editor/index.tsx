import { Container, Content, FlexboxGrid, Header } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import NoteCategory from "./components/note.category";
import NoteEditor from "./components/note.editor"
import SaveModal from "./components/modal/modal.save";
import LoadModal from "./components/modal/modal.load";
import ModalAlert from "./components/modal/modal.alert";
import { useParams } from "react-router-dom";
import { dispatch } from "../../redux";
import { actions } from "./reducer";
import { loadNote, loadPhoto } from "./reducer/actions"

interface Props {
    edit?:boolean
}

export default (props:Props) => {
    dispatch(loadPhoto());
    if (props.edit) {
        const { id } = useParams();
        dispatch(actions.setEditable(id!));
        dispatch(actions.alertModal({open:true,message:'درحال بارگذاری',title:'ویرایش نوشته'}));
        dispatch(loadNote(id!)).then(()=> {
            dispatch(actions.alertModal({open:false}));
        });
    } else {
        dispatch(actions.reset());
    }
    return <>
        <SaveModal/>
        <LoadModal/>
        <ModalAlert/>
        <Container>
            <Header>
                <h4 className='around'>
                    {
                        (props.edit)
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

}