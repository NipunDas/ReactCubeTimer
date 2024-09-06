import './css/TimeList.css';
import { TimeEntry } from './Timer';

function TimeList({ timeList, onDelete }: { timeList: TimeEntry[], onDelete: (index: number) => void} ) {

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Time</th>
                    <th>ao5</th>
                    <th>ao12</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    timeList.map((entry, index) => 
                        <tr key={entry.timestamp}>
                            <td>{index + 1}</td>
                            <td>{entry.time.toFixed(2)}</td>
                            <td>{entry.ao5}</td>
                            <td>{entry.ao12}</td>
                            <td>
                                <button onClick={() => onDelete(index)}>X</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
            
        </table>
    )
}

export default TimeList;