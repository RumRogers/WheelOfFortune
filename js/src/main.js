$(function()
{
    (function initGlobals()
    {
        Globals.SCREEN_WIDTH = window.innerWidth;
        Globals.SCREEN_HEIGHT = window.innerHeight;
        Globals.app = new PIXI.Application(Globals.SCREEN_WIDTH, Globals.SCREEN_HEIGHT, { antialias: true, backgroundColor: 0x000000 });
    })();

    (function loadResources()
    {

        Globals.audioPlayer = new AudioPlayer();
        var slotStopSoundFullPath = Globals.ASSETS_ROOT_FOLDER + Globals.AUDIO_FOLDER + Globals.SLOT_STOP_SOUND_FILENAME + Globals.AUDIO_EXTENSION;
        Globals.audioPlayer.loadAudioResource(slotStopSoundFullPath, Globals.SLOT_STOP_SOUND_FILENAME);

        var slotSpinningSoundFullPath = Globals.ASSETS_ROOT_FOLDER + Globals.AUDIO_FOLDER + Globals.SLOT_SPINNING_SOUND_FILENAME + Globals.AUDIO_EXTENSION;
        Globals.audioPlayer.loadAudioResource(slotSpinningSoundFullPath, Globals.SLOT_SPINNING_SOUND_FILENAME);

        Globals.loader = new PIXI.loaders.Loader(Globals.ASSETS_ROOT_FOLDER);

        for(var i = 0; i < Globals.TOTAL_SYMBOLS_AVAILABLE; i++)
        {
            Globals.loader.add(Globals.IMAGES_FOLDER + Globals.SYMBOL_RES_PREFIX + i + Globals.IMAGES_EXTENSION);
        }

        Globals.loader.once("complete", onLoadResources);

        Globals.loader.load();

        function onLoadResources()
        {
            PIXI.Point.distance = function (p1, p2)
            {
                return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            };

            initGUI();
            $("#gui").show();
        }
    })();

    document.body.appendChild(Globals.app.view);
});