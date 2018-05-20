function Grid(rows, cols, cellSize, pos)
{
    var _sprite = null;

    (function _init()
    {
        var g = new PIXI.Graphics();
        g.lineStyle(2, 0xFFFFFF, 1);


        for(var i = 0; i < rows; i++)
            for(var j = 0; j < cols; j++)
            {
                g.drawRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }

        g.endFill();
        var texture = Globals.app.renderer.generateTexture(g);
        _sprite = new PIXI.Sprite(texture);
        _sprite.anchor.set(0, 0.5);
        _sprite.x = pos.x;
        _sprite.y = pos.y;
        _sprite.visible = false;
        GameManager.Instance.symContainer.addChild(_sprite);

    })();

    this.setVisible = function(visible)
    {
        _sprite.visible = visible;
    }
}