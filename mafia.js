// mafia.js
const DBC = require("./DBcontrol");
const fs = require("fs");
//
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
//
class mafia {
    /**type: [healself, deadroleopen, addundertaker, mafiacanseeeach, policecanseeeach, doctercanseeeach, undertakercanseeeach, docter, police, mafia, undertaker] 중 1 */
    set_room_setting (serverId,roomId,type,setting) {
        setting1 = DBC.readFile(`${roomId}.json`,`./DB/rooms/${serverId}/`);

        setting1[type] = setting;

        DBC.writeFile(setting1,`${roomId}.json`,`./DB/rooms/${serverId}/`);
        return `You set ${type} to ${setting1[type]}`;
    }
    create_room (serverId,roomId,userId) {
        fs.copyFileSync("./config/default_room_setting.json",`./DB/rooms/${serverId}/${roomId}.json`);
        fs.copyFileSync("./config/default_user_setting.json",`./DB/users/${userId}.json`);
        setting1 = DBC.readFile(`${roomId}.json`,`./DB/rooms/${serverId}/`);

        setting1.guild = serverId;
        setting1.Owner = userId;

        DBC.writeFile(setting1,`${roomId}.json`,`./DB/rooms/${serverId}/`)

        setting = DBC.readFile(`${userId}.json`,`./DB/users/`);

        setting.room = roomId;

        DBC.writeFile(setting,`${userId}.json`,`./DB/users/`);
        return "Room created successfully";
    }
    delete_room (serverId,roomId) {
        setting1 = DBC.readFile(`${roomId}.json`,`./DB/rooms/${serverId}/`);

        setting1.enable = false;

        DBC.writeFile(setting1,`${roomId}.json`,`./DB/rooms/${serverId}/`);
        return "Room deleted successfully";
    }
    info_room (serverId,roomId) {
        const info = DBC.readFile(`${roomId}.json`,`./DB/rooms/${serverId}/`);
        return info;
    }
    start_game(serverId,roomId,players){
        settings = DBC.readFile(`${roomId}.json`,`./DB/rooms/${serverId}/`);
        fs.copyFileSync("./config/default_room_playing.json",`./DB/playing_rooms/${roomId}.json`);
        setting1 = DBC.readFile(`${roomId}.json`,`./DB/playing_rooms/${serverId}/`);
        lists = []
        count = 0
        players.forEach((player) => function () {lists.push(player);count = count + 1});

        setting1.players = lists;
        setting1.player_count = count;
        setting1.setting = settings.setting;

        setting.playing = true;

        DBC.writeFile(setting1,`${roomId}.json`,`./DB/playing_rooms/${serverId}/`);
        return "Game started successfully";
    }
    stop_game (serverId,roomId) {
        setting1 = DBC.readFile(`${roomId}.json`,`./DB/rooms/${serverId}/`);

        setting1.playing = false;

        DBC.writeFile(setting1,`${roomId}.json`,`./DB/rooms/${serverId}/`);
        fs.unlinkSync(`./DB/playing_rooms/${serverId}/${roomId}.json`);
        return "Game stopped successfully";
    }
    // 참가 코드 만들어야 함
    join_game (serverId,roomId) {
        setting1 = DBC.readFile(`${roomId}.json`,`./DB/rooms/${serverId}/`);

        if (!setting1) {
            return "Room not found";
        }
        if (setting1.playing) {
            return "Game is already started";
        }

        setting1.players.push(playerId);

        DBC.writeFile(setting1,`${roomId}.json`,`./DB/rooms/${serverId}/`);
        return "Room joined successfully";
    }
}
class mafiagame {
/** 만들거: 
 *  set_day
 *  kill
 *  pick_role
 *  vote
 *  vote_end
 *  vote_kill
 *  arrest
 *  heal
 *  undersee
 *  win
*/

set_day(roomId,serverId,time){
    setting1 = DBC.readFile(`${roomId}.json`,`./DB/playing_rooms/${serverId}/`);
    if (time == "night"){
    if (setting1.time == "day"){
    setting1.time = time;
    }
}else return "Time is already day";
if (time == "day"){
    if (setting1.time == "night"){
        setting1.time = time;
        setting1.day = setting1.day + 1;
    }
}else return "Time is already night";

    DBC.writeFile(setting1,`${roomId}.json`,`./DB/playing_rooms/${serverId}/`);
    return `Time was set to ${setting1.day}-${setting1.time}`;
}
    kill(killeduserId,serverId,roomId){
        setting1 = DBC.readFile(`${roomId}.json`,`./DB/playing_rooms/${serverId}/`);
        a=setting1.player
for (let i=0; i < a.length; i++){
    if (a[i]==killeduserId){

    }
}
    }
    pick_role(){

    }
    vote(){

    }
    vote_end(){

    }
    vote_kill(){

    }
    arrest(){
        // 체포
    }
    heal(){

    }
    undersee(){

    }
    win(){

    }

}
module.exports = { mafia };