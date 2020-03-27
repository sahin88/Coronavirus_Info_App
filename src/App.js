

import React, { Component } from 'react'
import Axios from 'axios'
import './App.css';






export class App extends Component {
  constructor(props) {
    super(props)
    this.getCountryData= this.getCountryData.bind(this)
  }
  
 state={
    confirmed:0,
    recovered:0,
    death:0,
    countries:[],
   
  }
 
  componentDidMount () {
    this.getData()
  }

  async getData() {
   const resApi= await Axios.get('https://covid19.mathdro.id/api');
   const resCountries= await Axios.get("https://covid19.mathdro.id/api/countries")
 

   resCountries.data.countries.map((value, i)=>{return this.state.countries.push(value['name'])})
  

   
   
   this.setState({
    confirmed:resApi.data.confirmed.value,
    recovered:resApi.data.recovered.value,
    death:resApi.data.deaths.value,
    
   });
 
  }

  async getCountryData(e) {
    if(e.target.value==='WorldWide') {
      return this.getData()
    }
    try{
      const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
      
      this.setState({
        confirmed:res.data.confirmed.value,
        recovered:res.data.recovered.value,
        death:res.data.deaths.value,
        
      });
    }
    catch (err) {
      if(err.response.status===404){
        this.setState({
          confirmed:'No Data',
          recovered:'No Data',
          death:'No Data',
          
        });

      }
    }
  

  }
  renderCountryOptions() {
    return this.state.countries.map((country,i)=>{

    
    return <option key={i}>{country}</option>
    });
  }
  render() {
    return (
      
      <div className='container'>
          <h1 className='heading'>Corona Virus Update </h1>
          <select className='dropDown'
           onChange={this.getCountryData}>
          <option >WorldWide</option>
            {this.renderCountryOptions()}
           </select>
        <div className='sub_container'>
          <div className='sub_class confirmed'>
            <h1>Total confirmed Case</h1>
            <h2>{this.state.confirmed}</h2>
          </div>
          <div className=' sub_class recovered'>
            <h1>Total recovered Case</h1>
            <h2>{this.state.recovered}</h2>
          </div>
          <div className='sub_class death'>
            <h1>Total Death</h1>
            <h2>{this.state.death}</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default App


