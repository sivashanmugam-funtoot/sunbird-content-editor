describe('popup service', function() {
    beforeAll(function() {
        org.ekstep.services.popupService.openModal = function() {}
        org.ekstep.services.popupService.loadModules = function() {}
        org.ekstep.services.config = {
            baseURL: org.ekstep.contenteditor.config.baseURL,
            apislug: org.ekstep.contenteditor.config.apislug
        };
    });

    it('should open the modal and dispacth telemetry', function() {
        spyOn(org.ekstep.services.popupService, 'openModal');
        spyOn(org.ekstep.contenteditor.api, 'getCurrentStage').and.returnValue({ id: 1234 });
        spyOn(org.ekstep.services.telemetryService, 'interact');
        org.ekstep.services.popupService.open({}, function() {})

        expect(org.ekstep.services.popupService.openModal).toHaveBeenCalledWith({}, jasmine.any(Function));
        expect(org.ekstep.services.telemetryService.interact).toHaveBeenCalledWith({ "type": "show", "subtype": "open", "target": "popup", "pluginid": "", "pluginver": '', "objectid": "", "stage": 1234 })
    });

    it('should load angular module and template', function() {
        spyOn(org.ekstep.services.popupService, 'loadModules');
        templatePath = 'https://dev.ekstep.in/content-plugins/org.ekstep.ceheader-1.0/editor/headerApp.js?982';
        controllerPath = 'https://dev.ekstep.in/content-plugins/org.ekstep.whatsnew-1.0/editor/whatsnew.controller.js?'
        allowTemplateCache = false;
        org.ekstep.services.popupService.loadNgModules(templatePath, controllerPath, allowTemplateCache);
        expect(org.ekstep.services.popupService.loadModules).toHaveBeenCalledWith(templatePath, controllerPath, allowTemplateCache);
    });
});