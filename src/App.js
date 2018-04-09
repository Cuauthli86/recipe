import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


/* DATA IS ALREADY SORTEDs*/ 
class Data extends Component{
  constructor(props){
    super(props);
    this.state={
      array:[],
      list:'recent',
      active:'green',
      unactive:'gray'
      
    };
this.chargeAllTime= this.chargeAllTime.bind(this);
this.chargeRecent=this.chargeRecent.bind(this);
this.getData=this.getData.bind(this);
  }

  //cycling

  componentDidMount (){
   setInterval(this.getData, 2000);
    
  }

  componentWillUnmount() {
    clearInterval(this.getData);
  }
  


///habdlers

getData(){
 
  axios
  .get('https://fcctop100.herokuapp.com/api/fccusers/top/'+this.state.list)
  .then(res=> this.setState({array:res.data}))
  
};


chargeAllTime(e){
  e.preventDefault();

  this.setState({
    list:'alltime',
    active:'gray',
    unactive:'green'
  })

  
 console.log(this.state.list);
}

chargeRecent(e){

  e.preventDefault();
  this.setState({
    list:'recent',
    active:'green',
    unactive:'gray'
  })
  console.log(this.state.list);

}

  //render

  render(){
    var usuario=this.state.array.map(function(user, index){
      return(
        <tr> 
        <td >{index+1}</td>
        <td ><img src={user.img} alt="no desc" width="30"/> {user.username}</td>
        <td >{user.recent}</td>
        <td >{user.alltime}</td>
        </tr>
        
      );
    })


    return(   
    <table>
      <thead>
        <tr>
      <th> ID</th>
      <th>CAMPER</th>
      <th> <button style={{backgroundColor:this.state.active}}  onClick={this.chargeRecent}>Points in past 30 days</button> </th>
      <th> <button style={{backgroundColor:this.state.unactive}} onClick={this.chargeAllTime} > All time points</button> </th>
    </tr>
      </thead>
      <tbody>
      {usuario}
      </tbody>
    </table>
    
    );
  }
  
}

class App extends Component {
  render() {
    return (
      <div class="center">
     <div class="header">{'LEADERBOARD'}</div> 
    <div><Data/></div>   
    </div>
    );
  }
}

export default App;
