
import React, {Component} from 'react';
import Chart from 'react-apexcharts';

import requestServer from "./RequestServer";
import {Button,UncontrolledButtonDropdown,ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';

//
class ApexChart extends Component {
    constructor(props) {
        super(props);


        this.handleSubmit = this.handleSubmit.bind(this);


        this.setCountry = this.setCountry.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.state = {
                go: "go",
                goProv: "go",
                showGraph: false,
                showGraphProv: false,
                statusProvince:"Select Status",
                province: "Select Province",
                country:"Select Country",
                status:"Select Status",
                series: [{
                    name: "active cases",
                    data:[]//************Here ***************** is where you set the Y data
                }],
                options: {
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },

                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Canada confirmed',
                        align: 'center'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: [ ],////Here ***************** is where you set the X data
                    }
                },

            }
    }

    componentDidMount() {

        //this.getData();
        //need to retrun it as 2arrays;
    }
    async getData(country,status) {//button onclick the make a request to something.

        var response = await requestServer.getCoronaByCountryStatus(country, status);
        console.log(response.data);
        this.updateGraphData(response.data)
    }


    updateGraphData(controllerCall) {

        var options = {...this.state.options};
        //options.xaxis.categories = this.formatDate(controllerCall.dates);
        options.xaxis.categories = controllerCall.dates;

        this.setState( options);

        var series = {...this.state.series};
        series[0].data = controllerCall.values;
        series[0].name = this.state.status;;


        this.setState( series);

        this.setState(state => ({ showGraph: !state.showGraph    }))

    }


    handleSubmit() {

        this.getData(this.state.country,this.state.status);
        if(this.state.go === "reset") {
            this.setState(state => ({go: "go"}));
        }else if (this.state.go === "go" ) {
            this.setState(state => ({go: "reset"}));
        }


        var options = {...this.state.options};
        options.title.text = this.state.country + " " + this.state.status;

        this.setState( options);
        //await this.sleep(3000);

    }

    setCountry(countryName){
        this.setState(state => ({ country: countryName  }));

    }
    setStatus(statusType) {
        this.setState(state => ({ status:statusType}));

    }

    

    render() {
        let graph;//conditions?
        graph = <Chart options = {this.state.options} series = {this.state.series} type="line" height={350} />

        return (
            <div id="chart">

                {/************** Country drop down*/}


                <UncontrolledButtonDropdown>
                    <DropdownToggle caret>
                        {this.state.country}
                    </DropdownToggle>

                    <DropdownMenu right>
                        <DropdownItem onClick={() => this.setCountry("Canada") }>Canada</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("US")}>US</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("China")}>China</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("korea-south")}>S.Korea</DropdownItem>

                        <DropdownItem onClick={() => this.setCountry("Austria")}>Austria</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("Belgium")}>BelGium</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("Brazil")}>Brazil</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("France")}>France</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("Germany")}>Germany</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("Italy")}>Italy</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("Iran")}>Iran</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("Spain")}>Spain</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("Switzerland")}>Switzerland</DropdownItem>
                        <DropdownItem onClick={() => this.setCountry("United-Kingdom")}>UK</DropdownItem>


                        <DropdownItem> </DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>

                {/*************** Status drop down*/}
                <UncontrolledButtonDropdown>
                    <DropdownToggle caret>
                        {this.state.status}
                    </DropdownToggle>

                    <DropdownMenu right>
                        <DropdownItem onClick={() => this.setStatus("confirmed")}> confirmed </DropdownItem>
                        <DropdownItem onClick={() => this.setStatus("recovered")}> recovered </DropdownItem>
                        <DropdownItem onClick={() => this.setStatus("deaths")}> deaths </DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>

                <Button color="primary" onClick={() => this.handleSubmit()}>{this.state.go}</Button>{' '}
                <Link  to="/CovidStatsCanada">Canada search</Link>
                {this.state.showGraph ?
                    <Chart options = {this.state.options} series = {this.state.series} type="line" height={350} /> :
                    null
                }

            </div>
        )
    }
}


export default ApexChart;