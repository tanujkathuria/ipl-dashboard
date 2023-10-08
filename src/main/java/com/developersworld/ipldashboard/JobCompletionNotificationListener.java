package com.developersworld.ipldashboard;

import com.developersworld.ipldashboard.model.Team;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
/**
 *
 */
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class JobCompletionNotificationListener implements JobExecutionListener {
  private static final Logger log = LoggerFactory.getLogger(
    JobCompletionNotificationListener.class
  );

  private final EntityManager entityManager;

  @Autowired
  public JobCompletionNotificationListener(EntityManager entityManager) {
    this.entityManager = entityManager;
  }

  @Transactional
  @Override
  public void afterJob(JobExecution jobExecution) {
    if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
      log.info("!!! JOB FINISHED! Time to verify the results");
      // jdbcTemplate
      //   .query(
      //     "SELECT team1, team2, date FROM match",
      //     (rs, row) ->
      //       "team 1 " +
      //       rs.getString(1) +
      //       "team 2" +
      //       rs.getString(2) +
      //       "date" +
      //       rs.getString(3)
      //   )
      //   .forEach(match -> log.info("Found <{{}}> in the database.", match));

      Map<String, Team> teamData = new HashMap();

      entityManager
        .createQuery(
          "select m.team1, count(*) from Match m group by m.team1",
          Object[].class
        )
        .getResultStream()
        .map(e -> new Team((String) e[0], (long) e[1]))
        .forEach(x -> teamData.put(x.getTeamName(), x));

      entityManager
        .createQuery(
          "select m.team2, count(*) from Match m group by m.team2",
          Object[].class
        )
        .getResultStream()
        .forEach(
          x -> {
            Team team = teamData.get((String) x[0]);
            team.setTotalMatches(team.getTotalMatches() + (long) x[1]);
          }
        );

      entityManager
        .createQuery(
          "select m.matchWinner, count(*) from Match m group by m.matchWinner",
          Object[].class
        )
        .getResultStream()
        .forEach(
          x -> {
            Team team = teamData.get((String) x[0]);
            if (team != null) {
              team.setTotalWins(team.getTotalWins() + (long) x[1]);
            }
          }
        );

      teamData.values().forEach(e -> entityManager.persist(e));
      teamData
        .values()
        .forEach(team -> log.info("Found <{{}}> in the database.", team));
    }
  }
}
