import React, { Component } from 'react';    
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import App from './App';
import Home from './components/Home';

class App2 extends Component {
    render() { 
        return ( 
            <div>
                <Router>
                    <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/todo">Todo List</Link>
                                </li>   
                                <li className="nav-item">
                                    <Link className="nav-link" to="/movies">Movies</Link>
                                </li>                 
                            </ul>
                        
                        </div>
                    </nav>
                    <Switch>
                        <Route path="/" exact> <Home /> </Route>
                        <Route path="/login"> <Signin /> </Route>
                        <Route path="/todo"> <App /></Route> 
                        <Route path="/movies"> <Movies /></Route>          
                    </Switch>
                </Router>
            </div>
         );
    }
}

class Signin extends React.Component {

    constructor() {
        super();
        this.state= {
            email: "",
            password: "",
            message: ""
        }
    }
    Signin = () => {
        const data= {
            email: this.state.email,
            password: this.state.password
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch('https://reqres.in/api/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.error)
            this.setState({ message: data.error })
        });
}

    changeInput=(e)=>{
        let statepropname = e.target.name;
        this.setState({[statepropname]:e.target.value})
    }
    render() { 
        return ( 
            <div className="signin">
                <h1 className="login">Login Page</h1>
                Email <input type="email" value={this.state.email} name="email" onChange={this.changeInput} />
                <br/>
                Password <input type="password" value={this.state.password} name="password" onChange={this.changeInput} />
                <br/>
                <button onClick={this.Signin} >Login</button>
                <div>
                    {this.state.message}
                </div>
            </div>
         );
    }
}

class Movies extends React.Component {
    constructor() {
        super();
        this.state= {data: []} 
    }

    componentDidMount() {
        fetch('https://reqres.in/api/users?page=2')
        .then(response => response.json())
        .then(data => {
            this.setState({ data: data.data })
        });
    }

    render() { 
        return ( 
            <div>
                { this.state.data.map((item) => <img key={item.id} src={item.avatar} alt="" />)}
            </div>
         );
    }
}
 
export default App2;
