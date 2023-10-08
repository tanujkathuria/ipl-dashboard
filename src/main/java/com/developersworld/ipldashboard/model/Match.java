package com.developersworld.ipldashboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Match {
  @Id
  private long id;
  private String city;
  private LocalDate date;
  private String playerOfMatch;
  private String venue;
  private String team1;
  private String team2;
  private String tossWinner;
  private String tossDecision;
  private String matchWinner;
  private String result;
  private String resultMargin;
  private String umpire1;
  private String umpire2;
}
