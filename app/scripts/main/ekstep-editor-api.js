window.EkstepEditorAPI = {
    addEventListener: function(type, callback, scope) {
        EkstepEditor.eventManager.addEventListener(type, callback, scope);
    },
    dispatchEvent: function(type, data, target) {
        EkstepEditor.eventManager.dispatchEvent(type, data, target);
    },
    removeEventListener: function(type, callback, scope) {

    },
    getAngularScope: function() {
        return EkstepEditor.toolbarManager.scope;
    },
    getCanvas: function() {
        return EkstepEditor.stageManager.canvas;
    },
    getCurrentStage: function() {
        return EkstepEditor.stageManager.currentStage;
    },
    getCurrentObject: function() {
        var activeObj = EkstepEditor.stageManager.canvas.getActiveObject();
        if (!activeObj) return false;
        var pluginId = activeObj.id;
        return EkstepEditorAPI.getPluginInstance(pluginId);
    },
    getCurrentGroup: function() {
        var plugins = EkstepEditor.stageManager.canvas.getActiveGroup()._objects;
        var group = [];
        _.forEach(plugins, function(plugins, index) {
            var obj = EkstepEditorAPI.getPluginInstance(plugins.id);
            group.push(obj);
        });
        return group;
    },
    getEditorGroup: function() {
        var group = EkstepEditor.stageManager.canvas.getActiveGroup();
        return group;
    },
    getEditorObject: function() {
        return EkstepEditor.stageManager.canvas.getActiveObject();
    },
    render: function() {
        EkstepEditor.stageManager.canvas.renderAll();
    },
    getPluginInstance: function(pluginId) {
        return EkstepEditor.pluginManager.getPluginInstance(pluginId);
    },
    updateContextMenu: function(menu) {
        EkstepEditor.toolbarManager.updateContextMenu([menu]);
    },
    updateContextMenus: function(menus) {
        EkstepEditor.toolbarManager.updateContextMenu(menus);
    },
    instantiatePlugin: function(id, data, parent, override) {
        return EkstepEditor.pluginManager.invoke(id, data, parent, override);
    },
    addStage: function(stage) {
        EkstepEditor.stageManager.addStage(stage);
    },
    getPlugin: function(id) {
        return EkstepEditor.pluginManager.plugins[id];
    },
    addPluginInstance: function(pluginInstance) {
        EkstepEditor.pluginManager.addPluginInstance(pluginInstance);
    },
    cloneInstance: function(plugin) {
        var data = plugin.getCopy();
        var newPlugin = EkstepEditorAPI.instantiatePlugin(plugin.manifest.id + '@' + plugin.manifest.ver, plugin.manifest.initdata || {});
        newPlugin.paste(data, plugin.parent);
    }
}