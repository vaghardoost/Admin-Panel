import { connect } from "react-redux";
import { Input, Card } from 'antd';


import { getActions } from "./_section.actions";
import { Namespace, SectionName, SectionType } from "../../../../model/note"
import { State } from "../../redux/state";
import { useState } from "react";


const NamespaceComponent = ({ content, index, onChange }: Props) => {

  const [state, setState] = useState<Namespace>({
    namespace: "",
    ...content![index],
    type: SectionName.namespace,
  })

  return <>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      extra={getActions(index, content!.length - 1)}
      title="فضای نام">
      <Input
        value={state.namespace}
        dir='ltr'
        placeholder="شناسه فضای نام"
        onChange={(text) => change(text.target.value)} />
    </Card>
  </>

  function change(text: string) {
    setState({ ...state, namespace: text })
    onChange?.({ ...state, namespace: text });
  }

}

interface Props {
  content: SectionType[]
  index: number
  onChange?: (section: SectionType) => void
}

function mapStateToProps(reducer: any) {
  const state: State = reducer;
  return {
    content: state.content
  }
}

export default connect(mapStateToProps)(NamespaceComponent)

export const namespaceInitState: Namespace = {
  type: SectionName.namespace,
  namespace: ""
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  init?: Namespace
}

export function EditorNamespace({ onChange, init }: EditorProps) {
  return <NamespaceComponent onChange={onChange} index={0} content={[init ?? namespaceInitState]} />
}
