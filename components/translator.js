const { text } = require('body-parser');
const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

function searchDictionary(phrase, dict, reverse = false) {
    const reverseSearch = () => Object.keys(dict).find(key => dict[key].toLowerCase() === phrase.toLowerCase());
    const search = () => {
        let tranlation;
        Object.keys(dict).forEach((key) => {
            if (key.toLowerCase() === phrase.toLowerCase()) {
                tranlation = dict[key];
                return;
            }
        });
        return tranlation;
    }

    let tranlation = reverse ? reverseSearch() : search();
    if (tranlation !== undefined && dict === americanToBritishTitles) {
        tranlation = tranlation[0].toUpperCase() + tranlation.slice(1);
    }

    return tranlation;
}

function searchTranslations(phrases, dictionarys, direction) {
    if (phrases.length == 0) return [];

    let original = phrases[0];
    let tranlation;
    for(let {dict, reverse} of dictionarys) {
        let r = reverse === undefined ? false : reverse;
        let newTranslation = searchDictionary(original,dict,r);
        if (tranlation === undefined && newTranslation !== undefined) tranlation = newTranslation;
    }
    
    if (direction === 'ab') {
        if (/^(\d\d|\d)\:\d\d$/.test(original)) tranlation = original.split(':').join('.');
    } else {
        if (/^(\d\d|\d)\.\d\d$/.test(original)) tranlation = original.split('.').join(':');
    }

    if(tranlation !== undefined) {
        let uwords = phrases[0].split(' ');
        for (let val of uwords) {
            for (let i = 0; i < phrases.length; i++) {
                let line = phrases[i].split(' ');
                if (line.includes(val)) {
                    phrases.splice(i,1);
                    i--;
                }
            }
        }
    } else {
        phrases.splice(0,1);
    }

    let translated = searchTranslations(phrases, dictionarys, direction);
    if (tranlation !== undefined) {
        translated.unshift([original, tranlation]);
    }

    return translated;
}

function buildAllCombinations(text) {
    let arr = text.split(' ');
    let phrases = [];
    for(let csize = arr.length; csize > 0; csize--) {
        let i = 0;
        while(i + csize <= arr.length) {
            let phrase = [];
            for (let b = i; b < i + csize; b++) {
                phrase.push(arr[b]);
            }
            phrases.push(phrase.join(' '));
            i++;
        }
    }
    return phrases;
}

function assembleText(text,phrases,punctation) {
    let solution = text;
    let translated = [];
    phrases.forEach(translation => {
        solution = solution.replace(translation[0],translation[1]);
        translated.push(translation[1]);
    });
    solution += punctation;
    return { text: solution, translated};
}

class Translator {
    translate(_text, direction) {
        let text = String(_text);
        text = text.replace(/^\s+/, "");
        text = text.replace(/\s+$/, "");
        let punctation = text[text.length-1]; // spaces at end
        if (/[\.\?]/.test(punctation)) {
            text = text.slice(0,text.length-1);
        } else {
            punctation = '';
        }

        let dictionarys = [];
        if (direction === 'ab') {
            dictionarys.push({ dict: americanOnly });
            dictionarys.push({ dict: americanToBritishSpelling });
            dictionarys.push({ dict: americanToBritishTitles });
        } else if (direction === 'ba') {
            dictionarys.push({ dict: britishOnly });
            dictionarys.push({ dict: americanToBritishSpelling, reverse: true });
            dictionarys.push({ dict: americanToBritishTitles, reverse: true });
        } else {
            return 'error';
        }

        let phrases = buildAllCombinations(text);
        let translations = searchTranslations(phrases, dictionarys, direction);


        let translation = assembleText(text,translations,punctation);
        return translation;
    }

    highlightText({text, translated}) {
        let solution = text;
        translated.forEach(phrase => {
            solution = solution.replace(phrase, '<span class="highlight">' + phrase + '</span>');
        });
        return solution;
    }
}

module.exports = Translator;