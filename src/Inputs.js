import React from 'react';
import { Words } from './components/Words.js';
import { Link } from 'react-router-dom';

class Inputs extends React.Component{
    
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
            this.props.history.push({pathname:`/${this.state.word}`, state: this.state})
          ):(
            <div className='cards'>
            <div className='inputCardData'>
            <p className='announcement'>Type the word to search</p>
            <form>
                <input autoComplete='off' id='textBox' type='text' size='30'></input>
            </form>
            <p className='errorMsg'>No words found</p>
            </div>
            </div>
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

}

export default Inputs;