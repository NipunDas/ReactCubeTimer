import { useState, useRef, useEffect } from 'react';
import './css/Timer.css';
import TimeList from './TimeList';

export interface TimeEntry {
	time: number;
	ao5: number;
	ao12: number;
    timestamp: number;
}

function Timer() {
    const [ startTime, setStartTime ] = useState<number>(0);
    const [ now, setNow ] = useState<number>(0);
    const [ timing, setTiming ] = useState<boolean>(false); // used to prevent back-to-back triggering of timer
    const [ keyDown, setKeyDown ] = useState<boolean>(false); // To avoid key press repeats when holding down space, event.repeat is buggy
    const [ timeColor, setTimeColor ] = useState<string>("black");

    const [ timeList, setTimeList ] = useState<TimeEntry[]>([]);

    const timerInterval = useRef<NodeJS.Timeout>();

    let time: number = 0;
    if (startTime != null && now != null) {
        time = (now - startTime) / 1000;
    }

    function startTimer() {
        setStartTime(Date.now());
        setNow(Date.now());

        // clearInterval(timerInterval.current);
        timerInterval.current = setInterval(() => {
            setNow(Date.now());
        }, 10);
    }
    
    function endTimer() {
        clearInterval(timerInterval.current);
        setTimeList([
            ...timeList,
            {
                time: time,
                ao5: 0,
                ao12: 0,
                timestamp: now,
            }
        ])
    }
    
    function handleKeyDown(event: KeyboardEvent) {
        if (keyDown) {
            return;
        }

        setKeyDown(true);
        if (timing) {
            endTimer();
        } else if (event.key === ' ') {
            setTimeColor('green');
        }
    }
    
    function handleKeyUp(event: KeyboardEvent) {
        if (event.key === ' ' && !timing) {
            setTiming(true);
            startTimer();
            setTimeColor('black');
        } else if (timing) {
            setTiming(false);
        }
        setKeyDown(false);
    }

    function handleDelete(index: number) {
        setTimeList(
            timeList.filter((entry, i: number) => {
                return i !== index;
            })
        )
    }

    useEffect(() => {
        // I don't know if this is good in React but hopefully it is
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    });

    return (
        <div>
            <div className="timer" style={{color: timeColor}}>{time.toFixed(1)}</div>
            <TimeList timeList={timeList} onDelete={handleDelete}/>
        </div>
    );
}

export default Timer;