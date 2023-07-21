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

export const getLinkType = (link?: string) => {
  if (!link || !link.startsWith("@")) {
    return ["url", link ?? ""];
  }
  const arr = link.split(/[/](.*)/s)

  switch (arr[0]) {
    case "@bottomsheet":
      return ["bottomsheet", arr[1]];
    case "@datapack":
      return ["datapack", arr[1]];
    case "@namespace":
      return ["namespace", arr[1]];
    default:
      return ["url", arr[0]];
  }
}