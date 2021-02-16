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
          return `<b>${this.x}:</b> $${this.y}`;
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
          showInLegend: false,
        }],
    });
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

    return (
      <Container style={{ margin: '2rem 1rem' }}>
        <Grid id='overview' container stretched>
          <Grid.Row>
            <Grid.Column width={5} style={{ border: '0.2rem solid gray', padding: '1rem', marginRight: '5rem', borderRadius: `10px` }}>
              <Grid.Row>
                <div style={{ textAlign: 'right' }}>
                  <Icon name={'settings'} link/>
                </div>
                <Grid.Column style={{ padding: '1.5rem' }}>
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

            <Grid.Column width={10} style={{ border: '0.2rem solid gray', padding: '1rem', borderRadius: `10px` }}>
              <Grid.Column floated={'right'} style={{ flexGrow: '0', marginBottom: '1.5rem' }}>
                <Icon name={'settings'} link/>
              </Grid.Column>
              <Grid columns={2} style={{ flexGrow: '0', padding: '0rem 1.5rem' }}>
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
              <Grid columns='2' style={{ padding: '0rem 1.5rem' }}>
                <Grid.Row columns={3}>
                  <Grid.Column width={3}>
                    <b>Groceries
                      <br/>
                      $280
                    </b>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Progress active progress percent={93} color={'red'}>
                      $20 left
                    </Progress>
                  </Grid.Column>
                  <Grid.Column textAlign={'right'} width={3}>
                    <b>$300</b>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={3}>
                    <b>Restaurants
                      <br/>
                      $12
                    </b>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Progress active progress percent={12} color={'green'}>
                      $88 left
                    </Progress>
                  </Grid.Column>
                  <Grid.Column textAlign={'right'} width={3}>
                    <b>$100</b>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={3}>
                    <b>Fun
                      <br/>
                      $50
                    </b>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Progress active progress percent={50} color={'yellow'}>
                      $50 left
                    </Progress>
                  </Grid.Column>
                  <Grid.Column textAlign={'right'} width={3}>
                    <b>$50</b>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid container stretched
              style={{ border: '0.2rem solid gray', padding: '2rem', borderRadius: `10px` }}>
          <Grid.Row>
            <Header style={{ margin: '1rem', width: '-webkit-fill-available' }}>
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
