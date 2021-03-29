import React from 'react';
import Highcharts from 'highcharts';

class MonthlySpendingChart extends React.Component {
  constructor() {
    super();
    // Init state.
    this.state = { chart: {} };
  }

  componentDidMount() {
    const _this = this;
    // Init chart with data from props.
    const chart = Highcharts.chart('monthSpending', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: `${_this.props.month} Spending: $${_this.props.totalSpending}`,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [{
        name: 'Categories',
        colorByPoint: true,
        point: {
          events: {
            // have to fix later
            click: function (e) {
              const category = e.point.options.name;
              this.setState({ categoryName: category });
            },
          },
        },
        data: _this.props.data,
      }],
    });
    this.setState({ chart: chart });
    // const chart = Highcharts.chart('chart', {
    //   series: [{ data: _this.props.data }],
    // });
    // Save the chart "container" in the state so we can access it from anywhere.
    this.setState({ chart });
  }

  // componentWillReceiveProps(props) {
  //   // Update the chart with new data every time we receive props.
  //       const data = [{
  //         name: 'Groceries',
  //         y: 61.41,
  //       }, {
  //         name: 'Restaurants',
  //         y: 11.84,
  //       }, {
  //         name: 'Fun',
  //         y: 30.85,
  //       }];
  //   this.state.chart.series.data.setData(data);
  // }

  render() {
    return <div id="monthSpending" />;
  }
}

export default MonthlySpendingChart;
