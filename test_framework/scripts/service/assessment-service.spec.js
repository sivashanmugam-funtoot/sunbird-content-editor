describe('Assessment service test cases', function() {

    beforeAll(function() {
        org.ekstep.services.config = {
            baseURL: org.ekstep.contenteditor.config.baseURL,
            apislug: org.ekstep.contenteditor.config.apislug
        };
    });

    it("should return questions using search service", function() {
        var questions = '{"id":"ekstep.assessment_item.search","ver":"1.0","ts":"2017-03-21T12:53:11ZZ","params":{"resmsgid":"8fe29453-e4b8-4dd6-be33-f0aece2f46b6","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"assessment_items":[{"template":"org.ekstep.mcq.grid.ta","lastUpdatedBy":"263","identifier":"do_10096637","code":"org.ekstep.assessmentitem._58185452261d6","question":"","subject":"domain","qlevel":"EASY","createdBy":"263","language":["English"],"media":[{"id":"do_10096619","type":"image","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_10096619/artifact/boyandgirlshoot_1478016491364.medium.png","asset_id":"do_10096619"}],"type":"mcq","title":"MCQ Low Res Asset","createdOn":"2016-11-01T17:24:04.296+0000","versionKey":"1478021044296","gradeLevel":["Kindergarten","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Other"],"max_score":1,"domain":["numeracy"],"question_image":"do_10096619","options":[{"value":{"type":"mixed","text":"1","count":"","image":null,"audio":null,"resvalue":"1","resindex":0},"score":1,"answer":true},{"value":{"type":"mixed","text":"2","count":"","image":null,"audio":null,"resvalue":"2","resindex":1}},{"value":{"type":"mixed","text":"3","count":"","image":null,"audio":null,"resvalue":"3","resindex":2}},{"value":{"type":"mixed","text":"4","count":"","image":null,"audio":null,"resvalue":"4","resindex":3}}],"name":"MCQ Low Res Asset","lastUpdatedOn":"2016-11-01T17:24:04.296+0000","used_for":"worksheet","template_id":"domain_49156"}]}}';
        org.ekstep.services.assessmentService.post = jasmine.createSpy().and.callFake(function(url, data, headers, cb) {
            cb(undefined, questions);
        });
        var data = {
            request: {
                filters: {
                    objectType: ["AssessmentItem"],
                    status: [],
                },
                sort_by: { "name": "desc" },
                limit: 200
            }
        };
        spyOn(org.ekstep.services.assessmentService, "getQuestions").and.callThrough();
        spyOn(org.ekstep.services.searchService, "search");
        org.ekstep.services.assessmentService.getQuestions(data, function(err, res) {
            expect(res).toBe(questions);
            expect(org.ekstep.services.assessmentService.postFromService).toHaveBeenCalled();
            expect(org.ekstep.services.searchService.search).toHaveBeenCalled();
            expect(org.ekstep.services.assessmentService.postFromService.calls.count()).toBe(1);
        });
    });

    it("should return error on getQuestions method call", function() {
        org.ekstep.services.assessmentService.post = jasmine.createSpy().and.callFake(function(url, data, headers, cb) {
            cb("no data found", undefined);
        });
        var data = {
            request: {
                filters: {
                    objectType: ["AssessmentItem"],
                    status: [],
                },
                sort_by: { "name": "desc" },
                limit: 200
            }
        };
        spyOn(org.ekstep.services.assessmentService, "getQuestions").and.callThrough();
        spyOn(org.ekstep.services.searchService, "search");
        org.ekstep.services.assessmentService.getQuestions(data, function(err, res) {
            expect(err).toBe("no data found");
            expect(org.ekstep.services.assessmentService.postFromService).toHaveBeenCalled();
            expect(org.ekstep.services.searchService.search).toHaveBeenCalled();
            expect(org.ekstep.services.assessmentService.postFromService.calls.count()).toBe(1);
        });
    });

    it("should return template using content service", function() {
        var templateData = '{"id":"ekstep.content.info","ver":"2.0","ts":"2017-03-21T13:28:52ZZ","params":{"resmsgid":"0d44ec17-0a63-4dec-a2bd-9a42c46788c4","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"content":{"identifier":"domain_49060","body":"{theme:{}}","languageCode":"en"}}}';
        org.ekstep.services.assessmentService.get = jasmine.createSpy().and.callFake(function(url, headers, cb) {
            cb(undefined, templateData);
        });
        var templateId = 'domain_49060';
        
        spyOn(org.ekstep.services.contentService, "getTemplateData");
        org.ekstep.services.assessmentService.getTemplate(templateId, function(err, res) {
            if(res) {
                expect(res).toBe(templateData);
                var result = JSON.parse(res);
                expect(result.result.content.identifier).toBe('domain_49060');
                expect(org.ekstep.services.contentService.getTemplateData).toHaveBeenCalled();
            }
        });
    });

    it("should return error on getTemplate method call", function() {        
        var templateId = 'domain_49060';
        spyOn(org.ekstep.services.assessmentService, "getTemplate").and.callThrough();
        spyOn(org.ekstep.services.contentService, "getTemplateData").and.callThrough();
        org.ekstep.services.assessmentService.getTemplate(templateId, function(err, res) {            
            expect(err).toBeDefined();
        });
    });

    it("should return assessmentitem for given item id", function() {
        var assessmentitem = '{"id":"ekstep.assessment_item.find","ver":"1.0","ts":"2017-03-21T11:42:11ZZ","params":{"resmsgid":"2b8e3307-2430-4452-a9e8-37bad06088a5","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"assessment_item":{"template":"org.ekstep.mcq.grid.ta","lastUpdatedBy":"263","identifier":"do_10096637","code":"org.ekstep.assessmentitem._58185452261d6","question":"","subject":"domain","qlevel":"EASY","createdBy":"263","language":["English"],"media":[{"id":"do_10096619","type":"image","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_10096619/artifact/boyandgirlshoot_1478016491364.medium.png","asset_id":"do_10096619"}],"type":"mcq","title":"MCQ Low Res Asset","createdOn":"2016-11-01T17:24:04.296+0000","versionKey":"1478021044296","gradeLevel":["Kindergarten","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Other"],"max_score":1,"domain":["numeracy"],"question_image":"do_10096619","options":[{"value":{"type":"mixed","text":"1","count":"","image":null,"audio":null,"resvalue":"1","resindex":0},"score":1,"answer":true},{"value":{"type":"mixed","text":"2","count":"","image":null,"audio":null,"resvalue":"2","resindex":1}},{"value":{"type":"mixed","text":"3","count":"","image":null,"audio":null,"resvalue":"3","resindex":2}},{"value":{"type":"mixed","text":"4","count":"","image":null,"audio":null,"resvalue":"4","resindex":3}}],"name":"MCQ Low Res Asset","lastUpdatedOn":"2016-11-01T17:24:04.296+0000","used_for":"worksheet","template_id":"domain_49156"}}}';
        org.ekstep.services.assessmentService.get = jasmine.createSpy().and.callFake(function(url, headers, cb) {
            cb(undefined, assessmentitem);
        });
        var itemId = 'do_10096637';
        spyOn(org.ekstep.services.assessmentService, "getItem").and.callThrough();
        spyOn(org.ekstep.services.assessmentService, "getFromService").and.callThrough();
        org.ekstep.services.assessmentService.getItem(itemId, function(err, res) {
            expect(res).toBe(assessmentitem);
            expect(org.ekstep.services.assessmentService.getFromService).toHaveBeenCalled();
            expect(org.ekstep.services.assessmentService.getFromService.calls.count()).toBe(1);
        });
    });

    it("should return error on getItem method call", function() {
        org.ekstep.services.assessmentService.get = jasmine.createSpy().and.callFake(function(url, headers, cb) {
            cb("no data found", undefined);
        });
        var itemId = 'do_10096637';
        spyOn(org.ekstep.services.assessmentService, "getItem").and.callThrough();
        spyOn(org.ekstep.services.assessmentService, "getFromService").and.callThrough();
        org.ekstep.services.assessmentService.getItem(itemId, function(err, res) {
            expect(err).toBe("no data found");
            expect(org.ekstep.services.assessmentService.getFromService).toHaveBeenCalled();
            expect(org.ekstep.services.assessmentService.getFromService.calls.count()).toBe(1);
        })
    });

    it("should return error on saveQuestion method call", function() {
        var id = 'do_1122187471533834241137';
        var data = {"request":{"assessment_item":{"objectType":"AssessmentItem","identifier":"do_1122187471533834241137","metadata":{"name":"What colour are the trees","title":"What colour are the trees","question":"What colour are the trees ?","description":"","model":"null","code":"org.ekstep.assessmentitem.do_1122187471533834241137","language":["English"],"used_for":"worksheet","domain":["literacy"],"gradeLevel":["Grade 2"],"createdBy":"316","keyword":[],"max_score":1,"qlevel":"EASY","lastUpdatedBy":"316","type":"mcq","options":[{"value":{"type":"mixed","text":"Red","count":"","image":null,"audio":null}},{"value":{"type":"mixed","text":"Green","count":"","image":null,"audio":null},"score":1,"answer":true},{"value":{"type":"mixed","text":"Pink","count":"","image":null,"audio":null}},{"value":{"type":"mixed","text":"Blue","count":"","image":null,"audio":null}}],"template":"mcqtest","template_id":"domain_46659","question_image":"","question_audio":""},"outRelations":[{"endNodeId":"LO17","relationType":"associatedTo"}]}}};
        var responseData = {"id":"ekstep.learning.item.update","ver":"1.0","ts":"2017-11-22T06:47:47ZZ","params":{"resmsgid":"54ef9efe-29ec-48e6-a7e2-10603e935a32","msgid":"cc08a106-b419-4d3d-8376-b8bd0df5ba32","err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"node_id":"do_1122187471533834241137","versionKey":"1511333267825"}};
    
        org.ekstep.services.assessmentService.post = jasmine.createSpy().and.callFake(function(url, data, headers, cb) {
            cb("NOT FOUND", responseData);
        });
       
        spyOn(org.ekstep.services.assessmentService, "saveQuestion").and.callThrough();
        org.ekstep.services.assessmentService.saveQuestion(id, data, function(err, res) {
            expect(err.responseText).toBe("NOT FOUND");
        });

        org.ekstep.services.assessmentService.saveQuestion('', data, function(err, res) {
            expect(err).toBe("NOT FOUND");
        });
    });

    it("should delete questions using delete service", function() {
        var deleteResponse = {"id":"ekstep.learning.itemset.delete","ver":"1.0","ts":"2018-07-26T05:47:56ZZ","params":{"resmsgid":"ac07608c-abf5-417f-8db8-78c072b0b739","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{},"responseTime":300};
        org.ekstep.services.assessmentService.delete = jasmine.createSpy().and.callFake(function(url, headers, cb) {
            cb(undefined, deleteResponse);
        });
        spyOn(org.ekstep.services.assessmentService, "deleteQuestion").and.callThrough();
        org.ekstep.services.assessmentService.deleteQuestion('do_212465374744944640119', function(err, res) {
            expect(res).toBe(deleteResponse);
            expect(org.ekstep.services.assessmentService.delete).toHaveBeenCalled();
            expect(org.ekstep.services.assessmentService.delete.calls.count()).toBe(1);
        });
    });

    it("should return error when deleting questions using delete service", function() {
        org.ekstep.services.assessmentService.delete = jasmine.createSpy().and.callFake(function(url, headers, cb) {
            cb("NOT_FOUND", undefined);
        });
        spyOn(org.ekstep.services.assessmentService, "deleteQuestion").and.callThrough();
        org.ekstep.services.assessmentService.deleteQuestion('', function(err, res) {
            expect(err).toBe("NOT_FOUND");
            expect(org.ekstep.services.assessmentService.delete).toHaveBeenCalled();
            expect(org.ekstep.services.assessmentService.delete.calls.count()).toBe(1);
        });
    });
});
