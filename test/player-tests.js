let assert = require('assert');
let [ Player ] = require('../player');

describe("Player", function () {
    describe("constructor", function () {
        it("should get the player ID from the socket ID", function () {
            let roomList = makeMinimalAcceptableRoomList();
            let playerList = {};
            let socket = { id: 42 };
            let player = new Player("nickname", "room", socket, roomList, playerList);
            assert.equal(player.id, 42);
        });
    });
});

// If you do not have this, there is an infinite loop in the constructor of Player 
function makeMinimalAcceptableRoomList() {
    return {
        room: {
            players: []
        }
    }
}