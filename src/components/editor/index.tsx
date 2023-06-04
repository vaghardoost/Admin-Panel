import { Provider } from "react-redux";
import { store } from "./redux";
import View from "./components/view";
import Append from "./components/edit/editor.append";
import { SectionType } from "../../model/note";
import { Card } from "antd";

export default ({ change }: Props) => <>
  <Provider store={store} >
    <Card actions={[<Append />]}>
      <View change={(e) => change(e)} />
    </Card>
  </Provider>
</>

interface Props {
  change: (content: SectionType[]) => void
}
