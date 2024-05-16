"use client"
export const questionStatus = ['not_visited', 'not_answered', 'answered', 'reviewed_not_answered', 'reviewed_and_answered'];

let answerColorObj: any = {
    'not_visited': 'spritegrey2',
    'not_answered': 'spritered2',
    'answered': 'spritegreen2',
    'reviewed_not_answered': 'spritepurple2',
    'reviewed_and_answered': 'spritepurpletick2'
}

export const handleAnswerToColor = (answer: string = 'not_visited') => {

    let colorClass = answerColorObj[answer];
    let textColor = (answer == 'not_visited' ? " text-black" : " text-white")

    return colorClass + textColor;
}


export const removeHTMLTagRegex =  /(<([^>]+)>)/gi;

export const optionNumberToChar:any = {
    1:'A',
    2:'B',
    3:'C',
    4:'D',
    5:'E',
    6:'F',
    7:'G',
    8:"H",
    9:'I',
    10:'J'
}