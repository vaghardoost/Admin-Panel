import { Title } from "../../../../model/note"

export default ({ title }: Props) => {
  const TitleHeader = `${title.header}` as keyof JSX.IntrinsicElements;
  return <>
    <TitleHeader align={(title.align == "start") ? "right" : (title.align == "center") ? "center" : "left"} style={{ marginBottom: '20px', marginTop: '20px' }}>
      {
        (title.text === '')
          ? <p style={{ opacity: '0.3' }}>عنوان نوشته نشده</p>
          : title.text
      }
    </TitleHeader>
  </>
}

interface Props {
  title: Title
}
