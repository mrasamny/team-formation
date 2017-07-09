import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(),1000);
  }

  compoenentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date:new Date()
    });
  }

  render() {
    return <span id="time">{this.state.date.toLocaleTimeString()}</span>;
  }
}

class Welcome extends React.Component {
  render() {
    return (
      <h1>
        Hello, {this.props.name}!<br/>
        It is now <Clock />
      </h1>
    );
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn:true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(
      prevState => ({isToggleOn:!prevState.isToggleOn})
    );
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn? 'ON' : 'OFF'}
      </button>
    );
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedOn = props.isLoggedOn;
  if (isLoggedOn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LogController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedOn:false};
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.setState({isLoggedOn:true});
  }

  handleLogoutClick() {
    this.setState({isLoggedOn:false});
  }

  render() {
    const isLoggedOn = this.state.isLoggedOn;
    let button = null;
    if (isLoggedOn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Greeting isLoggedOn={isLoggedOn} />
        {button}
      </div>
    );
  }
}

function ShowList(props) {
  const items = props.items;
  let listItems = items.map(
    (item) => <li key={item.toString()}>{item}</li>
  );

  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
}

ReactDOM.render(<ShowList items={[1,2,3]} />,document.getElementById('root'));
