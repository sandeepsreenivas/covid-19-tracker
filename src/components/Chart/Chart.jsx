import React, { useState, useEffect } from 'react';

import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';

const Chart = ( { data: { confirmed, recovered, deaths }, country, active } ) => {

    //let activeCases = confirmed.value - (deaths.value + recovered.value);


    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length ? 
        (<Line 
            data={{
                labels: dailyData.map(({ date }) => date) ,
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true 
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true
                }]
            }}
        />) : null
    );

    //const activeCases = confirmed.value - (deaths.value + recovered.value);

    const barChart = (
        confirmed ? 
        (
            <Bar 
                data={{
                    labels: ['Infected', 'Active', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(108, 117, 125, 0.5)'
                        ],
                        data: [confirmed.value, active, recovered.value, deaths.value] 
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current Situation in ${country}` }
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            { country ? barChart : lineChart }
        </div>
    );
}

export default Chart;