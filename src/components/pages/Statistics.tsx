import { useState } from 'react'
import { FunctionComponent } from 'react'
import { Doughnut } from 'react-chartjs-2'

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'

import '../../css/Statistics.css'

import ProgressBar from '../progress-bar.component'

const testData = [
    { bgcolor: '#E40B0B', completed: 70 }
]

const data = {
    labels: ['.PDF', '.docx', '.png', '.ppx', '.xls', '.jpeg'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#E40B0B',
                '#4895ef',
                '#7209b7',
                '#ffb703',
                '#38b000',
                '#b76935',
            ],
            borderColor: [
                '#ffffff',
                '#ffffff',
                '#ffffff',
                '#ffffff',
                '#ffffff',
                '#ffffff',
            ],
            borderWidth: 2,
        },
    ],
    options: {
        legend: {
            labels: {
                fontColor: "blue",
                fontSize: 18
            }
        },
    }
}

const Statistics: FunctionComponent = () => (
    <div style={{ margin: '16px', width: '90vw', height: 'fit-content' }}>
        <div className='card charCard2'>
            <div className='card-body'>
                <h5 className='card-title' style={{ fontSize: '1em', color: 'white'}}>Available Space</h5>
                <p className='card-text'>
                    {testData.map((item, idx) => (
                        <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                    ))}
                </p>
                <h6 className='card-subtitle mb-2' style={{ float: 'right', fontSize: '0.8em', color: 'white' }}>2.3 GB used of 5 GB</h6>
            </div>
        </div>

        {/*<div className='header mt-3'>
            <h3 className='title'>Chart 2</h3>
        </div>
        <Doughnut data={data} style={{ width: 'auto', height: 'auto', marginBottom: '76px' }} />*/}


        <div className='card-title' style={{ fontSize: '1.3em'}}>Types of File on your Cloud</div>
        <p className='card-text'>
            <Doughnut data={data} />
        </p>
    </div>

)
export default Statistics
