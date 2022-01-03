import React from 'react'
import TemperatureGraph from "./TemperatureGraphic/TemperatureGraph.js"
import { WeatherTable } from './Table/WeatherTable.js'
import "./Table/Table.css"

class Info extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        if(this.props.data.length > 2) {
            return (
                <div className="info">
                    <TemperatureGraph
                        cities={this.props.cities}
                        temperature={this.props.temperature}
                        color={this.props.color}
                    />
                    <div className="table">
                        {console.warn(" INFO data => ", this.props.data)}
                        <WeatherTable
                            data={this.props.data}
                        />
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}
export default Info