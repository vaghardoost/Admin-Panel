import { useState } from "react";
import { connect } from "react-redux";
import { Avatar, Button, Card, Drawer, Input, Select, Space } from "antd";

import { State } from "../../redux/state";
import { AvatarCard, SectionName, SectionType } from "../../../../model/note";
import { getActions } from "./_section.actions"
import { cdn } from "../../../../config";

const AvatarCardComponent = ({ index, content, photos, onChange }: Props) => {

  const [open, setOpenDrawer] = useState<boolean>(false);
  const namespace = sessionStorage.getItem('namespace');
  const [state, setState] = useState<AvatarCard>({
    title: "",
    subtitle: "",
    avatar: "",
    ...content![index],
    type: SectionName.avatarCard,
  })

  const [type, setType] = useState<string>(state.link?.split('=>')[0] ?? 'url');
  const [link, setLink] = useState<string>(state.link?.split('=>')[1] ?? '');

  const changeTitle = (text: string) => {
    setState({ ...state, title: text })
    onChange?.({ ...state, title: text });
  }

  const changeSubtitle = (text: string) => {
    setState({ ...state, subtitle: text });
    onChange?.({ ...state, subtitle: text });
  }

  return <>
    <Drawer
      placement="left"
      open={open}
      closable={false}
      extra={
        <Space>
          <Button onClick={() => setOpenDrawer(false)}>بستن</Button>
        </Space>
      }
      title="انتخاب عکس">
      <Space direction="horizontal" wrap align="center" style={{ width: '100%' }}>
        {
          photos.map(file => (
            <Avatar
              onClick={() => {
                setState({ ...state, avatar: `${cdn}/${namespace}/photo/demo.${file}` });
                onChange?.({ ...state, avatar: `${cdn}/${namespace}/photo/demo.${file}` });
              }}
              size={100}
              shape="square"
              key={file}
              src={`${cdn}/${namespace}/photo/demo.${file}`} />
          ))
        }
      </Space>
    </Drawer>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      title="کارت آواتار"
      extra={getActions(index, content.length - 1)}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Avatar
          onClick={() => setOpenDrawer(true)}
          size={50}
          src={state.avatar} />

        <Input
          value={state.title}
          onChange={(e) => changeTitle(e.target.value)}
          placeholder="عنوان"
          allowClear />

        <Input.TextArea
          value={state.subtitle}
          onChange={(e) => changeSubtitle(e.target.value)}
          maxLength={140}
          rows={3}
          allowClear
          placeholder="محتوا" />
        <Space.Compact style={{ margin: '0 auto' }} block dir='ltr'>
          <Input
            value={link}
            onChange={(e) => {
              if (e.target.value === '') {
                setLink('');
                onChange?.({ ...state, link: undefined })
                setState({ ...state, link: undefined });
                return
              }
              setLink(e.target.value);
              onChange?.({ ...state, link: `${type}=>${e.target.value}` });
              setState({ ...state, link: `${type}=>${e.target.value}` })
            }}
            placeholder='شناسه' />
          <Select
            defaultValue={type}
            onChange={(e) => {
              setType(e);
              onChange?.({ ...state, link: `${e}=>${link}` });
              setState({ ...state, link: `${e}=>${link}` });
            }}
            options={[
              { value: 'url', label: 'لینک خارجی' },
              { value: 'bottomsheet', label: 'منو کشویی' },
              { value: 'datapack', label: 'صفحه دیگر' },
            ]}
          />
        </Space.Compact>
      </Space>
    </Card>
  </>
}

interface Props {
  index: number
  content: SectionType[]
  photos: string[]
  onChange?: (section: SectionType) => void
}

const mapStateToProps = (reducer: any) => {
  const { content, data }: State = reducer;
  return {
    content: content,
    photos: data.photoList
  };
}

export default connect(mapStateToProps)(AvatarCardComponent);

export const avatarCardInitState: AvatarCard = {
  type: SectionName.avatarCard,
  title: "",
  subtitle: "",
  avatar: ""
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  photos: string[]
  init?: AvatarCard
}

export function EditorAvatarCard({ photos, onChange, init }: EditorProps) {
  return <AvatarCardComponent index={0} content={[init ?? avatarCardInitState]} photos={photos} onChange={onChange} />
}
