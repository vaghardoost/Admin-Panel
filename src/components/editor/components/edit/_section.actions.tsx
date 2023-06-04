import { Button, Space } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, FileDoneOutlined } from "@ant-design/icons"
import { actions, dispatch } from "../../redux"

export const getActions = (index: number, length: number) => {
  return <Space.Compact>
    <Button
      onClick={() => dispatch(actions.deleteSection(index))}
      icon={<DeleteOutlined />} />
    <Button
      onClick={() => dispatch(actions.closeEditSection())}
      icon={<FileDoneOutlined />} />
    {
      (index !== 0)
        ?
        <Button
          onClick={() => dispatch(actions.moveSectionUp(index))}
          icon={<ArrowUpOutlined />} />
        : <></>
    }
    {
      (index !== length)
        ? <Button
          onClick={() => dispatch(actions.moveSectionDown(index))}
          icon={<ArrowDownOutlined />} />
        : <></>
    }
  </Space.Compact>

}