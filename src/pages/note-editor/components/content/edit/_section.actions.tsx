import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, FileDoneOutlined } from "@ant-design/icons"
import { dispatch } from "../../../../../redux"
import { actions } from "../../../reducer"
import { Button, Space } from "antd"

export const getActions = (index: number, length: number) => {
  return <Space.Compact>
    <Button
      onClick={() => dispatch(actions.removeSection({ index: index }))}
      icon={<DeleteOutlined />} />
    <Button
      onClick={() => dispatch(actions.resetQuick())}
      icon={<FileDoneOutlined />} />
    {
      (index !== 0)
        ?
        <Button
          onClick={() => dispatch(actions.moveSection({ dest: 'up', index: index }))}
          icon={<ArrowUpOutlined />} />
        : <></>
    }
    {
      (index !== length)
        ? <Button
          onClick={() => dispatch(actions.moveSection({ dest: 'down', index: index }))}
          icon={<ArrowDownOutlined />} />
        : <></>
    }
  </Space.Compact>

}