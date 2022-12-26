import State from "../reducer/state";
import { Component, ReactNode } from "react"
import { connect } from "react-redux"
import { dispatch } from "../../../redux";
import { loadPhotoList,downloadPhoto } from "../reducer/actions";
import { Avatar, AvatarGroup, Button, FlexboxGrid, Panel, Stack } from "rsuite";
import { cdn } from "../../../config";
import { modalSave } from "../reducer";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";

class ListComponent extends Component<Props> {
  
  constructor(props:Props){
    super(props);
    dispatch(loadPhotoList());
  }

  render(): ReactNode {
    return(
      <Panel bordered className="around" header={
        <Stack justifyContent="space-between">
          <h5>عکس های ذخیره شده</h5>
          <Button onClick={()=>{this.openSave()}} appearance="primary">افزودن جدید</Button>
        </Stack>
      }>
          <FlexboxGrid justify="start">
            {
              this.props.list.map((value)=>
                <FlexboxGridItem colspan={4}>
                    <Avatar src={cdn + "/photo/demo/" + value} size="lg" circle onClick={()=>this.select(value)}/>
                </FlexboxGridItem>
              )
            }
          </FlexboxGrid>
      </Panel>
    )
  }

  private select(id:string) {
    dispatch(downloadPhoto(id))
  }

  private openSave(){
    dispatch(modalSave(true));
  }
}

interface Props {
  list:string[]
}

const mapStateToProps = (reducer:any):Props=>{
  const state:State = reducer.photoReducer;
  return {list:state.list};
}

export default connect(mapStateToProps)(ListComponent);
