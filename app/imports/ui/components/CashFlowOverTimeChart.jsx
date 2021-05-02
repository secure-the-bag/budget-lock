import React from 'react';
import Highcharts from 'highcharts';

class CashFlowOverTimeChart extends React.Component {
  constructor() {
    super();
    // Init state.
    this.state = { chart: {} };
  }

  componentDidMount() {
    const _this = this;
    // Init chart with data from props.
    const chart = Highcharts.chart({
      chart: {
        type: 'column',
        renderTo: 'cashFlow',
      },
      title: {
        text: 'Cash Flow Over Time',
      },
      tooltip: {
        formatter: function () {
          return `<b>${this.x}:</b> $${this.y}`;
        },
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        labels: {
          // eslint-disable-next-line no-template-curly-in-string
          format: '${value}',
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: '',
          pointPadding: 0,
          groupPadding: 0,
          color: 'green',
          negativeColor: 'red',
          data: _this.props.data,
          showInLegend: false,
        }],
    });
    this.setState({ chart: chart });
  }

  render() {
    return <div id="cashFlow" />;
  }
}

export default CashFlowOverTimeChart;
