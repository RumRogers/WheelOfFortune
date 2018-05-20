function initGUI()
{
    var GUI = new dat.GUI({ "autoPlace" : false });
    var folder = GUI.addFolder("Wheel parameters");
    folder.open();

    var speedFactorController = folder.add(Globals, "Speed factor").min(0.08).max(20).step(0.01);
    speedFactorController.onChange(function(value)
    {
       Globals["Speed factor"] = value;
    });

    folder = GUI.addFolder("Sound");
    folder.open();

    var fxVolumeController = folder.add(AudioPlayer, "SFX volume").min(0).max(1).step(0.01);
    fxVolumeController.onChange(function(value)
    {
        Globals.audioPlayer.setVolume(Globals.SLOT_STOP_SOUND_FILENAME, value);
        Globals.audioPlayer.setVolume(Globals.SLOT_SPINNING_SOUND_FILENAME, value);
    });

    GUI.add(new GameManager(), "Spin");

    var w = GUI.width;

    var $guiContainer = $("#gui");
    $guiContainer.hide();
    $guiContainer.css(
        {
            "position" : "absolute",
            "left" : 0,
            "top" : 0,
            "width" : w
        });
    $guiContainer.append(GUI.domElement);

    Globals.GUI = GUI;
}