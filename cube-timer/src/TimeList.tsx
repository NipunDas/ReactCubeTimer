import './css/TimeList.css';
import { TimeEntry } from './Timer';

function TimeList({ timeList }: { timeList: TimeEntry[]} ) {

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
                timeList.map((entry, index) => 
                    <tr>
                        <td>{index + 1}</td>
                        <td>{entry.time.toFixed(2)}</td>
                        <td>{entry.ao5}</td>
                        <td>{entry.ao12}</td>
                    </tr>
                )
            }
        </table>
    )
}

export default TimeList;