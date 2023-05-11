import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import axios from 'axios'

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {

        }
    }
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const baseUrl = 'http://127.0.0.1:5000'

const Main = () => {

    const [label, setLabel] = useState('');
    const [dataset, setDataset] = useState([]);

    const [ccy, setCcy] = useState('')
    const [tenor, setTenor] = useState('')

    const data = {
        // labels,
        datasets: [
            {
                label: label,
                data: dataset,
                borderColor: 'rgb(129, 140, 248)',
                backgroundColor: 'rgb(205, 210, 247)',
            },
        ],
    };

    const query = async () => {
        const response = await axios.post(`${baseUrl}/history`, {
            ccy: ccy,
            tenor: tenor
        })

        // console.log(response.data);
        // let historyData = 
        // setDataset(Object.entries(timeAwayData).map(([key, value]) => ({ x: key, y: value })));

        let interval = setInterval(async () => {
            const response = await axios.post(`${baseUrl}/history`, {
                ccy: ccy,
                tenor: tenor
            })
            // console.log(response.data)

        }, 2000);
        return () => {
            clearInterval(interval);
        };
    }

  return (
    <div className="flex flex-col justify-between w-screen">
        <div className='h-3/5'>
            <div className='flex items-end pt-1'>
              <div className="form-control w-full max-w-xs px-5">
                  <label className="label">
                      <span className="label-text">Currency</span>
                  </label>
                      <input type="text" placeholder="e.g. USX" value={ccy} onChange={e => setCcy(e.target.value)} className="input input-bordered input-sm w-full max-w-xs" />
              </div>
              <div className="form-control w-full max-w-xs px-5">
                  <label className="label">
                      <span className="label-text">Tenor</span>
                  </label>
                    <input type="text" placeholder="e.g. 1M" value={tenor} onChange={e => setTenor(e.target.value)} className="input input-bordered input-sm w-full max-w-xs" />
                </div>
                <div className='px-5'>
                      <button onClick={() => query()} class="btn btn-outline btn-sm text-indigo-400 hover:bg-indigo-400 hover:border-indigo-400">go</button>
                </div>
            </div>
            <div className="p-5 w-full">
                <Line options={options} data={data} />
            </div>
        </div>
        <div className="h-2/5 overflow-x-auto w-full">
            <table className="table block overflow-y-scroll w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th className='sticky top-0'>CCY</th>
                        <th className='sticky top-0'>Tenor</th>
                        <th className='sticky top-0'>Position</th>
                        <th className='sticky top-0'>Ask</th>
                        <th className='sticky top-0'>Bid</th>
                        <th className='sticky top-0'>QuoteStatus</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {/* row 1 */}
                    <tr className="hover">
                        <td>CHX</td>
                        <td>1M</td>
                        <td>-3000</td>
                        <td>0.9</td>
                        <td>0.8997</td>
                        <td>TRADABLE</td>
                    </tr>
                    {/* row 2 */}
                    <tr className="hover">
                        <td>JPX</td>
                        <td>1M</td>
                        <td>1000</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>EXCEPTION</td>
                    </tr>
                    {/* row 3 */}
                    <tr className="hover">
                        <td>KRX</td>
                        <td>6M</td>
                        <td>2000</td>
                        <td>1321.9869</td>
                        <td>1321.9866</td>
                        <td>TRADABLE</td>
                    </tr>
                      <tr className="hover">
                          <td>KRX</td>
                          <td>6M</td>
                          <td>2000</td>
                          <td>1321.9869</td>
                          <td>1321.9866</td>
                          <td>TRADABLE</td>
                      </tr>
                      <tr className="hover">
                          <td>KRX</td>
                          <td>6M</td>
                          <td>2000</td>
                          <td>1321.9869</td>
                          <td>1321.9866</td>
                          <td>TRADABLE</td>
                      </tr>
                      <tr className="hover">
                          <td>KRX</td>
                          <td>6M</td>
                          <td>2000</td>
                          <td>1321.9869</td>
                          <td>1321.9866</td>
                          <td>TRADABLE</td>
                      </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Main