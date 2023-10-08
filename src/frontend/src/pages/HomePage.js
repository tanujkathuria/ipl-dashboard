import React,{useEffect, useState} from 'react';
import TeamTile  from '../components/TeamTile';
import axios from 'axios';

import './HomePage.scss';

const HomePage = () => {

  const [teams, setTeams] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:8080/team')
      .then(res => {
          console.log(res.data);
          setTeams(res.data)})
      .catch(err => console.log(err))

  },[])

  return (
    <div className='home'>
        <h1 className='header-home'>IPL Dashboard </h1>
        <div className='tiles'>
        {
        teams.map(team => <TeamTile teamName={team?.teamName}></TeamTile>)
        }
        </div>
        </div>
  )
}

export default HomePage