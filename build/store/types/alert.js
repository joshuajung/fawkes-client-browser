"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoHelper = require("../../helpers/crypto");
const config = require("../../config/ui");
var AlertType;
(function (AlertType) {
    AlertType[AlertType["Info"] = 0] = "Info";
    AlertType[AlertType["Success"] = 1] = "Success";
    AlertType[AlertType["Error"] = 2] = "Error";
    AlertType[AlertType["Warning"] = 3] = "Warning";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
class Alert {
    constructor(options) {
        this.id = cryptoHelper.createGuid();
        this.type = options.type || AlertType.Info;
        this.created = new Date();
        this.lastUpdated = new Date();
        if (options.title)
            this.title = options.title;
        else {
            switch (this.type) {
                case AlertType.Success:
                    this.title = l => l.alert.title.success();
                    break;
                case AlertType.Error:
                    this.title = l => l.alert.title.error();
                    break;
                case AlertType.Warning:
                    this.title = l => l.alert.title.warning();
                    break;
                case AlertType.Info:
                    this.title = l => l.alert.title.info();
                    break;
            }
        }
        this.message = options.message;
        this.progress = options.progress;
        this.dismissed = false;
        this.autoDismissTimeout =
            options.autoDismissTimeout === null ? null : config.ui.defaultAlertAutoDismissTimeout;
        return this;
    }
}
exports.Alert = Alert;
//# sourceMappingURL=alert.js.map