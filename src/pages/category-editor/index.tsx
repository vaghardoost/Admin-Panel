import { Container, Content, FlexboxGrid, Header } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import CategoryAvatar from "./components/avatar";
import CategoryFields from "./components/fields";
import CategoryDemo from "./components/demo";
import CategoryEditorModal from "./components/modal";
import { dispatch } from "../../redux";
import { loadCategory, loadPhoto } from "./reducer/actions";
import { useParams } from "react-router-dom";
import { actions } from "./reducer";

export default (props: Props) => {
    dispatch(loadPhoto());
    const { id } = useParams();

    if (props.edit) {
        dispatch(actions.setEditable(id!));
        dispatch(actions.dialog({ message: 'درحال بارگذاری', title: 'ویرایش دسته بندی' }));
        dispatch(loadCategory(id!)).then(async () => {
            dispatch(actions.dialogClose());
        });
    } else {
        dispatch(actions.reset());
        if (id) {
            dispatch(actions.setParent(id!));
        }
    }

    return <>
        <CategoryEditorModal />
        <Container>
            <Header>
                <h4 className='around'>
                    {
                        (props.edit)
                            ? "ویرایشگر دسته بندی"
                            : "افزودن دسته بندی"
                    }
                </h4>
            </Header>
            <Content>
                <FlexboxGrid>
                    <FlexboxGridItem colspan={12}>
                        <CategoryFields />
                        <CategoryAvatar />
                    </FlexboxGridItem>
                    <FlexboxGridItem className="relative" colspan={12}>
                        <div className='fixed'>
                            <CategoryDemo />
                        </div>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Content>
        </Container>

    </>
}

interface Props {
    edit?: boolean
}
