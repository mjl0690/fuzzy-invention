import React, {Component} from 'react';
import './bower_components/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import Example from './grid.js';
import bsholes from './bsholes.PNG';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';
//var ReactDOM = require('react-dom');
var data;
class App extends Component {

    constructor() {
        super();
        this.state = {data: [], higherCount: 0, lowerCount: 0, noChangecount: 0};
    }

    render() {
        var style = {
           backgroundColor:'lightgray'
        }; var style2 = {

        };
        return (
            <div className="App">
                <Header></Header>

                {/*<h1> Black Scholes </h1>*/}
                {/*<img style={style} alt="" src={bsholes}></img>*/}
                {/*
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-2"> Stock Quote: </label>
                        <div className="col-sm-2"><input type="text"></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2"> Stock Price: </label>
                        <div className="col-sm-2"><input type="text"></input></div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2"> Strike Price: </label>
                        <div className="col-sm-2"><input type="text"></input></div>
                    </div>
                    <div className="form-group">

                        <label className="control-label col-sm-2"> Risk Free Interest Rate: </label>
                        <div className="col-sm-2"><select></select></div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2"> Time until Expiration: </label>
                        <div className="col-sm-2"><input type="text"></input></div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2"> Implied Volatility </label>
                        <div className="col-sm-2"><input type="text"></input></div>
                    </div>
                </form>*/}
                <Example />
                {/*<div>
                    <div className="col-md-2">Date</div>
                    <div className="col-md-2">Open</div>
                    <div className="col-md-2">Low</div>
                    <div className="col-md-2">High</div>
                    <div className="col-md-2">Close</div>
                    <div className="col-md-2">Position</div>
                </div>*/}
                {/*<div>  {this.state.data.map(function (data,index) {
                    console.log(data);
                    return (

                        <div id="root" >
                            <div className="col-md-2" style={index % 2 === 0 ? style:style2}>  {data.date} </div>
                            <div className="col-md-2" style={index % 2 === 0 ? style:style2}>  {data.price} </div>
                            <div className="col-md-2" style={index % 2 === 0 ? style:style2}>  {data.low} </div>
                            <div className="col-md-2" style={index % 2 === 0 ? style:style2}>  {data.high} </div>

                            <div className="col-md-2"> {data.close} </div>
                            <div className="col-md-2" style={data.newHigh ? {backgroundColor:'yellow'} : null}>  {data.position} </div>
                        </div>


                    )
                })}</div>*/}
<hr />
<div> Higher: {this.state.higherCount}  Lower: {this.state.lowerCount} No Change: {this.state.noChangecount} Percent Higher: {(this.state.higherCount/(this.state.higherCount + this.state.lowerCount)).toFixed(4)*100}Percent Lower: {(100 -(this.state.higherCount/(this.state.higherCount + this.state.lowerCount)).toFixed(4)*100)} </div>
    </div>
        );
    }

    componentWillMount() {
        const self = this;
        se
            .then(function (response) { console.log(response);
                var info = [];
                var higherCount = 0;
                var lowerCount = 0;
                var noChangecount = 0;
                var newHigh = 0;

                response.data.forEach(function (entry) {
                    info.push({date: entry.date, price: entry.open, open: entry.open, low: entry.low, high: entry.high, close: entry.close});

                })

                info.forEach(function(entry, index, array) {console.log(entry);
                    if(index === 0) {
                        entry.position = 'first';
                        return;
                    }
                var newValue = array[index].price;
                var oldValue = array[index-1].price;







                    if(array[index].price > array[index-1].price){

                        entry.position = 'higher ('+((Math.abs(newValue - oldValue)/oldValue)*100).toFixed(2)+'%)';
                        higherCount++;
                        if(newHigh < array[index].price)
                            entry.newHigh = array[index].price;
                        newHigh=  newHigh > array[index].price ? newHigh : array[index].price;


                        return;
                    }
                    if(array[index].price < array[index-1].price){

                        entry.position = 'lower ('+((Math.abs(newValue - oldValue)/oldValue)*100).toFixed(2) +'%)';
                        lowerCount++;
                        if(newHigh < array[index].price)
                            entry.newHigh = array[index].price;

                        newHigh=  newHigh > array[index].price ? newHigh : array[index].price;


                        return;
                    }
                    if(array[index].price === array[index-1].price){

                        entry.position = 'no change';
                        noChangecount++;
                        newHigh=  newHigh > array[index].price ? newHigh : array[index].price;

                    }



                })
                // data = response.data.datatable.data;console.log(data);
                self.setState({data: info, higherCount: higherCount, lowerCount: lowerCount, noChangecount: noChangecount});
            }/*console.log(response)*/)

    }
}

//ReactDOM.render(<App />, document.querySelector("#root"));

export default App;
