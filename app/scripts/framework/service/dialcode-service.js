/**
 * Service to get DIAL & Link codes
 * 
 * @class org.ekstep.services.dialcodeService
 * @author Kartheek Palla <kartheekp@ilimi.in>
 */
org.ekstep.services.dialcodeService = new(org.ekstep.services.iService.extend({
    /** 
     * @member {string} dialcodeURL
     * @memberof org.ekstep.services.dialcodeService
     */
    dialcodeURL: function() {
        return this.getBaseURL() + this.getAPISlug() + this.getConfig('dialcodeEndPoint', '/dialcode');
    },
    /** 
     * @member {string} contentURL
     * @memberof org.ekstep.services.dialcodeService
     */
    dialcodelinkURL: function() {
        return this.getBaseURL() + this.getAPISlug() + this.getConfig('dialcodeEndPoint', '/content/v3/dialcode');
    },
    /**
     * Get all DIAL codes
     * @param  {Function} callback returns error and response as arguments
     * @memberof org.ekstep.services.dialcodeService
     */
    getAllDialCodes: function(channel, request, callback){
        this.postFromService(this.dialcodeURL() + this.getConfig('getAllDialcodes','/v3/search'), request, this.setChannelInHeader(channel), callback);
    },
    /**
     * retrieves the DIAL code
     * @param  {Function} callback returns error and response as arguments
     * @memberof org.ekstep.services.dialcodeService
     */
    getlDialCode: function(channel, dialCode, callback) {
        if (dialCode) {
            this.get(this.dialcodeURL() + this.getConfig('dialCodeReadUrl', '/v3/read/') + dialCode , this.setChannelInHeader(channel), callback);
        } else {
            callback('dialCode id is required to get dialCode details', undefined);
        }
    },
     /**
     * link dial code to content
     * @param  {Function} callback returns error and response as arguments
     * @memberof org.ekstep.services.dialcodeService
     */
    dialcodeLink: function(channel, request, callback){
        this.postFromService(this.dialcodelinkURL() + this.getConfig('dialcodeLink','/link'), request, this.setChannelInHeader(channel), callback);
    },
    /**
     * set channel in requestHeaders
     * @memberof org.ekstep.services.dialcodeService
     */
    setChannelInHeader: function(channel){
        var headersObj = _.cloneDeep(this.requestHeaders);
        headersObj.headers['X-Channel-Id'] = channel;
        return headersObj;
    }
}));