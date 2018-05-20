function Symbol(id, position, outerWheelRadius)
{
    var _sprite = null;
    var _prev = null;
    var _next = null;

    (function _init()
    {
        _sprite = new PIXI.Sprite.fromFrame(Globals.loader.resources[Globals.IMAGES_FOLDER + Globals.SYMBOL_RES_PREFIX + id + Globals.IMAGES_EXTENSION].url);
        _sprite.anchor.set(0.5);

        var originalW = _sprite.width;
        _sprite.width = outerWheelRadius * 0.1;
        _sprite.height = (_sprite.width * _sprite.height) / originalW;

        _sprite.x = Math.floor(position.x);
        _sprite.y = Math.floor(position.y);

        GameManager.Instance.symContainer.addChild(_sprite);
    })();

    this.setPrev = function (prev)
    {
        _prev = prev;
    };

    this.getPrev = function ()
    {
        return _prev;
    };

    this.getNext = function ()
    {
        return _next;
    };

    this.setNext = function (next)
    {
        _next = next;
    };

    this.getSprite = function ()
    {
        return _sprite;
    };

    this.rotateAroundPivot = function(pivot, degs)
    {
        function translate(p, T)
        {
            p.x += T.x;
            p.y += T.y;
        }

        var rads = degs * Math.PI / 180;
        var T = new PIXI.Point(-pivot.x, -pivot.y);
        var p = _sprite.position;

        translate(p, T);

        var newX = p.x * Math.cos(rads) - p.y * Math.sin(rads);
        var newY = p.y * Math.cos(rads) + p.x * Math.sin(rads);

        p.x = newX;
        p.y = newY;

        T.x *= -1;
        T.y *= -1;

        translate(p, T);
    }
}