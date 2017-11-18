import React, {Component} from 'react'
import './Countdown.scss'

class Countdown extends Component {
  state = {
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  }

  componentDidMount() {
    this.updateClock(this.props.endtime);
    this._timeinterval = setInterval(this.updateClock, 1000);
  }

  getTimeRemaining() {
    
    const t = Date.parse(this.props.endtime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  updateClock = () => {
    const t = this.getTimeRemaining(this.props.endtime);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }

    this.setState({
      days: t.days,
      hours: `0${t.hours}`.slice(-2),
      minutes: `0${t.minutes}`.slice(-2),
      seconds: `0${t.seconds}`.slice(-2)
    })
  }

  render() {
    const {title, date} = this.props;
    const {days, hours, minutes, seconds} = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <div className='clockdiv'>
          <div>
            <span className='days'>{days}</span>
            <div className='smalltext'>Days</div>
          </div>
          <div>
            <span className='hours'>{hours}</span>
            <div className='smalltext'>Hours</div>
          </div>
          <div>
            <span className='minutes'>{minutes}</span>
            <div className='smalltext'>Minutes</div>
          </div>
          <div>
            <span className='seconds'>{seconds}</span>
            <div className='smalltext'>Seconds</div>
          </div>
        </div>     
      </div> 
    )
  }
}

export default Countdown
