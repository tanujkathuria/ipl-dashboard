import React from 'react';
import { Link } from 'react-router-dom';
import './YearSelector.scss'

const YearSelector = ({teamName, year}) => {
  let years = [];
  const startYear = process.env.REACT_APP_DATA_START_YEAR;
  const endYear = process.env.REACT_APP_DATA_END_YEAR;
  
  for(let i=startYear; i<= endYear;i++){
      years.push(i);
  }

  return (
      <div className='year'>
          <h3 className='heading'>Select Year</h3>
      {years.map(year => <li><Link to={`/teams/${teamName}/matches/${year}`}>{year}</Link></li>)}
      </div>
   
  )
}

export default YearSelector