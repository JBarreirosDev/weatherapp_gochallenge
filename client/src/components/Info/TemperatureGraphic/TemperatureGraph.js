import React from 'react'
import Chart from 'chart.js/auto'
import { Bar } from "react-chartjs-2"

class TemperatureGraph extends React.Component {
    constructor(props) {
        super(props)
    }

    render () { 
        return (
            <div id="TemperatureGraph">
                <Bar
                    width={600}
                    height={400}
                    data={{
                        labels: this.props.cities,
                        datasets: [{
                            label: "Temperature",
                            data: this.props.temperature,
                            backgroundColor: this.props.color
                        }]
                    }}
                    options={{
                        maintainAspectRatio: false,
                        hover: {
                            mode: false
                        }
                    }}
                />
            </div>
        )
    }
}
export default TemperatureGraph