import React, {Component} from "react";
import {Bar} from "react-chartjs-2";
import {getStatName} from "../../util/Utils";


class PocemonsStats extends Component {
	getGraficData = () => {
		const {records} = this.props;
		let graficObj = {
			labels: [],
			datasets: [{
				label: "Stats",
				data: [],
				backgroundColor: "rgba(2, 196, 204, 0.8)",
				hoverBackgroundColor: []
			}]
		};
		records.forEach(item => {
			graficObj['labels'] = [...graficObj['labels'], item.stat.name];
			graficObj['datasets'][0]['data'] = [...graficObj['datasets'][0]['data'], item['base_stat']];
		});
		return graficObj;
	};

	render() {
		return (
			<Bar
				width={100}
				height={200}
				options={{
					maintainAspectRatio: false,
					scales: {
						yAxes: [{
							barPercentage: 0.1,
							minBarLength: 2,
							gridLines: {
								offsetGridLines: true
							},
							ticks: {
								fontSize: 8,
								beginAtZero: true,
								callback: function (value) {
									return Number(value).toFixed(0);
								}
							}
						}],
						xAxes: [{
							barPercentage: 1,
							minBarLength: 7,
							gridLines: {
								offsetGridLines: true
							},
							ticks: {
								fontSize: 8,
								beginAtZero: true,
								callback: function (value) {
									return getStatName(value)
								}
							}
						}]
					}
				}}
				data={this.getGraficData()}/>
		);
	}
}

export default PocemonsStats;
