import { Component, ReactNode } from "react";
import { Panel, Tree } from "rsuite";
import { ItemDataType } from "rsuite/esm/@types/common";

export default class AddCategoryCartFather extends Component{
    private categoryData:ItemDataType<string | number>[] = [
        {
            label:"جاوا",
            value:"1",
            children:[
                {label:"spring boot",value:"5"},
                {label:"vertx",value:"6"},
                {label:"quarkus",value:"7"},
            ]
        },
        {
            label:"node.js",
            value:"12",
            children:[
                {label:"express",value:"19"},
                {label:"nest.js",value:"20"},
            ]
        }
    ];
    public render(): ReactNode {
        return(
            <Panel className="bg-light" shaded header="فهرست دسته بندی ها">
                <Tree data={this.categoryData} defaultExpandAll virtualized/>
            </Panel>
        )
    }
}