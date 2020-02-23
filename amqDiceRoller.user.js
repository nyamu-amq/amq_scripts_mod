// ==UserScript==
// @name         AMQ Dice Roller
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Dice roller for general usage, type "/roll" in chat to output a random number from 1-100
// @author       Anopob
// @match        https://animemusicquiz.com/*
// @grant        none
// ==/UserScript==

if (!window.setupDocumentDone) return;

let command = "/roll";
let maxRoll = 100;
let diceResult;
let dict={
"card":["cfv","cfvg","ygo"],
"eurobeat":["id","id2","id3","id4","id5","idf","ide","idb","idb2"],
"gatari":["ss","owa","zoku"],
"gay":["natsu","hiiro","free"],
"precure":["fre","yes","heart","kira"],
"sympho":["og","g","gx","xv","axz"],
"nanoripe":["shok2","hana","citr","sanka","hataraku"],
"ali":["aveng","rm","rmt"],
"claris":["nsk","orei","orei2"],
"yukarin":["c3","b gata","nnh","nnhas","nnhst","nnhvd","nnh1st","nnh2nd","nnh3rd","nnhdet"],
"larc":["haga","hagabr"],
"kanako":["sg","sg0","sgdjv","ch","cc","on"],
"kishida":["st","st2","st3","gt"],
"kalafina":["az","fz","ubw","kuroshi2"],
"fripside":["st","rg","rgs","rgt"],
};

let commandListener = new Listener("Game Chat Message", (payload) => {
    if (payload.sender === selfName && payload.message.startsWith(command)) {
        let args = payload.message.split(/\s+/);
        if (args[1] !== undefined) {
        	if(args[1] in dict) {
        		let temp=dict[args[1]];
            	diceResult = getRandomInt(temp.length);
            	sendChatMessage(" result: " + temp[diceResult]);
	        }
			else {
	            maxRoll = parseInt(args[1].trim());
	            if (isNaN(maxRoll)) {
	                sendChatMessage("Please enter a valid number");
	            }
	            else {
	                diceResult = getRandomIntInclusive(1, maxRoll);
	                sendChatMessage(" rolls " + diceResult);
	            }
	        }
        }
        else {
            maxRoll = 100;
            diceResult = getRandomIntInclusive(1, maxRoll);
            sendChatMessage(" rolls " + diceResult);
        }
    }
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
}

function sendChatMessage(message) {
    gameChat.$chatInputField.val(message);
    gameChat.sendMessage();
}

commandListener.bindListener();
