// My api key 73f6654b07764b9892139030f88c1af5



// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom"



import React, { Component } from 'react'

export default class App extends Component {
  pageSize = 3;
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 0
  }
  
  setProgress = (progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="general" country="in" apiKey={this.apiKey} category="general"/>}/>
            <Route exact path="/business" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="business" country="in" apiKey={this.apiKey} category="business"/>}/>
            <Route exact path="/science" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="science" country="in" apiKey={this.apiKey} category="science"/>}/>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="entertainment" country="in" apiKey={this.apiKey} category="entertainment"/>}/>
            <Route exact path="/health" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="health" country="in" apiKey={this.apiKey} category="health"/>}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="sports" country="in" apiKey={this.apiKey} category="sports"/>}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="technology" country="in" apiKey={this.apiKey} category="technology"/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
