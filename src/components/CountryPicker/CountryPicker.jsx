import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ( {onCountryChange} ) => {

    const [fetchedCountries, setFetchCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setFetchCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={e => onCountryChange(e.target.value)} >
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option value={country} key={i}>{country}</option>)}              
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;