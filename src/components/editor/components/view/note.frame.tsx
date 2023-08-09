import NoteRich from "./note.rich"
import { Frame } from "../../../../model/note"
import { Space } from "antd"

export default ({ frame }: Props) => {
  return <>
    <div className="card around">
      {
        (frame.content.length === 0)
          ? <p style={{ opacity: '0.3' }}>پاراگراف خالی</p>
          :
          <div style={{ display: 'flex' }}>
            {
              (frame.status) ? <img
                width={50}
                height={50}
                style={{ margin: '10px' }}
                src={`${process.env.PUBLIC_URL}/images/ic_${frame.status}.png`}
              /> : <></>
            }

            <Space direction="vertical">
              <h2>{frame.title}</h2>
              {frame.content.map((rich) => <NoteRich richtext={rich} />)}
            </Space>
          </div>
      }
    </div>
  </>
}


interface Props {
  frame: Frame
}
