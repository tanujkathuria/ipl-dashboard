package com.developersworld.ipldashboard.repos;

import com.developersworld.ipldashboard.model.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Integer> {
  Team findByTeamName(String teamName);
}
