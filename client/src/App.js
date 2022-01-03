import React from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar.js'
import Info from './components/Info/Info.js'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      cities: [],
      temperature: [],
      color: []
    }
    this.addData = this.addData.bind(this)
  }
  addData(name, data) {
    let exists
    this.state.data.map( (d) => {
      exists = d.city.indexOf(name) !== -1
    })
    if(exists) return
    
    var date = new Date(data.Dawn * 1000)
    var hours = date.getHours()
    var minutes = "0" + date.getMinutes()
    var dawn = hours + ':' + minutes.substr(-2)

    var date = new Date(data.Dusk * 1000)
    var hours = date.getHours()
    var minutes = "0" + date.getMinutes()
    var dusk = hours + ':' + minutes.substr(-2)
    
    let newElement = {
      city: name,
      temperature: data.Temperature,
      dawn: dawn,
      dusk: dusk,
      color: "rgba(255,0,0,255)"
    }
    this.setState(prevState => ({
      data: [...prevState.data, newElement],
      cities: [...prevState.cities, newElement.city],
      temperature: [...prevState.temperature, newElement.temperature],
      color: [...prevState.color, newElement.color]
    }))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBar
            placeholder="Enter a City Name"
            data={this.state.data}
            addCity={this.addData}
            removeCity={this.removeData}
          />
          <Info
            data={this.state.data}
            cities={this.state.cities}
            temperature={this.state.temperature}
            color={this.state.color}
          />
        </header>
      </div>
    )
  }
}
export default App