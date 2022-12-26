import { Component, ReactNode } from "react";
import { FlexboxGrid } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import ListComponent from "./components/list.photo";
import ModalDeletePhoto from "./components/modal.delete.photo";
import ModalSavePhoto from "./components/modal.save.photo";
import PhotoComponent from "./components/view.photo";


export default class Photo extends Component {
  render(): ReactNode {
    return (
      <>
        <ModalDeletePhoto/>
        <ModalSavePhoto/>
        <FlexboxGrid justify="center">
          <FlexboxGridItem colspan={12}>
            <ListComponent/>
          </FlexboxGridItem>
          <FlexboxGridItem colspan={12}>
            <PhotoComponent/>
          </FlexboxGridItem>
        </FlexboxGrid>
      </>
    )
  }
}

