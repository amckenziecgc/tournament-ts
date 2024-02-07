export class Tournament {

    teams:Team[] = [];

    tally(input: string){
        let games;
        if(input.length > 0){
            //expect \n problems with node? switch to regex?
            games = input.split('\n');
            games.forEach(game =>{this.parseGame(game)});
        }

        this.teams.sort((a, b) => {
            let difference = b.getPoints() - a.getPoints();
            if (difference === 0) difference = a.name.localeCompare(b.name);
            return difference;
        });

        let tournamentOutput = 'Team                           | MP |  W |  D |  L |  P';
        
        this.teams.forEach((team) => tournamentOutput += '\n' + team.gameString());

        return tournamentOutput;
    }

    parseGame(game: string){
        const gameStats = game.split(';');
        const team1 = this.getTeamByName(gameStats[0]);
        const team2 = this.getTeamByName(gameStats[1]);
        const outcome = gameStats[2];
       
        switch(outcome){
            case 'win':{
                team1.wins++;
                team2.losses++;
                break;
            }
            case 'loss':{
                team1.losses++;
                team2.wins++;
                break;
            }
            case 'draw':{
                team1.draws++;
                team2.draws++;
                break;
            }
        }
        
    }

    getTeamByName(teamName: string){
        //can a ternary make this cleaner? maybe not, the ! condition has to do two things
        let aTeam = this.teams.find((team) => team.name === teamName);

        if(!aTeam){
            aTeam = new Team(teamName);
            this.teams.push(aTeam);
        }
        return aTeam;
    }
}

class Team {
    name: string;
    wins: number = 0;
    draws: number = 0;
    losses: number = 0;

    constructor(name: string){
        this.name = name;
    }
    getPoints(){
        return (this.wins*3) + this.draws
    }
    getMatchesPlayed(){
        return this.wins + this.draws + this.losses;
    }
    gameString(){
        let games = '';
        games += this.name.padEnd(30, ' ') +
            ' |' + String(this.getMatchesPlayed()).padStart(3,' ') +
            ' |' + String(this.wins).padStart(3,' ') +
            ' |' + String(this.draws).padStart(3,' ') +
            ' |' + String(this.losses).padStart(3,' ') +
            ' |' + String(this.getPoints()).padStart(3,' ');


        return games;
    }
}
