import React, { Component } from 'react';
import {BarChart} from 'react-easy-chart';
var DoughnutChart = require("react-chartjs").Doughnut;

    class Chart extends Component {
        state = {
            error: false,
            data: {},
            visa: {},
            citizenship: {},
            piechart: [],
            ExpressEntry: 0,
            StudyVisa: 0,
            WorkVisa: 0,
            FamilySponsorship: 0,
            VisitorVisa: 0,
            barData: [],
            loaded: false,
        }

        componentDidMount = () => {
            this.fetchData()
      }

    fetchData() {
        var url = `https://randomapi.com/api/aa95c1c5886c4b3a0c92c08669170298`
        fetch(url)
        .then((response) => {
            if (response.status !== 200) {
            console.log('error')
            return null
            }
            response.json()
            .then((responseJson) => {
                this.setState({
                    data: responseJson.results[0].clients
                })
                console.log(this.state.data)
                this.segmentsData()
                this.scatterData()
            })
        }).catch((error) => {
            console.log("error");
            })
    } 

    segmentsData = () => {
        var ExpressEntry = 0;
        var StudyVisa = 0;
        var WorkVisa = 0;
        var FamilySponsorship = 0;
        var VisitorVisa = 0;

        this.state.data.map(clien => {
            if (clien.visa === "Express Entry") {
                return ExpressEntry++;
            }   else if (clien.visa === "Study Visa"){
                return StudyVisa++;
            }   else if (clien.visa === "Work Visa"){
                return WorkVisa++;
            }   else if (clien.visa === "Family Sponsorship"){
                return FamilySponsorship++;
            }   else if (clien.visa === "Visitor Visa"){
                return VisitorVisa++;
            }
        })

        var data = [
            {
                value: ExpressEntry,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "ExpressEntry"
            },
            {
                value: StudyVisa,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "StudyVisa"
            },
            {
                value: WorkVisa,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "WorkVisa"
            },
            {
                value: FamilySponsorship,
                color: "#7a7a7a",
                highlight: "#a0a0a0",
                label: "FamilySponsorship"
            },
            {
                value: VisitorVisa,
                color: "#424242",
                highlight: "#565656",
                label: "VisitorVisa"
            }
        ]

        this.setState({
            ExpressEntry,
            StudyVisa,
            WorkVisa,
            FamilySponsorship,
            VisitorVisa,
            piechart: data,
        })

        console.log(ExpressEntry,StudyVisa,WorkVisa,
            FamilySponsorship,
            VisitorVisa,)
    }

    scatterData = () => {
        var scatter = {};
            this.state.data.map(clien => {
                var contry = clien.citizenship
                if (contry in scatter) {
                    return scatter[contry]++;
                }   else {
                    return scatter[contry] = 1;
                }   
            })

        var sortable = [];
        for (var country in scatter) {
            sortable.push([country, scatter[country]]);
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
        console.log(sortable[0][1], sortable[1][1], sortable[2][1], sortable[3][1], sortable[4][1])

        this.setState({
          barData: sortable,
          loaded: true,
        })
        console.log(this.state.barData[0][0])

    }
    
    WordLimit(string) {
      if (string.split(' ').length > 2) {
        return string.split(' ').slice(0,2).join(' ') + '...';
      }
      else {
        return string.split(' ').slice(0,2).join(' ');
      }
    }

    RemoveBracket(string) {
      return string.split('(').slice(0,1);
    }


    bchart() {
      const {barData } = this.state;
      if (this.state.loaded){
      console.log(barData.length)
      return(
      <div>
          <BarChart
            axisLabels={{x: 'Contry', y: 'Frequency'}}
            axes
            height={300}
            width={450}
            // margin={{top: 50, right: 100, bottom: 50, left: 100}}
            colorBars
            barWidth={1}
            data={[
              { x: this.WordLimit(barData[0][0]), y: barData[0][1], color: '#F7464A'},
              { x: this.WordLimit(barData[1][0]), y: barData[1][1], color: '#46BFBD'},
              { x: this.WordLimit(barData[2][0]), y: barData[2][1], color: '#FDB45C'},
              { x: this.WordLimit(barData[3][0]), y: barData[3][1], color: '#7a7a7a'},
              { x: this.WordLimit(barData[4][0]), y: barData[4][1], color: '#424242'},
            ]}
          />
          </div>
      )
      }
    }

    showPercentage(num) {
      const {barData} = this.state;
      return parseFloat(num/barData.length*100).toFixed(2)+"%"
    }

    bchartInfo() {
      const {barData} = this.state;
      if (this.state.loaded){
      return(
          <div>
              <p>Applicant's Citizenship </p>
              <ul className="List">
                  <li className="ListItem">{this.RemoveBracket(barData[0][0])}: {this.showPercentage(barData[0][1])}</li>
                  <li className="ListItem">{this.RemoveBracket(barData[1][0])}: {this.showPercentage(barData[1][1])}</li>
                  <li className="ListItem">{this.RemoveBracket(barData[2][0])}: {this.showPercentage(barData[2][1])}</li>
                  <li className="ListItem">{this.RemoveBracket(barData[3][0])}: {this.showPercentage(barData[3][1])}</li>
                  <li className="ListItem">{this.RemoveBracket(barData[4][0])}: {this.showPercentage(barData[4][1])}</li>
              </ul>
          </div>
      )
      }
    }

        render() {

            const { piechart, ExpressEntry, StudyVisa, WorkVisa, FamilySponsorship, VisitorVisa, barData } = this.state;
            return (
                <section className="Charts">
                    <div className="PieChart">
                        <DoughnutChart data={piechart} 
                        width="300" height="300"/>
                    </div>

                    <div className="ChartInfo">
                        <p>Visa type</p>
                        <ul className="List">
                          <li className="ListItem">Express Entry: {ExpressEntry}</li>
                          <li className="ListItem">Study Visa Entry: {StudyVisa}</li>
                          <li className="ListItem">Work Visa Entry: {WorkVisa}</li>
                          <li className="ListItem">Family Sponsorship Entry: {FamilySponsorship}</li>
                          <li className="ListItem">Visitor Visa Entry: {VisitorVisa}</li>
                        </ul>
                    </div> 

                    <div className="BarCharts">
                        { this.bchart() }  
                    </div>
                    <div className="BarChartInfo">
                        { this.bchartInfo() }
                    </div> 

                </section>
            );
        }
    }
    // [sortable[0][0], sortable[1][0], sortable[2][0], sortable[3][0], sortable[4][0]]


export default Chart;
