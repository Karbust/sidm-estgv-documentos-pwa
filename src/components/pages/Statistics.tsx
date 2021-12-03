import { FunctionComponent, useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { ChartData } from 'chart.js'

import '../../css/Statistics.css'

import IndexedDb from '../../indexedDb'
import ProgressBar from '../ProgressBar'
import { useOnlineStatus } from '../../lib/useOnlineStatus'
import { getAllDocs, humanFileSize, parseFileExtensions } from '../../functions'

interface fileExtentionsType {
    extension: string
    count: number
    color: string
}

const Statistics: FunctionComponent = () => {
    const isOnline = useOnlineStatus()

    const indexedDb = new IndexedDb('statistics')
    const [totalSize, setTotalSize] = useState<number>(0)
    const [fileExtensionsCount, setFileExtensionsCount] = useState<fileExtentionsType[]>([])

    const [data, setData] = useState<
    ChartData<'doughnut', number[], string> |((canvas: HTMLCanvasElement) => ChartData<'doughnut', number[], string>)
    >({
            labels: [],
            datasets: [{
                label: '# of Votes',
                data: [],
                backgroundColor: [],
                borderColor: '#ffffff',
                borderWidth: 2,
            }]
        })

    useEffect(() => {
        if (isOnline) {
            getAllDocs()
                .then(async (querySnapshot) => {
                    await indexedDb.createObjectStore(['statistics'])

                    querySnapshot.forEach((doc) => {
                        const document = doc.data()
                        setTotalSize((oldValue) => oldValue + document.size)

                        parseFileExtensions(indexedDb, document, fileExtensionsCount)
                            .then(setFileExtensionsCount)
                            .catch(console.error)
                    })
                })
                .catch(console.error)
        }
    }, [])

    useEffect(() => {
        if (isOnline) {
            localStorage.setItem('totalStorage', String(totalSize))
        }
    }, [totalSize])

    useEffect(() => {
        (async () => {
            await indexedDb.createObjectStore(['statistics'])
            let valuesChart: fileExtentionsType[]
            if (isOnline) {
                valuesChart = fileExtensionsCount
            } else {
                const valuesDb: fileExtentionsType[][] = await indexedDb.getAllValue('statistics')
                valuesChart = valuesDb.at(-1) ?? []
                setTotalSize(Number(localStorage.getItem('totalStorage') ?? 0))
            }
            setData({
                labels: valuesChart.map((value) => value.extension),
                datasets: [{
                    label: '# of Votes',
                    data: valuesChart.map((value) => value.count),
                    backgroundColor: valuesChart.map((value) => value.color),
                    borderWidth: 2,
                }]
            })
        })()
    }, [fileExtensionsCount])

    return (
        <div style={{ margin: '16px', width: '90vw', height: 'fit-content' }}>
            <div className='card charCard2'>
                <div className='card-body'>
                    <h5 className='card-title' style={{ fontSize: '1em', color: 'white' }}>Available Space</h5>
                    <p className='card-text'>
                        <ProgressBar bgColor='#0178D4' completed={(totalSize * 100) / 5000000000} />
                    </p>
                    <h6 className='card-subtitle mb-2' style={{ float: 'right', fontSize: '0.8em', color: 'white' }}>
                        {humanFileSize(totalSize, true)}
                        {' '}
                        used of
                        {' '}
                        {humanFileSize(5000000000, true)}
                    </h6>
                </div>
            </div>

            <div className='card-title' style={{ fontSize: '1.3em' }}>Types of File on your Cloud</div>
            <p className='card-text'>
                <Doughnut data={data} />
            </p>
        </div>

    )
}
export default Statistics
