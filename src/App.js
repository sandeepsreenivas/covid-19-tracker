import React from 'react';

import Cards from './components/Cards/Cards';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Chart from './components/Chart/Chart';

import styles from './App.module.css';
import logo from './images/logo.png';

import { fetchData } from './api/index';

class App extends React.Component {

    state = {
        data: {},
        country: '',
        active: ''
    }

    async componentDidMount() {
        const data = await fetchData();
        this.setState({ data: data });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        const activeCases = fetchedData.confirmed.value - (fetchedData.recovered.value + fetchedData.deaths.value);
        this.setState({ data: fetchedData, active:activeCases, country: country });
    }

    render() {
        return (
            <div className={styles.container}>
                <img src={logo} className={styles.image} alt="COVID-19"  />
                <Cards data={this.state.data} />
                <CountryPicker onCountryChange={this.handleCountryChange} />
                <Chart active={this.state.active} data={this.state.data} country={this.state.country} />
            </div>
        );
    }
}

export default App;