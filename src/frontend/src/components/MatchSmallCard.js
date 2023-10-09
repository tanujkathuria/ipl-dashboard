import React from 'react';
import { Link } from 'react-router-dom';
import './MatchSmallCard.scss'

const MatchSmallCard = ({teamName, matches}) => {
  console.log(matches);
  return (
    <div className='MatchSmallCard'>
        {matches?.slice(1).map(match => {
            console.log(match)
            console.log(teamName)
            const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
            const otherTeamRoute = `/teams/${otherTeam}`;
            const  matchWon = match?.matchWinner === teamName ? true : false;

            return <div className={matchWon ? "  backColorGreen" : "backColorRed"}>
                <h2>vs <Link to={otherTeamRoute}>{otherTeam}</Link></h2> 
                <h3>{match?.date}</h3>
                <h3>at {match?.venue}</h3>
                <h3>{match?.matchWinner} won by {match?.resultMargin} {match?.result}</h3>
                <div>
                    <div className='innings'>
                        <h3>First Innings</h3>
                        <p className='teamStyle'>{match?.team1}</p>
                    </div>
                    <div className='innings'>
                        <h3>Second Innings</h3>
                        <p className='teamStyle'>{match?.team2}</p>
                    </div>
                    <div className='innings'>
                        <h3>Man of Match</h3>
                        <p className='teamStyle'>{match?.playerOfMatch}</p>
                    </div>
                    <div className='innings'>
                        <h3>Umpires</h3>
                        <p className='teamStyle'>{match?.umpire1}, {match?.umpire2}</p>
                    </div>
                </div>
            </div>
        })}
     </div>
  )
}

export default MatchSmallCard