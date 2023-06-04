import { convertFromRaw, Editor, EditorState, RawDraftContentBlock, RawDraftContentState, RichUtils } from "draft-js"
import { useState } from "react"
import { RichText, RichWeight } from "../../../../model/note"
import { generate } from 'randomstring'
import { Button, Space } from "antd";

export default ({ richtext, onChange }: Props) => {
  const [state, setState] = useState<EditorState>(buildRaw());

  return <>
    <div className="editor around">
      <Space.Compact block>
        <Button block size="small" type="text" onClick={() => setState(RichUtils.toggleInlineStyle(state, 'BOLD'))}>برجسته</Button>
        <Button block size="small" type="text" onClick={() => setState(RichUtils.toggleInlineStyle(state, 'ITALIC'))}>کج</Button>
        <Button block size="small" type="text" onClick={() => setState(RichUtils.toggleInlineStyle(state, 'UNDERLINE'))}>زیر خط</Button>
        <Button block size="small" type="text" onClick={() => setState(RichUtils.toggleInlineStyle(state, 'STRIKETHROUGH'))}>وسط خط</Button>
      </Space.Compact>
      <div className="around">
        <Editor
          editorState={state}
          onChange={(state) => onEditorChange(state)}
          handleKeyCommand={(command, editorState) => handleKeyCommand(command, editorState)}
        />
      </div>
    </div>
  </>



  function onEditorChange(editorState: EditorState) {
    onChange(buildRich(editorState));
    setState(editorState);
  }

  function handleKeyCommand(command: string, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  function style(style: string) {
    setState(RichUtils.toggleInlineStyle(state, style))
  }

  function buildRaw(): EditorState {
    const raw: RawDraftContentState = {
      blocks: [],
      entityMap: {}
    }

    for (const { content } of richtext) {
      const block: RawDraftContentBlock = {
        text: "",
        key: generate({ length: 8, charset: '0123456789abcdef' }),
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: []
      }

      for (let i = 0; i < content.length; i++) {
        const { text, style } = content[i];
        if (!style || !text) {
          continue;
        }
        for (const item of style!.weight!) {
          block.inlineStyleRanges.push({
            offset: block.text.length,
            length: text.length,
            style: item,
          })
        }
        block.text += text;
      }

      raw.blocks.push(block);
    }

    const newState = EditorState.createWithContent(convertFromRaw(raw));
    return newState;
  }

  function buildRich(state: EditorState): RichText[] {
    const richTextList: RichText[] = [];
    const blockMap = state.getCurrentContent().getBlockMap();

    blockMap.forEach((block, key) => {
      const styles: StylesNote = JSON.parse((JSON.stringify(state.getBlockTree(key!).get(0))));
      const richText: RichText = { content: [] };

      for (const item of styles.leaves) {
        item.style = block!.getCharacterList().get(item.start)?.getStyle().toJS();
        richText.content.push({
          text: block!.getText()!.substring(item.start, item.end),
          style: { weight: item.style }
        })
      }

      richTextList.push(richText);
    });

    return richTextList;
  }

}

interface Props {
  richtext: RichText[]
  onChange: (richtext: RichText[]) => void
}


interface StylesNote {
  start: number,
  end: number,
  leaves: {
    start: number,
    end: number,
    style: RichWeight[]
  }[]
}
