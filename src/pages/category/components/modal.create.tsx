import { Component, RefObject, createRef, ReactNode } from "react"
import { connect } from "react-redux"
import { Avatar, Button, ButtonGroup, FlexboxGrid, Input, Modal, Panel, Stack } from "rsuite"
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem"
import { cdn } from "../../../config"
import { Category } from "../../../model/category"
import File from "../../../model/file"
import { dispatch } from "../../../redux"
import { actions } from "../reducer"
import { addCat, loadPhoto, updateCat } from "../reducer/actions"
import { State } from "../reducer/state"

interface Props {
  show: boolean
  list: File[]
  selectedFile?: File
  message?: string
  parent?: Category
  update?: boolean
  selectedCategory?: Category
}

class CreateModal extends Component<Props> {

  private labelInput:RefObject<HTMLInputElement> = createRef();
  private descInput:RefObject<HTMLTextAreaElement> = createRef();
  private colorInput:RefObject<HTMLInputElement> = createRef();

  
  public componentDidUpdate(): void {
    if (this.props.update){
      this.labelInput.current!.value = this.props.selectedCategory!.label;
      this.descInput.current!.value = this.props.selectedCategory!.description;
      this.colorInput.current!.value = this.props.selectedCategory!.color ?? "";
    }
  }

  async componentDidMount(){
    await dispatch(loadPhoto());
  }
  
  public render(): ReactNode {
      return (
        <Modal size="lg" open={this.props.show}>
          <Modal.Header>
            <h5>{(this.props.update)?"ویرایش دسته بندی":"دسته بندی جدید"}</h5>
            <p style={{fontSize:"small",fontWeight:"bolder"}}> {this.props.message} </p>
          </Modal.Header>
          <Modal.Body>
            <h6 style={{marginBottom:'5px'}}>زیرشاخه:{this.props.parent?.label ?? "root"}</h6>
            <FlexboxGrid>
              <FlexboxGridItem colspan={16} style={{padding:'10px'}}>
                <Input style={{marginBottom:'5px'}} ref={this.labelInput} placeholder="عنوان دسته بندی" />
                <Input style={{marginBottom:'5px'}} ref={this.colorInput} placeholder="کد رنگ دسته بندی" />
                <Input style={{marginBottom:'5px'}} ref={this.descInput} rows={6} dir="rtl" as="textarea" placeholder="توضیحات" />
                
              </FlexboxGridItem>
              <FlexboxGridItem colspan={8} style={{padding:'10px'}}>
                <Stack justifyContent="center">
                {
                    (this.props.selectedFile)
                    ? <>
                        <img style={{width:"100%",maxHeight:'215px'}} src={cdn + "/photo/" + this.props.selectedFile!.id}/>
                    </>
                    : (this.props.update)
                      ? <img style={{width:"100%",maxHeight:'215px'}} src={cdn + "/photo/" + this.props.selectedCategory!.avatar}/>
                      : <h1 style={{marginTop:'75px',width:"100%"}}>بدون تصویر</h1>

                }
                </Stack>
              </FlexboxGridItem>
              <h6>تصاویر دخیره شده در مخزن فایل (ترجیحا از تصاویر با طول و عرض یکسان استفاده کنید)</h6>
              <FlexboxGridItem colspan={24} style={{padding:'25px'}}>
                {
                  this.props.list.map((file)=>{
                    return <Avatar style={{margin:'5px'}} onClick={()=>{dispatch(actions.modalCreateSelectPhoto(file))}} size="lg" circle src={cdn + "/photo/demo/" + file.id}/>
                  })
                }
              </FlexboxGridItem>
            </FlexboxGrid>
          </Modal.Body>

          <Modal.Footer>
            <ButtonGroup block style={{marginTop:'10px'}}>
              <Button onClick={()=>{dispatch(actions.modalCreate(false))}} appearance="primary">بستن</Button>
              <Button onClick={()=>this.submit()} appearance="primary">ذخیره</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      )
  }

  private async submit(){
      const label = this.labelInput.current!.value;
      const desc = this.descInput.current!.value;
      const color = this.colorInput.current!.value;
      if(label === ""){
        dispatch(actions.modalCreateMessage("نام دسته بندی را وارد کنید"))
        return;
      }
      if(desc === ""){
        dispatch(actions.modalCreateMessage("توضیحات دسته بندی الزامی است"))
        return;
      }
      const category:Category = {
        label: label,
        parent: this.props.parent?.id! ?? undefined,
        description: desc,
        avatar: this.props.selectedFile?.id,
        color: (color === '') ?  undefined : this.colorInput.current!.value
      }
      if (this.props.update) {
        await dispatch(updateCat({id:this.props.selectedCategory!.id!,category:category}))
      } else {
        await dispatch(addCat(category));
      }
      dispatch(actions.reset());
      dispatch(actions.modalCreate(false));
  }

}

const mapStateToProps = (reducer:any):Props=> {
  const state:State = reducer.categoryReducer;
  const parentCategoryOfSelect = state.list.map((cat)=>{
    if (cat.id === state.select?.parent)
    return cat
  })
  const parent = (state.modal.create.update)
    ? parentCategoryOfSelect[0]
    : state.select;
  return { 
    ...state.modal.create,
    parent:parent,
    selectedCategory:state.select
  }
}

export default connect(mapStateToProps)(CreateModal);
