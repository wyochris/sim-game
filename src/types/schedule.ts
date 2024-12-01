// src/types/schedule.ts

import { Player } from './player';
import { Team } from './team';

export interface Race {
    eventType: string;       // e.g., "100m", "8k Cross Country"
    heats: Heat[];           // Array of heats for this race
    participants: Player[];  // Array of players participating in the race
}

export interface Heat {
    playerTimes: Record<number, number>; // Maps playerId to race time
}

export interface Meet {
    week: number;
    meetId: number;
    date: string;
    teams: Team[];            // Teams participating in the meet
    races: Race[];            // Races held at the meet
    meetType: 'cross_country' | 'track_field';
}

// Schedule for individual teams
export interface TeamSchedule {
    teamId: number;
    meets: Meet[];            // List of meets in which the team participates
}

// Schedule for the entire league
export interface LeagueSchedule {
    seasonType: 'cross_country' | 'track_field';
    meets: Meet[];            // Complete list of all meets for the season
}
