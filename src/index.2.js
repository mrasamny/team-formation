import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';

const scaleName = {
  'c': 'Celsius',
  'f': 'Farenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilerVerdict(props) {
  const temp = props.temperature;
  if (temp >= 100) {
    return <b>The water will boil!</b>;
  }
  return <b>The water will NOT boil!</b>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onTemperatureChange(e.target.value)
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleName[scale]}</legend>
        <input value={temperature} onChange={this.handleClick} />
      </fieldset>
    );
  }
}

function FancyBorder(props) {
  return (
    <div className="fancyBorder">
      {props.children}
    </div>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature:'',
      scale:'c'
    };
    this.handleFareheitChange = this.handleFareheitChange.bind(this);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
  }

  handleFareheitChange(farenheit) {
    this.setState({
      temperature: farenheit,
      scale: 'f'
    });
  }

  handleCelsiusChange(celsius) {
    this.setState({
      temperature: celsius,
      scale: 'c'
    });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.state.scale;
    const farenheit = scale === 'c'?tryConvert(temperature,toFahrenheit):temperature;
    const celsius = scale === 'f'?tryConvert(temperature,toCelsius):temperature;
    return (
      <FancyBorder>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={farenheit} onTemperatureChange={this.handleFareheitChange} />
        <BoilerVerdict temperature={celsius} />
    </FancyBorder>
    );
  }
}

ReactDOM.render(<Calculator />,document.getElementById('root'));
