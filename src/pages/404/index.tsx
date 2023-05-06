import { Component, CSSProperties, ReactNode } from "react";

export default class NotFound extends Component {
    public render(): ReactNode {
        const style: CSSProperties = {
            textAlign:'center',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            height:'100vh'
        }
        return (
            <div style={style}>
                <h1>مسیر یافت نمی شود</h1>
                <p>شاید هنوز درست نشده🤔</p>
            </div>
        )
    }
}