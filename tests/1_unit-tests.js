const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();
let text = '';
let solution = '';

const addHighlights = (text, ...phrases) => {
    let solution = text;
    phrases.forEach(phrase => {
        solution = solution.replace(phrase,'<span class="highlight">' + phrase + '</span>');
    });

    return solution;
}

const testData = [
    {
        text: 'Mangoes are my favorite fruit.',
        direction: 'ab',
        translation: 'Mangoes are my favourite fruit.',
        translated: [ 'favourite' ],
        highlighted: 'Mangoes are my <span class="highlight">favourite</span> fruit.'
    },
    {
        text: 'I ate yogurt for breakfast.',
        direction: 'ab',
        translation: 'I ate yoghurt for breakfast.',
        translated: [ 'yoghurt' ],
        highlighted: 'I ate <span class="highlight">yoghurt</span> for breakfast.'
    },
    {
        text: "We had a party at my friend's condo.",
        direction: 'ab',
        translation: "We had a party at my friend's flat.",
        translated: [ 'flat' ],
        highlighted: `We had a party at my friend's <span class="highlight">flat</span>.`
    },
    {
        text: 'Can you toss this in the trashcan for me?',
        direction: 'ab',
        translation: 'Can you toss this in the bin for me?',
        translated: [ 'bin' ],
        highlighted: 'Can you toss this in the <span class="highlight">bin</span> for me?'
    },
    {
        text: 'The parking lot was full.',
        direction: 'ab',
        translation: 'The car park was full.',
        translated: [ 'car park' ],
        highlighted: 'The <span class="highlight">car park</span> was full.'
    },
    {
        text: 'Like a high tech Rube Goldberg machine.',
        direction: 'ab',
        translation: 'Like a high tech Heath Robinson device.',
        translated: [ 'Heath Robinson device' ],
        highlighted: 'Like a high tech <span class="highlight">Heath Robinson device</span>.'
    },
    {
        text: 'To play hooky means to skip class or work.',
        direction: 'ab',
        translation: 'To bunk off means to skip class or work.',
        translated: [ 'bunk off' ],
        highlighted: 'To <span class="highlight">bunk off</span> means to skip class or work.'
    },
    {
        text: 'No Mr. Bond, I expect you to die.',
        direction: 'ab',
        translation: 'No Mr Bond, I expect you to die.',
        translated: [ 'Mr' ],
        highlighted: 'No <span class="highlight">Mr</span> Bond, I expect you to die.'
    },
    {
        text: 'Dr. Grosh will see you now.',
        direction: 'ab',
        translation: 'Dr Grosh will see you now.',
        translated: [ 'Dr' ],
        highlighted: '<span class="highlight">Dr</span> Grosh will see you now.'
    },
    {
        text: 'Lunch is at 12:15 today.',
        direction: 'ab',
        translation: 'Lunch is at 12.15 today.',
        translated: [ '12.15' ],
        highlighted: 'Lunch is at <span class="highlight">12.15</span> today.'
    },
    {
        text: 'We watched the footie match for a while.',
        direction: 'ba',
        translation: 'We watched the soccer match for a while.',
        translated: [ 'soccer' ],
        highlighted: 'We watched the <span class="highlight">soccer</span> match for a while.'
    },
    {
        text: 'Paracetamol takes up to an hour to work.',
        direction: 'ba',
        translation: 'Tylenol takes up to an hour to work.',
        translated: [ 'Tylenol' ],
        highlighted: '<span class="highlight">Tylenol</span> takes up to an hour to work.'
    },
    {
        text: 'First, caramelise the onions.',
        direction: 'ba',
        translation: 'First, caramelize the onions.',
        translated: [ 'caramelize' ],
        highlighted: 'First, <span class="highlight">caramelize</span> the onions.'
    },
    {
        text: 'I spent the bank holiday at the funfair.',
        direction: 'ba',
        translation: 'I spent the public holiday at the carnival.',
        translated: [ 'public holiday', 'carnival' ],
        highlighted: 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'
    },
    {
        text: 'I had a bicky then went to the chippy.',
        direction: 'ba',
        translation: 'I had a cookie then went to the fish-and-chip shop.',
        translated: [ 'cookie', 'fish-and-chip shop' ],
        highlighted: 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'
    },
    {
        text: "I've just got bits and bobs in my bum bag.",
        direction: 'ba',
        translation: `I've just got odds and ends in my fanny pack.`,
        translated: [ 'odds and ends', 'fanny pack' ],
        highlighted: `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
    },
    {
        text: 'The car boot sale at Boxted Airfield was called off.',
        direction: 'ba',
        translation: 'The swap meet at Boxted Airfield was called off.',
        translated: [ 'swap meet' ],
        highlighted: 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.'
    },
    {
        text: 'Have you met Mrs Kalyani?',
        direction: 'ba',
        translation: 'Have you met Mrs. Kalyani?',
        translated: [ 'Mrs.' ],
        highlighted: 'Have you met <span class="highlight">Mrs.</span> Kalyani?'
    },
    {
        text: "Prof Joyner of King's College, London.",
        direction: 'ba',
        translation: "Prof. Joyner of King's College, London.",
        translated: [ 'Prof.' ],
        highlighted: `<span class="highlight">Prof.</span> Joyner of King's College, London.`
    },
    {
        text: 'Tea time is usually around 4 or 4.30.',
        direction: 'ba',
        translation: 'Tea time is usually around 4 or 4:30.',
        translated: [ '4:30' ],
        highlighted: 'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
    }
];

suite('Unit Tests', () => {

    suite('Translation', () => {
        test("Translate \"Mangoes are my favorite fruit.\" to British English", () => {
            let translation = translator.translate("Mangoes are my favorite fruit.","ab");
            assert.equal(translation.text,"Mangoes are my favourite fruit.");
        });
        
        test("Translate \"I ate yogurt for breakfast.\" to British English", () => {
            let translation = translator.translate("I ate yogurt for breakfast.","ab");
            assert.equal(translation.text,"I ate yoghurt for breakfast.");
        });
        
        test("Translate \"We had a party at my friend's condo.\" to British English", () => {
            let translation = translator.translate("We had a party at my friend's condo.","ab");
            assert.equal(translation.text,"We had a party at my friend's flat.");
        });
        
        test("Translate \"Can you toss this in the trashcan for me?\" to British English", () => {
            let translation = translator.translate("Can you toss this in the trashcan for me?","ab");
            assert.equal(translation.text,"Can you toss this in the bin for me?");
        });
        
        test("Translate \"The parking lot was full.\" to British English", () => {
            let translation = translator.translate("The parking lot was full.","ab");
            assert.equal(translation.text,"The car park was full.");
        });
        
        test("Translate \"Like a high tech Rube Goldberg machine.\" to British English", () => {
            let translation = translator.translate("Like a high tech Rube Goldberg machine.","ab");
            assert.equal(translation.text,"Like a high tech Heath Robinson device.");
        });
        
        test("Translate \"To play hooky means to skip class or work.\" to British English", () => {
            let translation = translator.translate("To play hooky means to skip class or work.","ab");
            assert.equal(translation.text,"To bunk off means to skip class or work.");
        });
        
        test("Translate \"No Mr. Bond, I expect you to die.\" to British English", () => {
            let translation = translator.translate("No Mr. Bond, I expect you to die.","ab");
            assert.equal(translation.text,"No Mr Bond, I expect you to die.");
        });
        
        test("Translate \"Dr. Grosh will see you now.\" to British English", () => {
            let translation = translator.translate("Dr. Grosh will see you now.","ab");
            assert.equal(translation.text,"Dr Grosh will see you now.");
        });
        
        test("Translate \"Lunch is at 12:15 today.\" to British English", () => {
            let translation = translator.translate("Lunch is at 12:15 today.","ab");
            assert.equal(translation.text,"Lunch is at 12.15 today.");
        });
        
        test("Translate \"We watched the footie match for a while.\" to American English", () => {
            let translation = translator.translate("We watched the footie match for a while.","ba");
            assert.equal(translation.text,"We watched the soccer match for a while.");
        });
        
        test("Translate \"Paracetamol takes up to an hour to work.\" to American English", () => {
            let translation = translator.translate("Paracetamol takes up to an hour to work.","ba");
            assert.equal(translation.text,"Tylenol takes up to an hour to work.");
        });
        
        test("Translate \"First, caramelise the onions.\" to American English", () => {
            let translation = translator.translate("First, caramelise the onions.","ba");
            assert.equal(translation.text,"First, caramelize the onions.");
        });
        
        test("Translate \"I spent the bank holiday at the funfair.\" to American English", () => {
            let translation = translator.translate("I spent the bank holiday at the funfair.","ba");
            assert.equal(translation.text,"I spent the public holiday at the carnival.");
        });
        
        test("Translate \"I had a bicky then went to the chippy.\" to American English", () => {
            let translation = translator.translate("I had a bicky then went to the chippy.","ba");
            assert.equal(translation.text,"I had a cookie then went to the fish-and-chip shop.");
        });
        
        test("Translate \"I've just got bits and bobs in my bum bag.\" to American English", () => {
            let translation = translator.translate("I've just got bits and bobs in my bum bag.","ba");
            assert.equal(translation.text,"I've just got odds and ends in my fanny pack.");
        });
        
        test("Translate \"The car boot sale at Boxted Airfield was called off.\" to American English", () => {
            let translation = translator.translate("The car boot sale at Boxted Airfield was called off.","ba");
            assert.equal(translation.text,"The swap meet at Boxted Airfield was called off.");
        });
        
        test("Translate \"Have you met Mrs Kalyani?\" to American English", () => {
            let translation = translator.translate("Have you met Mrs Kalyani?","ba");
            assert.equal(translation.text,"Have you met Mrs. Kalyani?");
        });
        
        test("Translate \"Prof Joyner of King's College, London.\" to American English", () => {
            let translation = translator.translate("Prof Joyner of King's College, London.","ba");
            assert.equal(translation.text,"Prof. Joyner of King's College, London.");
        });
        
        test("Translate \"Tea time is usually around 4 or 4.30.\" to American English", () => {
            let translation = translator.translate("Tea time is usually around 4 or 4.30.","ba");
            assert.equal(translation.text,"Tea time is usually around 4 or 4:30.");
        });
    });

    suite('Highlighting', () => {
        test('Highlight translation in "Mangoes are my favorite fruit."', () => {
            let testCase = testData.find((val) => val.text === "Mangoes are my favorite fruit.");
            let translation = translator.translate(testCase.text,testCase.direction);
            let highlight = translator.highlightText(translation);
            assert.equal(highlight,testCase.highlighted);
        });

        test('Highlight translation in "I ate yogurt for breakfast."', () => {
            let testCase = testData.find((val) => val.text === "I ate yogurt for breakfast.");
            let translation = translator.translate(testCase.text,testCase.direction);
            let highlight = translator.highlightText(translation);
            assert.equal(highlight,testCase.highlighted);
        });

        test('Highlight translation in "We watched the footie match for a while."', () => {
            let testCase = testData.find((val) => val.text === "We watched the footie match for a while.");
            let translation = translator.translate(testCase.text,testCase.direction);
            let highlight = translator.highlightText(translation);
            assert.equal(highlight,testCase.highlighted);
        });

        test('Highlight translation in "Paracetamol takes up to an hour to work."', () => {
            let testCase = testData.find((val) => val.text === "Paracetamol takes up to an hour to work.");
            let translation = translator.translate(testCase.text,testCase.direction);
            let highlight = translator.highlightText(translation);
            assert.equal(highlight,testCase.highlighted);
        });
    });
    
});
