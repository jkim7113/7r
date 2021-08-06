import './App.css';
import React, {useState} from 'react';
import {Inputs} from './Inputs.js';
import {PartOfSpeeches} from './PartOfSpeeches.js';
import {Definitions} from './Defnitions.js';
import {Examples} from './Examples.js';

class App extends React.Component{

  state = {
    wordInfo : [],
    target : '',
    isRequested : false,
    word : '',
    errorMsg : false
  }

  async loadMeaning(){
    try{
      var res = await fetch(this.state.target);
      var data = await res.json();
      
      if(data[0].meanings.length > 0){
        var meanings = data[0];
      }
      else{
        var meanings = data[1];
      }
      this.setState({wordInfo:meanings.meanings, isRequested:true, word:meanings.word});
 
    }
    catch{
      this.setState({isRequested:false, errorMsg:true},()=>{
          console.error('An unexpected error occured');
      });
    }

  } 

    /*loadMeaning(){
      return new Promise((resolve,reject)=>{
        resolve(fetch(this.state.target))
      });
    }*/
  render(){

    return(<div>
      {this.state.isRequested ? (
        <div className='words'>
        <div className='wordCardData'>
        <p className='word'>{this.state.word}</p>
        {this.state.wordInfo.map((currentWord,index)=>(
          <span key ={index}>
            <PartOfSpeeches partOfSpeech={currentWord.partOfSpeech}/>     
            <span className='divider'>{(index < (this.state.wordInfo.length-1))?(' | '):('')}</span>
          </span>  
        )
        )
        }
        <ul>
            {
              this.state.wordInfo.map((currentWord)=>(     
                currentWord.definitions.map((currentDef,index)=>(
                 <Definitions key={index} partOfSpeech={currentWord.partOfSpeech} definition={currentDef.definition}/>
              ))
              ))
            }
        </ul>

        <ul>
          {
            this.state.wordInfo.map((currentWord)=>(  
              currentWord.definitions.map((currentEx,index)=>(
               (currentEx.example)?(<Examples key={index} partOfSpeech={currentWord.partOfSpeech} example={currentEx.example}/>):(<li key={index} style={{display:'none'}}></li>)
            ))
            ))
          }
        </ul>

        </div>
        </div>
      ):(
        <Inputs />
      ) }
    </div>
    );
  }

  componentDidMount(){
    const form = document.querySelector('form');
    const errorMsg = document.querySelector('.errorMsg'); 

    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      var inputValue = document.querySelector('input').value;
      var url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/'+inputValue.toLowerCase();

      this.setState({target:url},async()=>{
        await this.loadMeaning();
        /*await this.loadMeaning().then((res)=>{
          return res = res.json();
      }
      ).then((res)=>{
        if(data[0].meanings.length > 0){
          var meanings = data[0];
        }
        else{
          var meanings = data[1];
        }
        this.setState({wordInfo:meanings.meanings, isRequested:true, word:meanings.word});
      });*/
        if(this.state.errorMsg === true){
          errorMsg.style.display = 'inline';
        }
        
      });
      });
  }

  componentDidUpdate(){ 
    console.log(this.state.wordInfo);
    var partOfSpeechesArray = Array.prototype.slice.call(document.querySelectorAll('.partOfSpeech'));

    partOfSpeechesArray.map((word,index)=>{
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
  }
  }

export default App;