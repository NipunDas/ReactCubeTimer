import React from 'react';
import { useState } from 'react';
import './css/Timer.css'

interface TimeEntry {
	time: string;
	ao5: string;
	ao12: string;
}

function Timer() {
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ timing, setTiming ] = useState<boolean>();
    let time;

    function startTimer() {
        setStartDate(new Date());
        setTiming(true);
    }
    
    function endTimer() {
        if (timing) {
            time = ((new Date().getTime() - startDate.getTime()) / 1000).toFixed(2);
        }
    }

    return (
        <div>
            <div className="timer">{time}</div>
            <button onClick={startTimer}>start</button>
            <button onClick={endTimer}>end</button>
        </div>
    );
}

export default Timer;