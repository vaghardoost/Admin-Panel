import { Button, Drawer, Modal, Table } from "antd"
import { useEffect, useState } from "react"
import { dispatch } from "../../redux";
import { loadNamespace } from "../reducer/actions";
import { connect } from "react-redux";
import { State } from "../reducer/state";
import NamespaceModel from "../../model/namespace";
import { actions } from "../reducer";

interface Props {
  open: boolean
  list?: NamespaceModel[]
  select?: string
}

function Namespace({ list, open, select }: Props) {
  const [firstTime, setFirstTime] = useState<boolean>(true)
  const exists = sessionStorage.getItem('namespace') != null;

  useEffect(() => {
    if (firstTime) {
      if (!sessionStorage.getItem('namespace')) {
        dispatch(actions.openModal());
        dispatch(loadNamespace());
      }
      setFirstTime(false);
    }
  });


  return <>
    <Drawer
      closable={exists}
      onClose={() => dispatch(actions.closeModal())}
      placement="bottom"
      title="انتخاب فضای نام"
      width={1000}
      open={open}
      destroyOnClose
      footer={
        <>
          <Button
            disabled={!select}
            type="primary"
            onClick={() => {
              const ns = list?.find((value) => value.id == select!);
              sessionStorage.setItem('namespace', ns!.id);
              sessionStorage.setItem('index-datapack', ns?.datapack ?? '');
              dispatch(actions.closeModal());
              window.location.replace('/');
            }}>
            انتخاب
          </Button>
        </>
      }
    >
      <Table
        loading={!list}
        dataSource={
          list?.map(data => {
            return { key: data.id, id: data.id, name: data.name, include: data.include.map(inc => inc + " ") }
          })
        }
        columns={[
          { title: 'نام فضا', dataIndex: 'name', key: 'name' },
          { title: 'شناسه', dataIndex: 'id', key: 'id' },
          { title: 'امکانات', dataIndex: 'include', key: 'include' }
        ]}
        rowSelection={{
          type: 'radio',
          onSelect: (data) => {
            dispatch(actions.setSelect(data.id));
          },
          selectedRowKeys: select ? [select] : undefined
        }}
        pagination={false}
        caption="فضاهایی که شما در آن عضو هستید"
      />
    </Drawer>
  </>
}

const mapStateToProps = (reducer: any): Props => {
  const state: State = reducer.layoutReducer;
  return {
    list: state.namespace_modal.list,
    open: state.namespace_modal.open,
    select: state.namespace_modal.select
  }
}

export default connect(mapStateToProps)(Namespace)
