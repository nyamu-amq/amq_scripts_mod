// ==UserScript==
// @name         AMQ Player Picker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Player picker for corona custom mode, once all players join the lobby, type "/pickplayer" in chat to pick a player, the player will be output to chat
// @author       TheJoseph98, modified by nyamu
// @match        https://animemusicquiz.com/*
// @grant        none
// ==/UserScript==

if (!window.setupDocumentDone) return;

let players = [];

let commandListener = new Listener("Game Chat Message", (payload) => {
    if (payload.sender === selfName && payload.message.startsWith("/pickplayer")) {
        if (lobby.inLobby) {
            let message = "";
            sendChatMessage("Picking a random player...");

            for (let playerId in lobby.players) {
                players.push(lobby.players[playerId]._name);
            }

           	let index = Math.floor(Math.random() * players.length);

            message += "@" + players[index]+" is the chosen one";

            sendChatMessage(message);
            message = "";
			players = [];
        }
        else {
            gameChat.systemMessage("Must be in pre-game lobby");
        }
    }
});

function sendChatMessage(message) {
    gameChat.$chatInputField.val(message);
    gameChat.sendMessage();
}

commandListener.bindListener();