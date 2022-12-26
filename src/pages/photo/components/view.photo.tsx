import { Component, ReactNode } from "react"
import { connect } from "react-redux";
import { Button, Panel, Stack } from "rsuite";
import State from "../reducer/state";
import { Buffer } from "buffer";
import { dispatch } from "../../../redux";
import { modalDelete } from "../reducer"

class PhotoComponent extends Component<Props>{

  render():ReactNode {
    return (this.props.id)
      ? 
        <Panel bordered bodyFill className="around">
          <Stack justifyContent="space-around">
            <img style={{maxHeight:340}} src={`data:image/jpeg;base64,${this.props.content!}`}/>
          </Stack>
          <Stack className="around" justifyContent="space-between">
            <h6>حجم : {this.lengthImage(this.props.content!)} کیلوبایت</h6>
            <Button onClick={()=>this.modal()} color="red" appearance="primary">حذف</Button>
          </Stack>
        </Panel>
      : 
        <h3>یکی از فایل ها را انتخاب کنید</h3>
  }

  private modal() {
    dispatch(modalDelete(true));
  }

  private lengthImage(base64:string){
    return Math.floor((Buffer.from(base64,'base64').length) / 1024)
  }
}

interface Props {
  content?:string
  id?:string
}

const mapStateToProps = (reducer:any):Props => {
  const state:State = reducer.photoReducer;
  return {
    id:state.select?.id,
    content:state.select?.content
  };
}

export default connect(mapStateToProps)(PhotoComponent);
