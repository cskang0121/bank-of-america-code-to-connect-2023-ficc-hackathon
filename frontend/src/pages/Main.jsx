/* eslint-disable no-unused-vars */
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

    const [label2, setLabel2] = useState('');
    const [dataset2, setDataset2] = useState([]);

    const [label3, setLabel3] = useState('');
    const [dataset3, setDataset3] = useState([]);

    const [tableData, setTableData] = useState([]);

    const [ccy, setCcy] = useState('')
    const [tenor, setTenor] = useState('')

    const [intervalState, setIntervalState] = useState(0)

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

    const data2 = {
        // labels,
        datasets: [
            {
                label: label2,
                data: dataset2,
                borderColor: 'rgb(50, 168, 82)',
                backgroundColor: 'rgb(186, 227, 197)',
            },
        ],
    };

    const data3 = {
        // labels,
        datasets: [
            {
                label: label3,
                data: dataset3,
                borderColor: 'rgb(222, 57, 16)',
                backgroundColor: 'rgb(230, 165, 149)',
            },
        ],
    };

    const query = async () => {
        clearInterval(intervalState);
        const response = await axios.post(`${baseUrl}/history`, {
            ccy: ccy,
            tenor: tenor
        })

        // console.log(response.data);
        setTableData(response.data);
        let historyDataX = response.data.map((item) => item.EventId);
        let historyDataY = response.data.map((item) => item.Ask);
        let historyDataY2 = response.data.map((item) => item.Bid);
        // let historyDataY3 = response.data.map((item) => (item.Ask - item.Bid));

        let historyData = {};
        for (let i = 0; i < historyDataX.length; i++) {
            historyData[historyDataX[i]] = historyDataY[i];
        }
        // console.log(historyData)
        setLabel(`${ccy} ${tenor} Ask`);
        setDataset(Object.entries(historyData).map(([key, value]) => ({ x: key, y: value })));

        historyData = {};
        for (let i = 0; i < historyDataX.length; i++) {
            historyData[historyDataX[i]] = historyDataY2[i];
        }

        setLabel2(`${ccy} ${tenor} Bid`);
        setDataset2(Object.entries(historyData).map(([key, value]) => ({ x: key, y: value })));

        historyData = {};
        for (let i = 0; i < historyDataX.length; i++) {
            historyData[historyDataX[i]] = historyDataY[i] - historyDataY2[i];
        }

        setLabel3(`${ccy} ${tenor} Ask - Bid`);
        setDataset3(Object.entries(historyData).map(([key, value]) => ({ x: key, y: value })));

        setIntervalState(setInterval(async () => {
            const response = await axios.post(`${baseUrl}/history`, {
                ccy: ccy,
                tenor: tenor
            })
            // console.log(response.data)
            setTableData(response.data);
            let historyDataX = response.data.map((item) => item.EventId);
            let historyDataY = response.data.map((item) => item.Ask);
            let historyDataY2 = response.data.map((item) => item.Bid);

            let historyData = {};
            for (let i = 0; i < historyDataX.length; i++) {
                historyData[historyDataX[i]] = historyDataY[i];
            }
            // console.log(historyData)
            setLabel(`${ccy} ${tenor} Ask`);
            setDataset(Object.entries(historyData).map(([key, value]) => ({ x: key, y: value })));

            historyData = {};
            for (let i = 0; i < historyDataX.length; i++) {
                historyData[historyDataX[i]] = historyDataY2[i];
            }

            setLabel2(`${ccy} ${tenor} Bid`);
            setDataset2(Object.entries(historyData).map(([key, value]) => ({ x: key, y: value })));

            historyData = {};
            for (let i = 0; i < historyDataX.length; i++) {
                historyData[historyDataX[i]] = historyDataY[i] - historyDataY2[i];
            }

            setLabel3(`${ccy} ${tenor} Ask - Bid`);
            setDataset3(Object.entries(historyData).map(([key, value]) => ({ x: key, y: value })));

        }, 2000));
        return () => {
            clearInterval(intervalState);
        };
    }

  return (
    <div className="flex flex-col justify-between w-screen"
    style={{
        height: '91vh'
    }}
    >
        <div className='h-4/6 max-h-4/6 block overflow-y-scroll '>
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
                      <button onClick={() => query()} className="btn btn-outline btn-sm text-indigo-400 hover:bg-indigo-400 hover:border-indigo-400">go</button>
                </div>
            </div>
            <div className="p-5 w-full">
                <Line options={options} data={data3} />
            </div>

            <div className="p-5 w-full">
                <Line options={options} data={data2} />
            </div>

            <div className="p-5 py-6 w-full">
                <Line options={options} data={data} />
            </div>
        </div>
        <div className="h-2/6 overflow-x-auto w-full">
            <table className="table block overflow-y-scroll flex flex-col-reverse w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th className='sticky top-0'>Event ID</th>
                        <th className='sticky top-0'>CCY</th>
                        <th className='sticky top-0'>Tenor</th>
                        <th className='sticky top-0'>Position</th>
                        <th className='sticky top-0'>Ask</th>
                        <th className='sticky top-0'>Bid</th>
                        <th className='sticky top-0'>QuoteStatus</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => 
                        <tr key={index} className="hover">
                            <td>{item.EventId}</td>
                            <td>{item.Ccy}</td>
                            <td>{item.Tenor}</td>
                            <td>{item.Position}</td>
                            <td>{item.Ask}</td>
                            <td>{item.Bid}</td>
                            <td>{item.QuoteStatus}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Main