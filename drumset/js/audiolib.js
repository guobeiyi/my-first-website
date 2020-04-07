"use strict";

function audioContextCheck(){
    if(typeof AudioContext !== "undefined"){
        return new AudioContext();
    }
    else if (typeof webkitAudioContext !== "undefined"){
        return new webkitAudioContext();
    }
    else if(typeof mozAudioContext !== "undefined"){
        return new mozAudioContext();
    }
    else{
        throw new Error('AudioContext not supported')
    }
}
var audioContext = audioContextCheck();

function audioFileLoader(fileDirectory) {
    var soundObj = {};
    var playSound = undefined;
    var getSound = new XMLHttpRequest();
    soundObj.fileDirectory = fileDirectory;
    getSound.open("GET", soundObj.fileDirectory, true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {
        audioContext.decodeAudioData(getSound.response, function(buffer) {
            soundObj.soundToPlay = buffer;

        });
    };

    getSound.send();

    soundObj.play = function(time) {
        playSound = audioContext.createBufferSource();
        playSound.buffer = soundObj.soundToPlay;
        playSound.connect(audioContext.destination);
        playSound.start(audioContext.currentTime + time || audioContext.currentTime);
    };

    soundObj.stop = function(time) {
        playSound.stop(audioContext.currentTime + time || audioContext.currentTime);
    };
    return soundObj;
}


function audioBatchLoader(obj) {

    for (var prop in obj) {
        obj[prop] = audioFileLoader(obj[prop]);

    }

    return obj;

}
