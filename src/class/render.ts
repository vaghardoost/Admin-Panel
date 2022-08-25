export default function noteMaker(title:string,tag:string[],raw:string):Note {
    const note:Note = { title:title, tag:tag, content:[] };
    const paragraphList = raw.split("\n");
    
    for (const rawParagraph of paragraphList) {
        const wordList = rawParagraph.split(" ");
        const paragraph = analysisParagraph(wordList[0]);
        
        for (let i = 0; i < wordList.length; i++) {
            if(paragraph.type !== "caption" && i === 0) continue;
            const wordRaw = wordList[i];
            const word:Word = analysisWord(wordRaw);
            paragraph.words.push(word);
        }
        note.content.push(paragraph);
    }

    function analysisParagraph(content:string):Paragraph {
        const result:Paragraph = { type:"caption", words:[] }; 
        checkHeader();
        checkTip();

        function checkTip() {
            if(content === "?" || content === "؟") result.type = "tip";
        }

        function checkHeader() {
            switch (content) {
                case "#":
                    result.type = "h1";
                    break;
                case "##":
                    result.type = "h2";
                    break;
                case "###":
                    result.type = "h3";
                    break;
                case "####":
                    result.type = "h4";
                    break;
                case "#####":
                    result.type = "h5";
                    break;
                case "######":
                    result.type = "h6";
            }
        }

        return result;
    }

    function analysisWord(content:string):Word {
        const word:Word = {text:""}
        if(content.startsWith("***") && content.endsWith("***")){
            word.italic = true;
            word.bold = true;
            content = content.substring(3,(content.length) -3)
        }
        else if(content.startsWith("**") && content.endsWith("**")) {
            word.bold = true;
            delete word.italic;
            content = content.substring(2,(content.length) -2)
        }
        else if(content.startsWith("*") && content.endsWith("*")) {
            word.italic = true;
            content = content.substring(1,(content.length) -1)
        }
        word.text = content;
        return word;
    }

    return note;
}

export interface Note {
    title:string
    tag:string[]
    content:Paragraph[]
}

export interface Paragraph {
    type:"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"tip"|"caption"
    words:Word[]
}

export interface Word {
    text:string,
    bold?:boolean,
    italic?:boolean,
}
