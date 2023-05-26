import { ItemDataType } from "rsuite/esm/@types/common";
import { Category } from "./model/category";
import { TreeDataNode } from "antd";

interface SelectDataNode {
  label: string
  value?: string
  children: SelectDataNode[]
}

export function categoryTreeBuilder(categoryList: Category[]): SelectDataNode[] {

  const root: SelectDataNode = {
    label: "root",
    value: "",
    children: []
  }

  function nodeBuilder(item: SelectDataNode) {
    for (const cat of categoryList) {
      const node: SelectDataNode = {
        label: cat.label,
        value: cat.id,
        children: [],
      };

      let parent = cat.parent;
      if (!cat.parent) {
        parent = "";
      }

      if (parent === item.value) {
        nodeBuilder(node);
        item.children!.push(node);
      }

    }
  }
  nodeBuilder(root);
  return [root];
}

export function categoryListBuilder(categoryList: Category[]): TreeDataNode[] {
  const root: TreeDataNode = {
    title: "root",
    key: "",
    children: []
  }

  function nodeBuilder(item: TreeDataNode) {
    for (const cat of categoryList) {
      const node = {
        title: cat.label,
        key: cat.id!,
        children: [],
      };

      let parent = cat.parent;
      if (!cat.parent) {
        parent = "";
      }

      if (parent === item.key) {
        nodeBuilder(node);
        item.children!.push(node);
      }

    }
  }
  nodeBuilder(root);
  return [root];
}
