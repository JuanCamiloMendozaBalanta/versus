const { addTeamToPlayer } = require('../player/player.controller');
const { findPlayerById } = require('../player/player.services');
const { addPlayerToTeam } = require('../team/team.controller');
const { findTeamById } = require('../team/team.services');

const hirePlayer = async (idPlayer, idTeam) => {
  try {
    let response;
    const myPlayer = await findPlayerById(idPlayer);
    let newTeams = myPlayer.teams;
    newTeams.push(idTeam);
    const player = await addTeamToPlayer(idPlayer, { teams: newTeams });

    const myTeam = await findTeamById(idTeam);
    let newPlayers = myTeam.players;
    newPlayers.push(idPlayer);
    const team = await addPlayerToTeam(idTeam, { players: newPlayers });
    if (player && team) {
      response = {
        player,
        team
      };
    } else {
      response = `Something is wrong please check the info to the player: ${idPlayer} and the team: ${idTeam}`;
    }
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  hirePlayer
};
