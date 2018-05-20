function Reel(radius, color, thickness, totalSymbols, spinningDir)
{
    var _reelCenter;
    var _circleSprite;
    var _radius = radius;
    var _color = color;
    var _thickness = thickness;
    var _spinningDir = spinningDir;

    var _symbols = [];

    (function _init()
    {

        _reelCenter = new PIXI.Point(Globals.SCREEN_WIDTH / 2, Globals.SCREEN_HEIGHT / 2);

        var graphics = new PIXI.Graphics();

        graphics.lineStyle(_thickness, _color);
        graphics.drawCircle(Globals.SCREEN_WIDTH / 2, Globals.SCREEN_HEIGHT / 2, radius - _thickness / 2);
        graphics.beginFill(0xFF0000, 0.5);
        graphics.lineStyle(0, 0);

        graphics.endFill();

        var texture = Globals.app.renderer.generateTexture(graphics);
        _circleSprite = new PIXI.Sprite(texture);
        _circleSprite.scale.set(0.5);
        _circleSprite.anchor.set(0.5);
        _circleSprite.x = Math.floor(Globals.SCREEN_WIDTH / 2);
        _circleSprite.y = Math.floor(Globals.SCREEN_HEIGHT / 2);

        GameManager.Instance.reelContainer.addChild(_circleSprite);

        _initSymbols();

        GameManager.Instance.subscribe(function(gameevent)
        {
            if(gameevent.type === GameEvent.TYPE.SPIN_START)
            {
                _rotate(Globals.MIN_REEL_SPEED, Globals.MAX_REEL_SPEED);
            }
        });
    })();

    function _initSymbols()
    {
        const ICONS = totalSymbols;

        var center = new PIXI.Point(Globals.SCREEN_WIDTH / 2, Globals.SCREEN_HEIGHT / 2);
        for(var i = 0; i < ICONS; i++)
        {
            var a = i / ICONS * Math.PI * 2;
            var x = center.x - (_radius - _thickness / 2) / 2 * Math.cos(a);
            var y = center.y + (_radius - thickness / 2) / 2 * Math.sin(a);
            var randomIconIdx = Math.floor(Math.random() * 9);

            var symbol = new Symbol(randomIconIdx, new PIXI.Point(x, y), Math.min(Globals.SCREEN_WIDTH, Globals.SCREEN_HEIGHT) / 2);

            if(_symbols.length > 0)
            {
                var prev = _symbols[_symbols.length - 1];
                symbol.setPrev(prev);
                prev.setNext(symbol);
            }

            _symbols.push(symbol);

        }

        _symbols[0].setPrev(_symbols[_symbols.length - 1]);
        _symbols[_symbols.length - 1].setNext(_symbols[0]);
    }

    var _rotate = function(minReelSpeed, maxReelSpeed)
    {
        minReelSpeed *= Globals["Speed factor"];
        maxReelSpeed *= Globals["Speed factor"];

        _spinningDir = Math.random() < 0.5 ? -1 : 1;

        var radStep = Math.floor(Math.random() * (maxReelSpeed - minReelSpeed + 1)) + minReelSpeed;

        GameManager.Instance.symbolFilter.blur = Globals.MAX_SYMBOL_BLUR;
        GameManager.Instance.reelFilter.blur = Globals.MAX_REEL_BLUR;

        Globals.app.ticker.add(doRotate);

        var closestToMiddle = null;

        function doRotate(delta)
        {

            var blurMultiplier = 1 / (GameManager.Instance.symbolFilter.blur < 1 ? 10 : 100);
            var spinMultiplier = 1 / (radStep < 150 ? 30 : 100);

            GameManager.Instance.symbolFilter.blur = Math.max(GameManager.Instance.symbolFilter.blur - GameManager.Instance.symbolFilter.blur * blurMultiplier, Globals.MIN_SYMBOL_BLUR);
            GameManager.Instance.reelFilter.blur = Math.max(GameManager.Instance.reelFilter.blur - GameManager.Instance.reelFilter.blur / 100 * delta, Globals.MIN_REEL_BLUR);

            for(var i = 0; i < _symbols.length; i++)
            {
                _symbols[i].rotateAroundPivot(_reelCenter, radStep * _spinningDir);
            }

            if(radStep <= 0.5)
            {
                if(closestToMiddle === null)
                {
                    closestToMiddle = getClosestToMiddle();
                }
                else
                {
                    radStep = 0;
                    Globals.app.ticker.remove(doRotate);
                    GameManager.Instance.onSpinEnd();
                }

            }
            else
                radStep -= radStep * spinMultiplier * delta;
        }

        function getClosestToMiddle()
        {
            for(var i = 0; i < _symbols.length; i++)
            {
                var sym = _symbols[i];

                if (Math.abs(sym.getSprite().y - _reelCenter.y) < 2)
                    return _symbols[i];

            }

            return null;
        }

    };

    this.getMiddleScoreSymbol = function ()
    {
        var leftMostSymbol = _symbols[0];

        for(var i = 1; i < _symbols.length; i++)
        {
            var currSym = _symbols[i];

            if(currSym.getSprite().x < leftMostSymbol.getSprite().x)
                leftMostSymbol = currSym;
        }

        return leftMostSymbol;
    }
}