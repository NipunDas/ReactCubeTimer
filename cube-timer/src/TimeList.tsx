import './css/TimeList.css';
import { TimeEntry } from './Timer';

function TimeList({ timeList }: { timeList: TimeEntry[]} ) {
    timeList = [
        {time: 1, ao5: 1, ao12: 1},
        {time: 2, ao5: 2, ao12: 2},
        {time: 3, ao5: 3, ao12: 3},
    ]

    return (
        <table>
            <tr>
                <th>#</th>
                <th>Time</th>
                <th>ao5</th>
                <th>ao12</th>
                <th>Delete</th>
            </tr>
            {
                timeList.map(entry => 
                    <tr>
                        <td>{entry.time}</td>
                        <td>{entry.ao5}</td>
                        <td>{entry.ao12}</td>
                    </tr>
                )
            }
        </table>
    )
}

export default TimeList;