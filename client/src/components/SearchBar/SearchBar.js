import React from 'react'
import "./SearchBar.css"
import CloseIcon from '@material-ui/icons/Close'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: "",
            suggestions: {}
        }
        this.updateInput = this.updateInput.bind(this)
        this.addCity = this.addCity.bind(this)
    }
    updateInput(event){
        let val = event.target.value
        this.setState({
            inputValue: val
        })
        setTimeout(() => {
            this.getSuggestions()
        }, 500)
    }  
    async getSuggestions() {
        let city = this.state.inputValue
        const response = await fetch(`http://localhost:2000/suggestions/${city}`).
            then( res => res.text() )
        const json = await JSON.parse(response)
        this.setState({suggestions: json})
    }
    async getCityData(name, key) {
        const response = await fetch(`http://localhost:2000/cities/${key}`).
            then( res => res.text() )
        const json = await JSON.parse(response)
        this.props.addCity(name, json)
    }
    addCity(val) {
        // clean search bar and sugestions
        this.setState({
            inputValue: "",
            suggestions: []
        })
        this.getCityData(val.LocalizedName, val.Key)
    }
    render() {
        return (
            <div className="search">
                <div className="searchInputs">
                    <input
                        type="text"
                        placeholder={ this.props.placeholder }                    
                        onChange={ this.updateInput }
                        value={ this.state.inputValue }
                    />
                </div>
                <SuggestionsList suggestions={this.state.suggestions} handleClick={this.addCity}/>
                <SelectedCities data={this.props.data} />
            </div>
        )
    }
}
function SuggestionsList(props) {
    if (Object.keys(props.suggestions).length == 0) {
        return null
    } else {
        return (
            <div className="dataResult">
                {props.suggestions.map((value) => {
                    return (
                        <a className="dataItem" key={value.Key} onClick={() => {props.handleClick(value)} }>
                            <p> {value.LocalizedName} </p>
                            <p className="country"> {value.Country.LocalizedName} </p>
                        </a>
                    )
                })}
            </div>
        )
    }
}
function SelectedCities(props) {
    return (
        <div className="citiesPoolContainer">
            {props.data.map((val) => {
                return (
                    <div className="cityContainer" key={val.city}>
                        <p className="cityName"> {val.city} </p>
                    </div>
                )
            })}
        </div>
    )
}
export default SearchBar