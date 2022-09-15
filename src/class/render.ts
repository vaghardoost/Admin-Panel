export function noteMaker(raw:string):Paragraph[] {
    const result:Paragraph[] = [];
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
        result.push(paragraph);
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

    return result;
}

export function buildRaw(paragraph:Paragraph[]):string {
    let result = "";
    
    for (const para of paragraph) {
        const rawPara = paragraphAnalysis(para);
        result += rawPara +"\n";
    }

    function paragraphAnalysis(para:Paragraph):string{
        const {type,words} = para;
        let result = "";
        switch (type) {
            case "caption":
                result = ""
                break;
            case "tip":
                result = "?"
                break;
            case "h1":
                result = "#"
                break;
            case "h2":
                result = "##"
                break;
            case "h3":
                result = "###"
                break;
            case "h4":
                result = "####"
                break;
            case "h5":
                result = "#####"
                break;
            case "h6":
                result = "######"
                break;
        }

        for (const word of words) {
            const rawWord = wordAnalysis(word);
            result += " " + rawWord 
        }

        return result;
    }

    function wordAnalysis(word:Word):string {
        const {text,bold,italic} = word;
        if (bold && italic) {
            return "***"+text+"***"
        } else if(bold) {
            return "**"+text+"**"
        } else if(italic) {
            return "*"+text+"*"
        }
        return text;
    }

    return result;
}

export interface Note {
    title:string
    category:string
    tag:any[]
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
