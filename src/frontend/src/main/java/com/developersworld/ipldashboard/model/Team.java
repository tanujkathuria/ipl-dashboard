package com.developersworld.ipldashboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Team {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  private String teamName;
  private long totalMatches;
  private long totalWins;

  @Transient
  private List<Match> matches;

  public Team(String teamName, long totalMatches) {
    this.teamName = teamName;
    this.totalMatches = totalMatches;
  }
}
