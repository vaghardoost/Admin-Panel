import { Component, ReactNode } from "react";
import { Container, Content, FlexboxGrid, Header } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { dispatch } from "../../class/redux";
import { loadCategoryList } from "./reducer";
import ListCategory from "./list";
import AddCategory from "./add";
import DeleteModal from "./modal/delete";
import UpdateModal from "./modal/update";

export default class Category extends Component{

    constructor(props:any){
        super(props);
        dispatch(loadCategoryList());
    }

    public render(): ReactNode {
        return (
            <>
                <DeleteModal/>
                <UpdateModal/>
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
                                    <AddCategory/>
                                </div>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                    </Content>
                </Container>
            </>
        )
    }
}