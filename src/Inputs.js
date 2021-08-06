import React from 'react';
import './Inputs.css'

function Inputs() {
    return(
        <div className='cards'>
        <div className='inputCardData'>
            <p className='announcement'>Type the word to search</p>
            <form>
                <input autoComplete='off' id='textBox' type='text' size='30'></input>
            </form>
            <p className='errorMsg'>No words found</p>
        </div>
        </div>
    );
}

export {Inputs};