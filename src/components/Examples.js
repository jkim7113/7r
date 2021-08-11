import React from 'react';

function Examples({partOfSpeech, example}){
    return (
        <li className={`examples ${partOfSpeech}`}>{example}</li>
    );
}

export {Examples}