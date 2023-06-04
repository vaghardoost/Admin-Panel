import { Avatar, Card, Space } from "antd";
import { AvatarCard } from "../../../../model/note"

export default ({ avatarCard }: Props) => {
  return <>
    <Card>
      <Space style={{ width: '100%' }}>
        <Avatar src={avatarCard.avatar} size={100} />
        <Space direction="vertical">
          <h3>{avatarCard.title}</h3>
          <p>{avatarCard.subtitle}</p>
        </Space>
      </Space>
    </Card>
  </>
}

interface Props {
  avatarCard: AvatarCard
}
