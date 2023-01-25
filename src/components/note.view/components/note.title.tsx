import { Title } from "../../../model/note"

export const NoteComponentTitle = ({title}:Props) => {
  const TitleHeader = `${title.header}` as keyof JSX.IntrinsicElements;
  return <>
    <TitleHeader style={{marginBottom:'20px',marginTop:'20px'}}>
        {title.text}
    </TitleHeader>
  </>
}

interface Props {
  title:Title
}
