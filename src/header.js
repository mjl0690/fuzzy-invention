import React, {Component} from 'react';
import './App.css';
import stocklogo from './stocklogo.PNG'

class Header extends Component {

    constructor() {
        super();
        this.state={data:[]};
    }

    render() {
var style={ padding: 0, borderBottom: '2px solid black',
maxWidth: '100%',
maxHeight: '100%'};
        return (
            <div>
                <div>
                    <nav className="navbar navbar-default">
                        <div style={{borderBottom: '2px solid black'}} className="container-fluid">

                            <div  className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button><div>
                                <a href="#">logo {/*<img src={stocklogo}></img>*/}</a>
                            </div>
                            </div>


                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                                    <li><a href="#">Link</a></li>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">Action</a></li>
                                            <li><a href="#">Another action</a></li>
                                            <li><a href="#">Something else here</a></li>
                                            <li role="separator" className="divider"></li>
                                            <li><a href="#">Separated link</a></li>
                                            <li role="separator" className="divider"></li>
                                            <li><a href="#">One more separated link</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                <form className="navbar-form navbar-left">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Search"></input>
                                    </div>
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </form>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="#">Link</a></li>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">Action</a></li>
                                            <li><a href="#">Another action</a></li>
                                            <li><a href="#">Something else here</a></li>
                                            <li role="separator" className="divider"></li>
                                            <li><a href="#">Separated link</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

        );
    }

    componentWillMount() {


    }
}



export default Header;