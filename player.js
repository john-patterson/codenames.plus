// Player class
// When players log in, they give a nickname, have a socket and a room they're trying to connect to
class Player {
  constructor(nickname, room, socket, roomList, playerList){
    this.id = socket.id;
    this.roomList = roomList;
    this.playerList = playerList;

    // If someone in the room has the same name, append (1) to their nickname
    let nameAvailable = false;
    let nameExists = false;
    let tempName = nickname;
    let counter = 0;

    while (!nameAvailable){
      if (this.roomList[room]){
        nameExists = false;
        for (let i in this.roomList[room].players){
          if (this.roomList[room].players[i].nickname === tempName) {
              nameExists = true
          }
        }
        if (nameExists) tempName = nickname + "(" + ++counter + ")"
        else nameAvailable = true
      }
    }
    this.nickname = tempName
    this.room = room
    this.team = 'undecided'
    this.role = 'guesser'
    this.timeout = 2100         // # of seconds until kicked for afk (35min)
    this.afktimer = this.timeout       

    // Add player to player list and add their socket to the socket list
    this.playerList[this.id] = this
  }

  // When a player joins a room, evenly distribute them to a team
  joinTeam(){
    let numInRoom = Object.keys(this.roomList[this.room].players).length
    if (numInRoom % 2 === 0) this.team = 'blue'
    else this.team = 'red'
  }
}

module.exports = [ Player ];