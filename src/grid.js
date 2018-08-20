import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';
import axios from 'axios';

const Example = React.createClass({
    getInitialState() {
        //this.state._rows = [];
        this._columns = [
            { key: 'date', name: 'Date' },

            { key: 'open', name: 'Open' },
            { key: 'low', name: 'Low' },
            { key: 'high', name: 'High' },
            { key: 'close', name: 'Close' },
            { key: 'position', name: 'Position' }, ];

        return {_rows:[]};
    },


    componentWillMount() {
        const self = this;
        axios.get(`http://localhost:4000`)
            .then(function (response) { console.log(response);
                var info = [];
                var higherCount = 0;
                var lowerCount = 0;
                var noChangecount = 0;
                var newHigh = 0;

                response.data.forEach(function (entry) {
                    info.push({date: entry.date, price: entry.open, open: entry.open, low: entry.low, high: entry.high, close: entry.close});

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

                   // self._rows=info;
                   // self.forceUpdate();

                });
                   // data = response.data.datatable.data;console.log(data);

                self.setState({_rows:info});
            }/*console.log(response)*/)

    },

   /* createRows() {


        this.state._rows = [];
    },*/

    rowGetter(i) {
        return this.state._rows[i];
    },

    render() {
        return  (
            <ReactDataGrid
                columns={this._columns}
                rowGetter={this.rowGetter}
                rowsCount={this.state._rows.length}
                minHeight={500} />);
    }
});

/*ReactDOM.render(
    <Example />,
    document.getElementById('container')
);*/

export default Example;
