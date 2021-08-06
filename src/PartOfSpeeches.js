import React from 'react';

function PartOfSpeeches({partOfSpeech}) {
    return (
        <span className={`partOfSpeech ${partOfSpeech}`}>{partOfSpeech}</span>
    );

}

export {PartOfSpeeches};