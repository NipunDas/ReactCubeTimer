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
    const [ time , setTime ] = useState<string>('0');
    const [ timerInterval, setTimerInterval ] = useState<NodeJS.Timeout>();

    function updateCurrentTime() {
        setTime(((new Date().getTime() - startDate.getTime()) / 1000).toFixed(2));
    }

    function startTimer() {
        if (!timing) {
            setStartDate(new Date());
            setTimerInterval(setInterval(() => {
                setTime((((new Date()).getTime() - startDate.getTime()) / 1000).toFixed(1));
            }, 10));
            setTiming(true);
        }
    }
    
    function endTimer() {
        if (timing) {
            clearInterval(timerInterval);
            updateCurrentTime();
            setTiming(false);

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