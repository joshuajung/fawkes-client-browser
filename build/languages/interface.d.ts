/// <reference types="react" />
export default interface Language {
    dev?: {
        echo?: (input: string) => string;
        helloWorld?: () => string;
        jsx?: (input) => JSX.Element;
    };
    public?: {
        title?: () => string;
    };
    private?: {
        navbar?: {
            user?: () => string;
            logOut?: () => string;
        };
    };
    common?: {
        yes?: () => string;
        no?: () => string;
    };
    advancedTable?: {
        pagination?: {
            previous?: () => string;
            next?: () => string;
        };
        filters?: {
            add?: () => string;
            apply?: () => string;
            operators?: {
                Equals?: () => string;
                Like?: () => string;
                Between?: () => string;
                IsSet?: () => string;
                IsNotSet?: () => string;
            };
        };
    };
    advancedRecordDetails?: {
        create?: () => string;
    };
    advancedForm?: {
        submit?: () => string;
    };
    loading?: () => string;
    loginForm?: {
        title?: () => string;
        email?: {
            label?: () => string;
            placeholder?: () => string;
        };
        password?: {
            label?: () => string;
            placeholder?: () => string;
        };
        alert?: {
            loggingIn?: () => string;
            loginSuccessful?: () => string;
            loginFailed?: () => string;
        };
        sendLoginLink?: () => string;
    };
    registrationForm?: {
        title?: () => string;
    };
    forgotPasswordForm?: {
        title?: () => string;
    };
    resetPasswordWithTokenForm?: {
        title?: () => string;
        formFieldLabel?: () => string;
    };
    logOut?: {
        buttonLabel?: () => string;
        alert?: {
            loggingOut?: () => string;
            logoutSuccessful?: () => string;
            logoutFailed?: () => string;
        };
    };
    alert?: {
        title?: {
            success?: () => string;
            error?: () => string;
            warning?: () => string;
            info?: () => string;
        };
        loading?: () => string;
        loadSuccessful?: () => string;
        loadFailed?: () => string;
    };
}
