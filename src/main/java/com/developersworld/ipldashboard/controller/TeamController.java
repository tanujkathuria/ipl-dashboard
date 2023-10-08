package com.developersworld.ipldashboard.controller;

import com.developersworld.ipldashboard.model.Match;
import com.developersworld.ipldashboard.model.Team;
import com.developersworld.ipldashboard.repos.MatchRepository;
import com.developersworld.ipldashboard.repos.TeamRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class TeamController {
  @Autowired
  TeamRepository teamRepository;

  @Autowired
  MatchRepository matchRepository;

  @GetMapping("/team/{teamName}")
  public Team getTeam(@PathVariable String teamName) {
    Team team = teamRepository.findByTeamName(teamName);
    team.setMatches(matchRepository.findLatestMatchesByTeam(teamName, 4));
    return team;
  }

  @GetMapping("/team")
  public Iterable<Team> getAllTeams() {
    return teamRepository.findAll();
  }

  @GetMapping("/team/{teamName}/matches")
  public List<Match> getMatch(
    @PathVariable String teamName,
    @RequestParam int year
  ) {
    LocalDate startDate = LocalDate.of(year, 1, 1);
    LocalDate endDate = LocalDate.of(year + 1, 1, 1);
    return this.matchRepository.getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
        teamName,
        startDate,
        endDate,
        teamName,
        startDate,
        endDate
      );
  }
}
