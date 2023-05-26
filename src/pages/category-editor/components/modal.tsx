import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";
import { Button, Modal } from "antd";

const CategoryEditorModal = ({ message, open, title }: Props) => {

  return <>
    <Modal
      open={open}
      footer={<Button onClick={() => { dispatch(actions.dialogClose()) }}>بستن</Button>}
      title={title}>
      <p>{message}</p>
    </Modal>
  </>
}

interface Props {
  title: string,
  message: string
  open: boolean
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.categoryEditorReducer;
  return { ...state.dialog }
}

export default connect(mapStateToProps)(CategoryEditorModal);
