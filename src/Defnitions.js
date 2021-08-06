import React from 'react';

function Definitions({definition,partOfSpeech}) {
    return(
    <li className={`definitions ${partOfSpeech}`}>{definition}</li>
    );
}

export {Definitions}