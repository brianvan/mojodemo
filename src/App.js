import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { settings } from './settings/settings';
import { Box } from '@mui/material';
import { CustomTabPanel } from './components/customTabPanel';
import './App.css';


function App() {

  const [value, setValue] = useState(0); //solely for Tabs value
  const [data, setData] = useState([]);

  useEffect(() => {
    settings.tickers.forEach(ticker => {
      const url = settings.apiUrl + ticker.app + '/' + ticker.id
        + '?limit=' + settings.count
        + '&sort=timestamp&apiKey=' + settings.apiKey;
      axios.get(url)
        .then(response => {
          console.log(response.data);
          setData((previousData) => {
            const filteredData = previousData.filter(item => item.name !== ticker.name);
            return [...filteredData, { name: ticker.name, prettyName: ticker.prettyName, type: ticker.type, results: response.data.results }];
          });
        })
        .catch(error => {
          console.error(error);
        });
    });

  }, []);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  function renderType(items, type) {
    console.log(items);
    const filteredItems = items.filter(ticker => ticker.type === type);
    console.log('filteredItems', filteredItems);
    return (
      <div>
        {
          filteredItems.map(item =>
            <>
              <h2>{item.prettyName}</h2>
              <ul className="results__block">
                {
                  item.type === 'forex' &&
                  item.results.map(result => (
                    <li className="result__row" key={result.participant_timestamp}>
                      <div className="price">Price: {result.ask_price}</div>
                      <div className="time">Timestamp: {result.participant_timestamp}</div>
                    </li>
                  ))
                }
                {
                  item.type === 'crypto' &&
                  item.results.map(result => (
                    <li className="result__row" key={result.participant_timestamp}>
                      <div className="price">Price: {result.price}</div>
                      <div className="time">Timestamp: {result.participant_timestamp}</div>
                    </li>
                  ))

                }
              </ul>
            </>
          )
        }
      </div>
    );


  }

  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{ width: '70%', bgcolor: 'white', border: '2px', padding: '1em' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'black' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Crypto" id="simple-tab-0" />
              <Tab label="Forex" id="simple-tab-1" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {data.length > 0 && renderType(data, 'crypto')}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {data.length > 0 && renderType(data, 'forex')}
          </CustomTabPanel>
        </Box>
      </header>
    </div>
  );
}

export default App;
