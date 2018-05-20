function AudioPlayer()
{
    this.audioResources = {}; // Hashmap audioId->audioResource

    var _currentFX;

    this.playFX = function(audioResId)
    {
        if(_currentFX)
            _stopAudio(_currentFX);
        _currentFX = this.audioResources[audioResId];
        _currentFX.volume = AudioPlayer["SFX volume"];
        _currentFX.play();
    };

    this.loadAudioResource = function(audioPath, resourceId)
    {
        this.audioResources[resourceId] = new Audio(audioPath); // HTML5 Audio element
    };

    this.setVolume = function(resourceId, volume)
    {
        var audioRes = this.audioResources[resourceId];

        if(audioRes)
        {
            audioRes.volume = volume;
        }
    };

    function _stopAudio(audioRes)
    {
        audioRes.pause();
        audioRes.currentTime = 0;
    }
}

// The object key contain spaces due to the direct binding with dat.gui.js
// The key is going to be shown on the GUI as it is declared here.
// We want exactly this text to appear to the user, not SFXVolume or SFX_Volume or similar text.
AudioPlayer["SFX volume"] = 1;