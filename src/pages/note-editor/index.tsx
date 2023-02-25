import { Affix, Container, Content, FlexboxGrid, Header } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";

import { useParams } from "react-router-dom";
import { dispatch } from "../../redux";
import { actions } from "./reducer";
import { loadNote, loadPhoto } from "./reducer/actions";

import SaveModal from "./components/modal/modal.save";
import LoadModal from "./components/modal/modal.load";
import ModalAlert from "./components/modal/modal.alert";

import Metadata from "./components/metadata";
import Category from "./components/category";
import ContentNote from "./components/content"
import Catcard from "./components/catcard";
import ModalPhoto from "./components/modal/modal.photo";

interface Props {
    edit?: boolean
}

export default (props: Props) => {
    dispatch(loadPhoto());
    if (props.edit) {
        const { id } = useParams();
        dispatch(actions.setEditable(id!));
        dispatch(actions.alertModal({ open: true, message: 'درحال بارگذاری', title: 'ویرایش نوشته' }));
        dispatch(loadNote(id!)).then(() => {
            dispatch(actions.alertModal({ open: false }));
        });
    } else {
        dispatch(actions.reset());
    }
    return <>
        <SaveModal />
        <LoadModal />
        <ModalAlert />
        <ModalPhoto />
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
                            <Metadata />
                        </div>
                    </FlexboxGridItem>
                    <FlexboxGridItem colspan={8}>
                        <div className="around">
                            <Category />
                        </div>
                    </FlexboxGridItem>
                    <FlexboxGridItem colspan={16}>
                        <div className="around">
                            <ContentNote />
                        </div>
                    </FlexboxGridItem>
                    <FlexboxGridItem colspan={8}>
                        <Affix>
                            <Catcard/>
                        </Affix>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Content>
        </Container>
    </>

}