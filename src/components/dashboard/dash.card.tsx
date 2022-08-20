import { Component, ReactNode } from "react";
import { Panel } from "rsuite";

export default class DashCard extends Component<Properties,State>{
    public render(): ReactNode {
        return (
            <Panel className="bg-light" shaded style={{backgroundColor:"white",margin:"10px"}}>
                <h4 style={{textAlign:"center"}}>{this.props.title}</h4>
                <h3 style={{textAlign:"center"}}>{this.props.value}</h3>
            </Panel>
        )
    }
}

type Properties = {
    title:string,
    value:number
}

type State = {

}
