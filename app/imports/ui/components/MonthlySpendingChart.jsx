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
        // eslint-disable-next-line no-template-curly-in-string
        pointFormat: '{point.name}: <b>${point.x}</b>',
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
  }

  render() {
    return <div id="monthSpending" />;
  }
}

export default MonthlySpendingChart;
