import { Title } from "../../../../../model/note";;

export default ({ title }: Props) => {
  const TitleHeader = `${title.header}` as keyof JSX.IntrinsicElements;
  return <>
    <TitleHeader style={{ marginBottom: '20px', marginTop: '20px' }}>
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
