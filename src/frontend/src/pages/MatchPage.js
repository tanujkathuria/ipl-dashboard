import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MatchPage.scss'
import { Link } from 'react-router-dom';
import YearSelector from '../components/YearSelector';


const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const {teamName, year} = useParams();


    useEffect(() => {
        axios.get(`http://localhost:8080/team/${teamName}/matches?year=${year}`)
        .then(res => {console.log(res)
        setMatches(res.data)
        })
        .catch(err => console.log(err))

    },[teamName,year])

    
  return (
    <div className='MatchPage'>
        <div className='dates'><YearSelector teamName={teamName} year={year}/></div>
        <div className='matches'><h2 className='heading'>{teamName} matches in {year}   <Link to={`/teams/${teamName}`}>Go back</Link></h2>
        {matches.slice(1).map(match => {
        const otherTeam = match.team1 == teamName ? match.team2 : match.team1;
        const otherTeamRoute = `/teams/${otherTeam}`;
        const  matchWon = match?.matchWinner === teamName ? true : false;
        return <div className={matchWon ? "  backColorGreen-match" : "backColorRed-match"}>
                <h2>vs <Link to={otherTeamRoute}>{otherTeam}</Link></h2> 
                <h3>{match?.date}</h3>
                <h3>at {match?.venue}</h3>
                <h3>{match?.matchWinner} won by {match?.resultMargin} {match?.result}</h3>
               </div>
    })}
    </div>
    </div>
  )
}

export default MatchPage