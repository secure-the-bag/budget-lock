import React from 'react';
import { Grid, Progress, Container, Header, Icon } from 'semantic-ui-react';
import Highcharts from 'highcharts';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: '',
          pointPadding: 0,
          groupPadding: 0,
          color: 'green',
          negativeColor: 'red',
          data: [130, 43, -143, 203, -66, 13, 0, 0, 0, 0, 0],
        }],
    };
  }

  componentDidMount() {
    this.cashFlow();
    this.monthSpending();
  }

  cashFlow() {
    Highcharts.chart({
      chart: {
        type: 'column',
        renderTo: 'cashFlow',
      },
      title: {
        text: 'Cash Flow Over Time',
      },
      tooltip: {
        formatter: function () {
          return `<b>${this.x}:</b> $${this.y}`
        },
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Nov', 'Dec'],
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
          data: [130, 43, -143, 203, -66, 13, 0, 0, 0, 0, 0],
        }],
    });
  }

  monthSpending() {
    Highcharts.chart('monthSpending', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'November Spending: $432.12'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Internet Explorer',
          y: 11.84
        }, {
          name: 'Firefox',
          y: 10.85
        }, {
          name: 'Edge',
          y: 4.67
        }, {
          name: 'Safari',
          y: 4.18
        }, {
          name: 'Sogou Explorer',
          y: 1.64
        }, {
          name: 'Opera',
          y: 1.6
        }, {
          name: 'QQ',
          y: 1.2
        }, {
          name: 'Other',
          y: 2.61
        }]
      }]
    });
  }

  render() {

    return (
      <Container style={{ margin: '2rem 1rem' }}>
        <Grid id='overview' container stretched>
          <Grid.Row>
            <Grid.Column width={5} style={{ border: '0.2rem solid gray', padding: '2.5rem', marginRight: '5rem' }}>
              <Grid.Row>
                <Grid.Column floated={'right'}>
                  <Icon name={'settings'}/>
                </Grid.Column>
                <Grid.Column>
                  <Header>Upcoming Bills
                    <hr/>
                  </Header>
                  <p>Credit Card Payment: $150</p>
                  <p>Credit Card Payment: $150</p>
                  <p>Credit Card Payment: $150</p>
                  <p>Credit Card Payment: $150</p>
                  <p>Credit Card Payment: $150</p>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>

            <Grid.Column width={10} style={{ border: '0.2rem solid gray', padding: '2.5rem' }}>
              <Grid columns={2} style={{ flexGrow: '0' }}>
                <Grid.Row>
                  <Grid.Column style={{ paddingRight: '0px' }}>
                    <Header>
                      November Budget
                      <hr/>
                    </Header>
                  </Grid.Column>
                  <Grid.Column textAlign={'right'} style={{ paddingLeft: '0px' }}>
                    <Header>
                      Budget
                      <hr/>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns='2'>
                <Grid.Row columns={3}>
                  <Grid.Column width={3}>
                    <b>Groceries | $10 </b>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Progress value='4' total='5' progress='percent' color={'green'}>
                      $150
                    </Progress>
                  </Grid.Column>
                  <Grid.Column textAlign={'right'} width={3}>
                    <b>$1500</b>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid container stretched
              style={{ border: '0.2rem solid gray', padding: '2rem' }}>
          <Grid.Row>
            <Header style={{ margin: '1rem' }}>
              Trends
              <hr/>
            </Header>
          </Grid.Row>
          <Grid.Row columns={'equal'}>
            <Grid.Column>
              <div id='cashFlow'/>
            </Grid.Column>
            <Grid.Column>
              <div id='monthSpending'/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Overview;
