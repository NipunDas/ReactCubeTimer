/*
import { useState, useEffect } from 'react';
interface CSTimerData {
    [sessionName: string]: Array<TimeEntry>;
}

type TimeEntry = [time: [number, number], scramble: string, comment: string, timestamp: number];

// returns the time in seconds, or -1 in the case of a DNF
function getTime(timeEntry: TimeEntry): number {
    if (timeEntry[0][0] < 0) {
        return -1;
    } else {
        return timeEntry[0][0] + timeEntry[0][1]
    }
}

function Histogram() {
    const [data, setData] = useState<CSTimerData>({});

    useEffect(() => {
        d3.json('cstimer_data.txt')
            .then(obj => setData((obj as CSTimerData)))
    }, [])

    const bins = d3.bin().value((d) => )(data.session2)
}

export default Histogram;
*/
