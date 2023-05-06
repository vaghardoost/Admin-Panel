import { generate } from "randomstring";
import { RichSpan, RichText } from "../../../../../../model/note";

export default ({ richtext: { content } }: Props) => {
  return <p>
    {
      content.map((span) =>
        (span.text === "")
          ? <p style={{opacity:'0.3'}}>پاراگراف خالی</p>
          : <Build key={generate()} span={span} />
      )
    }
  </p>

  function Build({ span: { text, style } }: { span: RichSpan }) {
    let result = <>{text}</>

    if (style?.weight?.includes('BOLD')) result = <b><Get key={generate()} element={result} /></b>;
    if (style?.weight?.includes('ITALIC')) result = <i><Get key={generate()} element={result} /></i>;
    if (style?.weight?.includes('UNDERLINE')) result = <u><Get key={generate()} element={result} /></u>;
    if (style?.weight?.includes('STRIKETHROUGH')) result = <s><Get key={generate()} element={result} /></s>;

    return result;
  }

  function Get(props: { element: JSX.Element }) {
    return props.element;
  }

}

interface Props {
  richtext: RichText
}