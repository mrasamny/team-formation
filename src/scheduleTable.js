import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function ScheduleTableHeader(props) {
    const dow = props.daysOfWeek;
    let rowHeader = [];
    rowHeader.push(<th key="Time" >Time</th>); //column to hold the time
    dow.forEach((day) => {
        rowHeader.push(
          <th key={day} className="schedule-header">
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </th>
        )
    });
    return (
      <thead>
        <tr>{rowHeader}</tr>
      </thead>
    );
}

class ScheduleTableRows extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {};
  }

  handleClick(rowName,colName) {
    let row = this.state[rowName]?this.state[rowName]:{};
    row[colName] = !row[colName]?'X':'';
    this.setState({[rowName]:row});
    console.log("clicked on "+rowName.toString()+","+colName.toString());
    console.log(this.state);
  }

  render() {
    const schema = this.props.schema;
    const numOfColumns = schema.daysOfWeek.length;
    const timeSlots = schema.timeSlots;

    let rows = [];
    for(let timeSlot of timeSlots) {
        let row = [];
        row.push(<th key="timeSlot">{timeSlot}</th>);
        for (let i = 0; i < numOfColumns; i++) {
          let day = schema.daysOfWeek[i];
          let value = '';
          if (this.state[day]){
            if (this.state[day][timeSlot]){
              value = this.state[day][timeSlot];
            }
          }
          row.push(
            <td key={schema.daysOfWeek[i]} onClick={() => this.handleClick(timeSlot,day)}>
              {this.state[timeSlot]?this.state[timeSlot][day]:''}
            </td>
          );
        }
        rows.push(<tr key={timeSlot}>{row}</tr>);
    }
    return (<tbody>{rows}</tbody>);
  }
}

function ScheduleTable(props) {
  return(
    <form>
      <table>
        <ScheduleTableHeader daysOfWeek={props.schema.daysOfWeek}/>
        <ScheduleTableRows schema={props.schema} />
      </table>
    </form>
  );
}

var schema = {
  daysOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
  timeSlots: ['8am - 9am','9am - 10am','10am - 11am','11am - 12pm']
};

ReactDOM.render(<ScheduleTable schema={schema}/>,document.getElementById('root'));
