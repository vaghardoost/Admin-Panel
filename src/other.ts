import { ItemDataType } from "rsuite/esm/@types/common";
import { Category } from "./model/category";

export function categoryTreeBuilder(categoryList:Category[]):ItemDataType<string>[] {

    const root:ItemDataType<string> = {
        label:"root",
        value:"",
        children:[]
    }

    function nodeBuilder(item:ItemDataType<string>) {
        for (const cat of categoryList) {
            const node:ItemDataType<string> = {
                label:cat.label,
                value:cat.id, 
                children:[],
                parent:item
            };
            
            let parent = cat.parent;
            if(!cat.parent){
                parent = "";
            }
            
            if(parent === item.value){
                nodeBuilder(node);
                item.children!.push(node);
            }

        }
    } 
    nodeBuilder(root);
    return [root];
}

export function categoryListBuilder(categoryList:Category[]):ItemDataType<string>[]{
    const result:ItemDataType<string>[] = [{label:"root",value:""}];
    for (const cat of categoryList) {
        result.push({
            value:cat.id,
            label:cat.label
        })
    }
    return result;
}
