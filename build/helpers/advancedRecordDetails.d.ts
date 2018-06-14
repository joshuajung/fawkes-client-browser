import * as advancedFormHelper from "./advancedForm";
import * as advancedDataHelper from "./advancedData";
export interface AdvancedRecordDetailsPropertyToDisplay {
    propertyName: string;
    viewPresenter: {
        component: advancedDataHelper.AdvancedDataPresenter;
        presenterProps?: object;
    };
    editPresenter: {
        component: advancedFormHelper.AdvancedFormFieldPresenter;
        presenterProps?: object;
    };
}
