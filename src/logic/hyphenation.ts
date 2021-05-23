// import { hyphenate as hyphenateEn } from 'hyphen/en/index.js';
import { hyphenate as hyphenateDe } from 'hyphen/de/index.js';

const seperator = '%';

const hyphenOptions = {
    debug: false,
    hyphenChar: seperator,
    minWordLength: 1
};

// TODO replace numbers with fully written out numbers to count maybe so
// Covid-19 becomes Covid-neunzehn
export const countSyllables = async (line: string) => {
    if (!line) {
        return 0;
    }
    // console.log(await hyphenateDe(line, hyphenOptions));
    const rawHyphenated = await hyphenateDe(line, hyphenOptions);
    const cleaned = rawHyphenated.replaceAll(' ', seperator).replaceAll('-', seperator);
    const list = cleaned.split(seperator).filter((e: string) => !!e);
    return list.length;
}

// hyphenateEn('A certain king had a beautiful garden', hyphenOptions).then((result) => {
//     console.log(result);
// });

// hyphenateDe('Hier liegt Luke Langhans', hyphenOptions).then((result) => {
//     console.log(result);
// });