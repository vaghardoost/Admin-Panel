import { Component, ReactNode } from "react";
import { Container, Content, FlexboxGrid, Header } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { dispatch } from "../../redux";
import { loadCatList } from "./reducer/actions"
import ListCategory from "./components/list";
import SelectedCategory from "./components/select";
import DeleteModal from "./components/modal.delete";
import CreateModal from "./components/modal.create";

export default class Category extends Component{

    constructor(props:any){
        super(props);
        dispatch(loadCatList());
    }

    public render(): ReactNode {
        return (
            <>
                <DeleteModal/>
                <CreateModal/>
                <Container>
                    <Header>
                        <h4 className="around">مدیریت دسته بندی ها</h4>
                    </Header>
                    <Content>
                        <FlexboxGrid>
                            <FlexboxGridItem colspan={16}>
                                <div className="around">
                                    <ListCategory/>
                                </div>
                            </FlexboxGridItem>
                            <FlexboxGridItem colspan={8}>
                                <div className="around">
                                    <SelectedCategory/>
                                </div>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                    </Content>
                </Container>
            </>
        )
    }
}