import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import MatchDetailCard from '../components/MatchDetailCard';
import MatchSmallCard from '../components/MatchSmallCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';


import './TeamPage.scss'
import HomePage from './HomePage';


export const TeamPage = () => {

    const [team, setTeam] = useState();
    const {teamName} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/team/${teamName}`)
        .then(res => {
            console.log(res);
            const team = res.data;
            setTeam(team);
        })
        .catch(err => console.log(err));
    }, [teamName])
    const year = process.env.REACT_APP_DATA_END_YEAR;
    
  return (
    <div className='TeamPage'>
        <div className='TeamName'>
            <h1>
            {team?.teamName}
            </h1>
            <div className='pieStyle'>
        <PieChart 
            data={[
                {  key:'wins', title: 'Wins', value: team?.totalWins, color: '#2a852a' },
                { title: 'Losses', value: team?.totalMatches-team?.totalWins, color: '#8e3636' }
            ]}
            
        /></div>
        <Link to="/" className="home">HomePage</Link>
        </div> 
      
       
        <div  className='MatchDetail'>
        <h3 className='heading'>Latest Matches  {teamName ? <Link to={`/teams/${teamName}/matches/${year}`}>More ></Link> : ''}</h3>
            <MatchDetailCard teamName={team?.teamName} match={team?.matches[0]}></MatchDetailCard>
           
        </div>
        <div className='smallDetail'>
            <MatchSmallCard teamName={team?.teamName} matches={team?.matches}></MatchSmallCard>
            
        </div>
    </div>
  )
}

