import { getNextGameId, initializeGameCounter, initializeIDTracker, saveGame, saveMeets, savePlayers, saveRaces, saveTeams } from '@/data/storage';
import { generateYearlyLeagueSchedule, generateTeamSchedules } from '@/logic/scheduleGenerator';
import { Team, TeamSchedule } from '@/types/team';
import { Game } from '@/types/game';
import { createPlayer } from './generatePlayer';
import { createTeamsForConference } from './generateTeam';
import { getAllColleges, getAllConferences } from '@/data/parseSchools';
import { Conference, School } from '@/types/regionals';
import { Player } from '@/types/player';
import { Meet, Race } from '@/types/schedule';


export async function initializeNewGame(conferenceIds: number[], numPlayersPerTeam: number, selectedSchoolId: number ): Promise<Game> {
    const teams: Team[] = [];
    const players: Player[] = [];
    const currentYear = 2024;

    console.log(selectedSchoolId);

    initializeGameCounter();
    const gameId = await getNextGameId();
    initializeIDTracker(gameId);


    for (let i = 0; i < conferenceIds.length; i++) {
        const conferenceTeams = await createTeamsForConference(gameId, currentYear, conferenceIds[i]);
        for (const team of conferenceTeams) {
            for (let j = 0; j < numPlayersPerTeam; j++) {
                const player = await createPlayer(gameId, team.teamId);
                players.push(player);
                team.players.push(player.playerId);
            }
        }
        teams.push(...conferenceTeams);
    }

    const scheduleObject: {meets: Meet[], races: Race[]} = await generateYearlyLeagueSchedule(gameId, teams, players, currentYear);

    const leagueSchedule = {
        year: currentYear,
        meets: scheduleObject.meets.map(meet => meet.meetId)
    };

    const teamSchedules = generateTeamSchedules(scheduleObject.meets, teams, currentYear);

    assignTeamSchedules(teams, teamSchedules);
    
    const game: Game = {
        gameId,
        teams: teams.map(team => team.teamId),
        players: teams.reduce((acc: number[], team) => acc.concat(team.players), [] as number[]),
        currentWeek: 1,
        currentYear,
        gamePhase: 'regular',
        leagueSchedule,
        remainingTeams: teams.map(team => team.teamId),
    };

    try {
        await Promise.all([
            saveGame(game),
            saveTeams(gameId, teams),
            saveMeets(gameId, scheduleObject.meets),
            savePlayers(gameId, players),
            saveRaces(gameId, scheduleObject.races)
        ]);
    } catch (error) {
        console.error('Error saving game data:', error);
        throw new Error('Failed to save game data');
    }

    return game;
}

export async function getAllSchoolsAndConferences(): Promise<{ schools: School[], conferences: Conference[] }> {
    const schools = await getAllColleges();
    const conferences = await getAllConferences();
    return { schools, conferences };
}

export function assignTeamSchedules(teams: Team[], teamSchedules: TeamSchedule[]): void {
    teams.forEach(team => {
        try {
                const s= teamSchedules.find(schedule => schedule.teamId === team.teamId)
                if(!s) throw new Error(`No schedule found for team ${team.teamId}`);
                team.teamSchedule = s;
            } catch (error) {
                console.error(`Error assigning schedule to team ${team.teamId}`, error);
            }
        });
}