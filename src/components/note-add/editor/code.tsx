import { Component, ReactNode } from "react";
import { Panel } from "rsuite";
import noteMaker from "../../../class/render";

export default class CodeViewComponent extends Component<Properties,State>{

    public render(): ReactNode {
        return (
            <Panel bordered className="bg-light">
                <code>
                    {JSON.stringify(noteMaker(this.props.title,this.props.tag,this.props.content))}
                </code>
            </Panel>
        );
    }
}

interface Properties {
    title:string
    tag:string[]
    content:string
}

interface State {

}
