import { LanguageSelector } from "../../helpers/localization";
export declare enum AlertType {
    Info = 0,
    Success = 1,
    Error = 2,
    Warning = 3,
}
export declare class Alert {
    id: string;
    type: AlertType;
    created: Date;
    lastUpdated: Date;
    title: LanguageSelector;
    message: LanguageSelector;
    progress?: number;
    dismissed: boolean;
    autoDismissTimeout?: number;
    constructor(options: {
        title?: LanguageSelector;
        message?: LanguageSelector;
        type?: AlertType;
        progress?: number;
        autoDismissTimeout?: number;
    });
}
