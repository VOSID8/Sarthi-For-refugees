import report from "./Images/report.png"
import styles from "./Styles/PastReports.css"

function PastReports() {
  return (
    <div>
        <h1>VIEW PAST REPORTS</h1>

        <div className={styles.columns}>
            <table>
                <tr>
                    <th>DATE</th>
                    <th>DOCTOR</th>
                    <th>REPORT</th>
                </tr>
                <tr>
                    <td>20/02/2023</td>
                    <td>Tedd</td>
                    <a href="" target="_blank"></a>
                </tr>
                <tr>
                    <td>21/02/2023</td>
                    <td>Ruth</td>
                    <a href="" target="_blank"></a>
                </tr>
                <tr>
                    <td>23/02/2023</td>
                    <td>Jerry</td>
                    <a href="" target="_blank"></a>
                </tr>
                <tr>
                    <td>10/01/2023</td>
                    <td>Jogn</td>
                    <a href="" target="_blank"></a>
                </tr>
                <tr>
                    <td>15/03/2023</td>
                    <td>Shaam</td>
                    <a href="" target="_blank"></a>
                </tr>
            </table>

            <div>
                <img src={report} alt="" />
            </div>
        </div>
    </div>
  )
}

export default PastReports