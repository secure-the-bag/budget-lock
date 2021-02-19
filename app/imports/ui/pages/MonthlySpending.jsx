import React from 'react';
import { Table, Container } from 'semantic-ui-react';
import Highcharts from 'highcharts';
import SpendingRow from '../components/MonthlySpendingRow';

class MonthlySpending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      text: '',
    };
  }

  componentDidMount() {
    this.monthSpending();
  }

  monthSpending() {
    Highcharts.chart('monthSpending', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'November Spending: $432.12',
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
        data: [{
          name: 'Groceries',
          y: 61.41,
        }, {
          name: 'Restaurants',
          y: 11.84,
        }, {
          name: 'Fun',
          y: 30.85,
        }],
      }],
    });
  }

  render() {

    const data = [{
      text: 'Walmart',
      price: 9.53,
      date: '12/03/2021',
    }, {
      text: 'Tepresso',
      price: 3.53,
      date: '12/05/2021',
    }];

    return (
      <Container style={{ margin: '2rem 1rem' }}>
        <div id='monthSpending'/>
        <div className='monthlySpendingTable'>
          <Table basic='very' selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Place</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Money</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((dati,index) => <SpendingRow key={index} data={dati}/>)}
            </Table.Body>
          </Table>
        </div>
      </Container>
    );
  }
}

export default MonthlySpending;
