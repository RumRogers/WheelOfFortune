var Globals =
    {
        "SCREEN_WIDTH" : 0,
        "SCREEN_HEIGHT" : 0,
        "app" : null,
        "loader" : null,
        "audioPlayer" : null,
        "TOTAL_SYMBOLS_AVAILABLE" : 9,
        "SYMBOL_RES_PREFIX" : "slots_",
        "ASSETS_ROOT_FOLDER" : "./assets/",
        "IMAGES_FOLDER" : "images/",
        "IMAGES_EXTENSION" : ".png",
        "AUDIO_FOLDER" : "audio/",
        "AUDIO_EXTENSION" : ".mp3",
        "SLOT_STOP_SOUND_FILENAME" : "slot_stop",
        "SLOT_SPINNING_SOUND_FILENAME" : "spinning",
        "GUI" : null,
        "MIN_REEL_BLUR" : 0.5,
        "MAX_REEL_BLUR" : 5,
        "MIN_SYMBOL_BLUR" : 0,
        "MAX_SYMBOL_BLUR" : 20,
        "MIN_REEL_SPEED" : 100,
        "MAX_REEL_SPEED" : 1000,
        // "Speed factor" contains spaces due to the direct binding with dat.gui.js
        // The key is going to be shown on the GUI as it is declared here.
        // We want exactly this text to appear to the user, not SpeedFactor or Speed_factor or similar text.
        "Speed factor" : 1
    };