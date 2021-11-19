import { FunctionComponent } from 'react'

import { Doughnut } from 'react-chartjs-2'

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
}

const Statistics: FunctionComponent = () => (
    <div style={{margin: '16px', width: '90vw', height: 'fit-content'}}>
        <div className='header'>
            <h3 className='title'>Chart 1</h3>
        </div>
        <Doughnut data={data} style={{width: '1em', height: '1em'}}/>

        <div className='header mt-3'>
            <h3 className='title'>Chart 2</h3>
        </div>
        <Doughnut data={data} style={{width: 'auto', height: 'auto', marginBottom: '76px'}}/>
    </div>

)
export default Statistics
