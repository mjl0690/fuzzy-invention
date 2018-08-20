import React, {Component} from 'react';
import './bower_components/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import Example from './grid.js';
import bsholes from './bsholes.PNG';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';

var data;
class App extends Component {
    constructor() {
        super();
        this.state = {data: [], higherCount: 0, lowerCount: 0, noChangecount: 0};
    }

    render() {
        return (
            <div className="App">
                <Header></Header>
                <Example />
             
<hr />
<div> Higher: {this.state.higherCount}
  Lower: {this.state.lowerCount}
   No Change: {this.state.noChangecount}
    Percent Higher:
     {(this.state.higherCount/(this.state.higherCount + this.state.lowerCount)).toFixed(4)*100}
     Percent Lower: {(100 -(this.state.higherCount/(this.state.higherCount + this.state.lowerCount)).toFixed(4)*100)}
      </div>
    </div>
        );
    }

    componentWillMount() {
        const self = this;
        axios.get('http://localhost:4000')
            .then(function (response) { console.log(response);
                var info = [];
                var higherCount = 0;
                var lowerCount = 0;
                var noChangecount = 0;
                var newHigh = 0;
                var closeLow;
                var closeDateLow;
                var closeHigh;
                var closeDateHigh;

                function start(start, end){
                    for(var i=start; i<end; i++){
                        if(!closeLow && response.data[i] ){
                       closeLow = response.data[i].low;
                       closeDateLow = response.data[i].date;
                       closeHigh = response.data[i].high;
                       closeDateHigh = response.data[i].date;
                        }
    
                       if( response.data[i] && closeLow > response.data[i].low){
                       closeLow = response.data[i].low;
                       closeDateLow = response.data[i].date;;
                       }

                       if ( response.data[i] && closeHigh < response.data[i].high){
                           closeHigh=response.data[i].high;
                           closeDateHigh=response.data[i].date;
                       }
                    }
    console.log('High:', closeDateHigh, closeHigh, 'Low:', closeDateLow, closeLow);
    closeDateLow = closeLow = closeHigh = closeDateHigh= undefined;
                }
                for(var j=0; j< Math.ceil(response.data.length/391); j++){
                start(391*j,391*(j+1));
                
                }
     
                response.data.forEach(function (entry) {
                    info.push({date: entry.date,
                         price: entry.open,
                          open: entry.open,
                           low: entry.low,
                            high: entry.high,
                             close: entry.close});

                })

                info.forEach(function(entry, index, array) {
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
             
                self.setState({data: info, higherCount: higherCount, lowerCount: lowerCount, noChangecount: noChangecount});
            })

    }
}
export default App;