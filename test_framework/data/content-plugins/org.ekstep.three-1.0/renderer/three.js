Plugin.extend({
    _type: 'three',
    initPlugin: function(data) {

        var instance = this;
        this._self = new createjs.Container();

        console.log('three plugin');
    }

});