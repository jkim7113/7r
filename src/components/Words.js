import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { PartOfSpeeches } from './PartOfSpeeches.js';
import { Definitions } from './Defnitions.js';
import { Examples } from './Examples.js';
import './Words.css';

export default function Denied() {
  return (
    <div className='cards'>
        <div className='inputCardData'>
        <p className='announcement'>Access has been denied</p>
        </div>
      </div>
  );
}

function Words({history, match, location}){
    
    useEffect(()=>{

      var partOfSpeechesArray = Array.prototype.slice.call(document.querySelectorAll('.partOfSpeech'));
    
        partOfSpeechesArray.map((word)=>{
          word.addEventListener('click',()=>{
    
            var allWordDefs= document.querySelectorAll('.definitions');
            var allWordClasses = document.querySelectorAll('.partOfSpeech');
            var allWordExamples = document.querySelectorAll('.examples');
    
            for(var i=0;i<allWordDefs.length;i++){
              allWordDefs[i].style.color = '#9baec8';
            }
            for(var i=0;i<allWordClasses.length;i++){
              allWordClasses[i].style.color = '#9baec8';
            }
            for(var i=0;i<allWordExamples.length;i++){
              allWordExamples[i].style.color = '#9baec8';
            }
    
            var wordClass = word.classList[1];
            var wordDefs = document.querySelectorAll(`.${wordClass}`); 
            for(var i=0;i<wordDefs.length;i++){
              wordDefs[i].style.color = 'white';
            }
            
          });
        });
    },[]);

    var sessionWord = window.sessionStorage.getItem('word');
    var sessionWordInfo = JSON.parse(window.sessionStorage.getItem('wordInfo'));

    if(location.state !== undefined){//검색해서 들어왔으면

    const { word }  = match.params;
    const { wordInfo } = location.state;
    
    if(sessionWord !== null){//세션에 뭔가있다면
      window.sessionStorage.clear();
      window.sessionStorage.setItem('word',word);
      window.sessionStorage.setItem('wordInfo',JSON.stringify(wordInfo));
    } else {//세션에 뭐가 없다면(첫번째)
      window.sessionStorage.setItem('word',word);
      window.sessionStorage.setItem('wordInfo',JSON.stringify(wordInfo));
    }

    sessionWord = window.sessionStorage.getItem('word');
    sessionWordInfo = JSON.parse(window.sessionStorage.getItem('wordInfo'));
    
    return(//출력
    <div className='words'>
        <div className='wordCardData'>
        <p className='word'>{sessionWord}</p>
        {sessionWordInfo.map((currentWord,index)=>(
          <span key ={index}>
            <PartOfSpeeches partOfSpeech={currentWord.partOfSpeech}/>     
            <span className='divider'>{(index < (sessionWordInfo.length-1))?(' | '):('')}</span>
          </span>  
        )
        )
        }
        <ul>
            {
              sessionWordInfo.map((currentWord)=>(     
                currentWord.definitions.map((currentDef,index)=>(
                 <Definitions key={index} partOfSpeech={currentWord.partOfSpeech} definition={currentDef.definition}/>
              ))
              ))
            }
        </ul>
        <ul>
          {
            sessionWordInfo.map((currentWord)=>(  
              currentWord.definitions.map((currentEx,index)=>(
               (currentEx.example)?(<Examples key={index} partOfSpeech={currentWord.partOfSpeech} example={currentEx.example}/>):(<li key={index} style={{display:'none'}}></li>)
            ))
            ))
          }
        </ul>

        </div>
        </div>
    );
    } else { ///:word 링크로 들어왔거나 앞으로 가기 아니면 주소변경으로 들어왔다면
      if(sessionWord !== null){//앞으로 가기나 주소변경으로 들어왔다면

        if(sessionWord !== match.params.word){//주소변경으로 들어왔다면 시작화면으로

          return <Denied />

        } else {//앞으로 가기면 재출력

        sessionWord = window.sessionStorage.getItem('word');
        sessionWordInfo = JSON.parse(window.sessionStorage.getItem('wordInfo'));

        return(//출력
          <div className='words'>
              <div className='wordCardData'>
              <p className='word'>{sessionWord}</p>
              {sessionWordInfo.map((currentWord,index)=>(
                <span key ={index}>
                  <PartOfSpeeches partOfSpeech={currentWord.partOfSpeech}/>     
                  <span className='divider'>{(index < (sessionWordInfo.length-1))?(' | '):('')}</span>
                </span>  
              )
              )
              }
              <ul>
                  {
                    sessionWordInfo.map((currentWord)=>(     
                      currentWord.definitions.map((currentDef,index)=>(
                       <Definitions key={index} partOfSpeech={currentWord.partOfSpeech} definition={currentDef.definition}/>
                    ))
                    ))
                  }
              </ul>
              <ul>
                {
                  sessionWordInfo.map((currentWord)=>(  
                    currentWord.definitions.map((currentEx,index)=>(
                     (currentEx.example)?(<Examples key={index} partOfSpeech={currentWord.partOfSpeech} example={currentEx.example}/>):(<li key={index} style={{display:'none'}}></li>)
                  ))
                  ))
                }
              </ul>
      
              </div>
              </div>
              
          );
          }

      } else {///:word 링크로 들어왔다면

        history.replace('/');
        return false;

      }

    }

}

export {Words}
