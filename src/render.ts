import { Paragraph, Word } from "./model/note";

// pattern to json
// uses for edit and build json with editor
export function patternToObject(pattern:string):Paragraph[] {
  
  const result:Paragraph[] = []
  const paragraphList = pattern.split('\n');
  for (const paragraph of paragraphList) {
    result.push(inspect(paragraph));
  }

  function inspect(raw:string):Paragraph {
    const result:Paragraph = {text:[]}
    let pattern = raw;

    if (pattern.startsWith('*photo')) {
      result.type = 'photo';
      result.url = pattern.substring(
        pattern.indexOf('[') + 1,
        pattern.indexOf(']')
      );
      pattern = pattern.replace(`[${result.url}]`,'')
      pattern = pattern.replace('*photo','')
    }
    
    if (pattern.startsWith('*title')) {
      result.type = 'title';
      pattern = pattern.replace('*title','');
    }

    if (pattern.startsWith('*frame')) {
      result.type = 'frame';
      pattern = pattern.replace('*frame','');
    }

    const list = pattern.split(' ');
    let currentStyle:'bold'|'italic'|'italicBold'|undefined = undefined;
    let endCurrentStyle:'*'|'**'|'***' = "*";
    
    for (const pattern of list) {
      styleOfPattern(pattern);
      const finalWord = pattern.replaceAll(endCurrentStyle,'');
      
      if(finalWord.length > 0){
        result.text.push({
          content:pattern.replaceAll(endCurrentStyle,''),
          style:currentStyle
        })
      }

      if(pattern.endsWith(endCurrentStyle)){
        currentStyle = undefined;
      }
    }

    function styleOfPattern(pattern:string) {
      if (pattern.startsWith('*')) {
        currentStyle = 'bold'
        endCurrentStyle = '*'
      }
      if (pattern.startsWith('**')) {
        currentStyle = 'italic'
        endCurrentStyle = '**'
      }
      if (pattern.startsWith('***')) {
        currentStyle = 'italicBold'
        endCurrentStyle = '***'
      }
    }

    return result;
  }

  return result;
}

// json to pattern 
// uses for loacl saving and load json from server convert to pattern and edit
export function objectToPattern(list:Paragraph[]):string {
  let result = "";
  for (const content of list) {
    result = result + inspect(content) + "\n";
  }

  function inspect(content:Paragraph):string {
    let result = "";
    
    switch (content.type) {
      case "photo":
        result += '*photo ' + `[${content.url}]`
        break;
      case "frame":
        result += '*frame '
        break
      case "title":
        result += '*title '
        break
    }
    
    let currentStyle:string|undefined;

    for (const word of content.text) {
      result = result + " " + inspect(word)
    }

    function inspect(word:Word):string {
      let result = word.content;
      if(currentStyle !== word.style){
        currentStyle = word.style;
        switch (word.style) {
          case "bold":
            result = "*" + result
            break;
          case "italic":
            result = "**" + result
            break;
          case "italicBold":
            result = "***" + result
            break;
          default:
            result = result + "*"
        }
      }
      return result;
    }
    
    return result;
  }

  return result;
}
