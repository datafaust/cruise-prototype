import React, { Component } from 'react';
import Leaf from './Leaf';
import Dates from './Dates';
import StatCard from './StatCard';
import Graph from './Graph';
import classes from './app.module.css';
import Navigator from './Navigator';
import Pop from './Pop';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie
} from 'recharts';
import { Container, Row, Col, Form } from 'react-bootstrap';
import HourPicker from './HourPicker';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cleanData: [],
      graphData: [],
      pieGraphData: [],
      totalCount: {},
      topCount: [],
      dateInputStart: '2019-11-01',
      dateInputEnd: '2019-11-18',
      loading: false,
      totalInspections: null,
      calculate: false,
      open: true,
      showModal: false,
      initialWeekday:'Monday',
      initialHour:'06:00 AM',
      weekdays: [
        { id: 0, day: "Monday" },
        { id: 1, day: "Tuesday" },
        { id: 2, day: "Wednesday" },
        { id: 3, day: "Thursday" },
        { id: 4, day: "Friday" },
        { id: 5, day: "Saturday" },
        { id: 6, day: "Sunday" }
      ],
      hours: [
        { id: 0, hour: "12:00 AM" },
        { id: 1, hour: "01:00 AM" },
        { id: 2, hour: "02:00 AM" },
        { id: 3, hour: "03:00 AM" },
        { id: 4, hour: "04:00 AM" },
        { id: 5, hour: "05:00 AM" },
        { id: 6, hour: "06:00 AM" },
        { id: 7, hour: "07:00 AM" }
      ]
    };
    this.handleWeekday = this.handleWeekday.bind(this);
    this.handleHour = this.handleHour.bind(this);
  }

  componentDidMount() {


    //set modal run after two seconds
    setTimeout(() => {
      this.setState({
        showModal: true
      });
    }, 2500)


    try {
      this.fetchData();
      if (this.state.data.length != 0) {
        this.calculateInspections();
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false
      })
    }



  }


  // componentDidUpdate () {
  //   if(this.state.data.length != 0) {
  //     this.calculateInspections();
  //   }
  //  }

  //HANDLE WEEKDAY CHANGE
  handleWeekday(event) {
    console.log(event.target.value)
    //console.log(this.state.routingNum);
    this.setState({
        initialWeekday: event.target.value,
        loading: false,
        data: []
    });

    this.fetchData();
  }

  //HANDLE HOUR CHANGE
  handleHour(event) {
    console.log(event.target.value)
    //console.log(this.state.routingNum);
    this.setState({
        initialHour: event.target.value,
        loading: false,
        data: []
    });

    this.fetchData();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  fetchData = async () => {

    const dates = ['2020-10-01', '2020-09-25', '2020-09-15'];
    const start_date = dates[this.getRandomInt(3)]
    console.log('selected date: ',start_date) 

    const requestData = () => {
      fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${start_date}'  AND inspection_date <= '${'2020-10-10'}'&$limit=50000`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
          this.setState({ data: res })
        )
    }

    const requestDayCounts = () => {
      fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$select=date_trunc_ymd(INSPECTION_DATE) as day,count(*)&$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${this.state.dateInputStart}'  AND inspection_date <= '${this.state.dateInputEnd}'&$group=day&$order=day`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
          this.setState({ graphData: res, loading: true })
        )
    }

    const requestBoroughCounts = () => {
      fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$select=borough as name,count(*) as value&$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${this.state.dateInputStart}'  AND inspection_date <= '${this.state.dateInputEnd}'&$group=borough&$order=borough`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
          this.setState({ pieGraphData: res })
        )
    }

    const requestTotalCount = () => {
      fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$select=count(*) as value&$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${this.state.dateInputStart}'  AND inspection_date <= '${this.state.dateInputEnd}'`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
          this.setState({ totalCount: res })
        )
    }

    const requestTop = () => {
      fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$select=inspection_type,count(*) as value&$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${this.state.dateInputStart}'  AND inspection_date <= '${this.state.dateInputEnd}'&$group=inspection_type&$order=inspection_type`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
          this.setState({ topCount: res })
        )
    }


    //this.setState({calculate: true})
    //call the function
    await requestData();
    await requestDayCounts();
    await requestBoroughCounts();
    await requestTotalCount();
    await requestTop();
    this.calculateInspections();





  }

  calculateInspections = () => {
    this.setState({ totalInspections: this.state.data.length })
  }

  handleDateInputStart = (e) => {
    console.log(e.target.value);
    this.setState({ dateInputStart: e.target.value, loading: false }) //update state with the new date value
    this.updateData();
  }

  handleDateInputEnd = (e) => {
    console.log(e.target.value);
    this.setState({ dateInputEnd: e.target.value, loading: false }) //update state with the new date value
    this.updateData();
  }

  updateData = () => {
    this.fetchData();
  }

  LoadingMessage = () => {
    return (
      <div className={classes.splash_screen}>
        <div className={classes.loader}></div>
      </div>
    );
  }

  averageScores = ({ avg, n }, slangTermInfo) => {
    return {
      avg: (parseInt(slangTermInfo.count) + n * avg) / (n + 1),
      n: n + 1,
    };
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  //inspection_date >= '${this.state.dateInput}'& 
  // https://data.cityofnewyork.us/resource/p937-wjvj.json?$where=inspection_date >= '2019-10-10T12:00:00' 

  render() {


    //parse datat for borough graph 
    let data03 = this.state.pieGraphData.map(item => { item["value"] = parseInt(item["value"]); return item })
    let cleanGraphData = this.state.graphData.map(item => { item["day"] = item["day"].substring(0, 10); return item })

    //produce average per day

    const initialVals = { avg: 0, n: 0 };
    const averagePday = Math.round(this.state.graphData.reduce(this.averageScores, initialVals).avg);
    console.log(averagePday);



    let z = [{ value: "6448" }]
    console.log(this.state.topCount)

    return (
      <div >
        {!this.state.loading ?
          this.LoadingMessage() :
          <Container fluid="md"  >
            <Navigator  />
          
            {/**
             * <Pop
              showModal={this.state.showModal}
              closeModal={this.closeModal}
            />
             */}
            

            <Row 
              style={{marginLeft:'1%', marginTop:'1%', marginRight: '1%'}}
              >
              <Col>
              {this.state.weekdays && <Form>
                <Form.Group controlId="weekday_select">
                  <Form.Label>Choose a weekday:</Form.Label>
                  <Form.Control as="select" value={this.state.initialWeekday}  onChange={this.handleWeekday}>
                    {this.state.weekdays.map((weekday, i) => <option key={weekday.id} value={weekday.id}>{weekday.day}</option>)})
                  </Form.Control>
                </Form.Group>
              </Form>
         
              }
              </Col>
              <Col>
              {this.state.hours && <Form>
                <Form.Group controlId="hour_select">
                  <Form.Label>Choose an Hour:</Form.Label>
                  <Form.Control as="select" value={this.state.initialHour}  onChange={this.handleHour}>
                    {this.state.hours.map((hour, i) => <option key={hour.id} value={hour.id}>{hour.hour}</option>)})
                  </Form.Control>
                </Form.Group>
              </Form>
         
              }
              </Col>

            </Row>

        
            <div>
                <Leaf data={this.state.data} />
              </div>
          </Container>
        }
      </div>

    );
  }
}

export default App;


/**olf code
 *
 *    <Leaf data={this.state.data} />
 *
 *   updateData =() => {
    //populate clean data
      this.state.data.map(data=>{
        this.setState({
          cleanData: this.state.cleanData.push([data.latitude, data.longitude, 1])
        })
    })
  }

  {this.state.cleanData ? console.log(this.state.cleanData) : <div>hello</div>}

  

             


              
 */