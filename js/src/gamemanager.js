function GameManager()
{
    // Inherit from Observable class
    Observable.call(this);

    // Singleton
    if(GameManager.Instance !== null)
        return GameManager.Instance;


    var _reels = [];
    var _spinning = 0;
    var _scoreGrid;

    GameManager.Instance = this;

    this.symbolFilter = null;
    this.reelFilter = null;
    this.symContainer = null;
    this.reelContainer = null;

    var _init = function()
    {
        this.symbolFilter = new PIXI.filters.BlurFilter();
        this.symbolFilter.blur = Globals.MIN_SYMBOL_BLUR;
        this.reelFilter = new PIXI.filters.BlurFilter();
        this.reelFilter.blur = Globals.MIN_REEL_BLUR;
        this.symContainer = new PIXI.Container();
        this.reelContainer = new PIXI.Container();
        this.symContainer.filters = [this.symbolFilter];
        this.reelContainer.filters = [this.reelFilter];


        Globals.app.stage.addChild(this.reelContainer);
        Globals.app.stage.addChild(this.symContainer);

        this.initReels();
    };

    this.initReels = function()
    {
        const COLORS = [ 0x8A2BE2, 0xFFFF00, 0x6CFFDB, 0xFF7186, 0x16A3FF ];
        const TOTAL_SYMBOLS = [40, 36, 30, 26, 20];
        var radius = Math.min(Globals.SCREEN_WIDTH, Globals.SCREEN_HEIGHT);

        const THICKNESS = radius * 0.13;

        for(var i = 0; i < COLORS.length; i++)
        {
            _reels.push(new Reel(radius - THICKNESS * i, COLORS[i], THICKNESS, TOTAL_SYMBOLS[i], i % 2 === 0 ? 1 : -1));
        }

        _scoreGrid = new Grid(3, _reels.length, THICKNESS / 2, new PIXI.Point(Globals.SCREEN_WIDTH / 2 - radius / 2, Globals.SCREEN_HEIGHT / 2));

        this.reelContainer.pivot.x = Globals.SCREEN_WIDTH / 2 - this.reelContainer.width / 2;
        this.reelContainer.pivot.y = Globals.SCREEN_HEIGHT / 2;
        this.symContainer.pivot.x = this.reelContainer.pivot.x;
        this.symContainer.pivot.y = this.reelContainer.pivot.y;

        this.reelContainer.x = Globals.SCREEN_WIDTH / 2 - this.reelContainer.width / 2;
        this.reelContainer.y = Globals.SCREEN_HEIGHT / 2;
        this.symContainer.x = this.reelContainer.x;
        this.symContainer.y = this.reelContainer.y;

    };

    this.Spin = function ()
    {
        _onSpinStart.call(this);
    };

    var _onSpinStart = function()
    {
        if(_spinning === 0)
        {
            Globals.app.ticker.add(_zoomOut);
            this.notify(new GameEvent(GameEvent.TYPE.SPIN_START));
            _spinning = _reels.length;
            _scoreGrid.setVisible(false);
            Globals.audioPlayer.playFX(Globals.SLOT_SPINNING_SOUND_FILENAME);
        }
    };

    this.onSpinEnd = function()
    {
        Globals.audioPlayer.playFX(Globals.SLOT_STOP_SOUND_FILENAME);
        if(--_spinning === 0)
            _checkScore.call(this);
    };

    var _checkScore = function ()
    {

        _scoreGrid.setVisible(true);

        // Here we should do something with the obtained symbols...
        for(var i = 0; i < _reels.length; i++)
        {
            var middle = _reels[i].getMiddleScoreSymbol();
            var top = middle.getNext();
            var bottom = middle.getPrev();

            // do something
        }

        Globals.app.ticker.add(_zoomIn);

    };

    var that = this;

    function _zoomIn(delta)
    {
        const TARGET_ZOOM_SCALE = 3;
        const SCALE_STEP = TARGET_ZOOM_SCALE / 50;

        if(that.symContainer.scale.x < TARGET_ZOOM_SCALE)
        {
            that.symContainer.scale.x = Math.min(that.symContainer.scale.x + delta * SCALE_STEP, TARGET_ZOOM_SCALE);
            that.symContainer.scale.y = that.symContainer.scale.x;
        }

        that.reelContainer.scale.x = that.symContainer.scale.x;
        that.reelContainer.scale.y = that.symContainer.scale.y;

        if(that.reelContainer.scale.x === TARGET_ZOOM_SCALE)
        {
            Globals.app.ticker.remove(_zoomIn);
        }
    }

    function _zoomOut(delta)
    {
        const TARGET_ZOOM_SCALE = 1;
        const SCALE_STEP = TARGET_ZOOM_SCALE / 10;

        if(that.symContainer.scale.x > TARGET_ZOOM_SCALE)
        {
            that.symContainer.scale.x = Math.max(that.symContainer.scale.x - delta * SCALE_STEP, TARGET_ZOOM_SCALE);
            that.symContainer.scale.y = that.symContainer.scale.x;
        }

        that.reelContainer.scale.x = that.symContainer.scale.x;
        that.reelContainer.scale.y = that.symContainer.scale.y;

        if(that.reelContainer.scale.x === TARGET_ZOOM_SCALE)
            Globals.app.ticker.remove(_zoomOut);
    }

    _init.call(this);
}

GameManager.Instance = null;