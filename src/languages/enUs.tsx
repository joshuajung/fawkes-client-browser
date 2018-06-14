// External imports
import * as React from "react"

// Internal imports
import Language from "./interface"

const enUs: Language = {
  dev: {
    echo: input => input,
    helloWorld: () => "Hello world!",
    jsx: input => <b>{input}</b>
  },
  public: {
    title: () => `Welcome`
  },
  private: {
    navbar: {
      user: () => "User",
      logOut: () => "Log out"
    }
  },
  common: {
    yes: () => "Yes",
    no: () => "No"
  },
  advancedTable: {
    pagination: {
      previous: () => "Previous page",
      next: () => "Next page"
    },
    filters: {
      add: () => "Add filter",
      apply: () => "Apply",
      operators: {
        Equals: () => "is exactly",
        Like: () => "contains",
        Between: () => "is between",
        IsSet: () => "is not empty",
        IsNotSet: () => "is empty"
      }
    }
  },
  advancedRecordDetails: {
    create: () => "Create new record"
  },
  advancedForm: {
    submit: () => "Submit"
  },
  loading: () => "Loading...",
  loginForm: {
    title: () => "Log in",
    email: {
      label: () => "E-mail",
      placeholder: () => "E-mail"
    },
    password: {
      label: () => "Password",
      placeholder: () => "Password"
    },
    alert: {
      loggingIn: () => "Logging you in...",
      loginSuccessful: () => "You are now logged in.",
      loginFailed: () => "You could not be logged in."
    },
    sendLoginLink: () => "Send magic link"
  },
  registrationForm: {
    title: () => "Create account"
  },
  forgotPasswordForm: {
    title: () => "Reset password"
  },
  logOut: {
    buttonLabel: () => "Log out",
    alert: {
      loggingOut: () => "Logging you out...",
      logoutSuccessful: () => "You are now logged out.",
      logoutFailed: () => "You could not be logged out."
    }
  },
  alert: {
    title: {
      success: () => "Success",
      error: () => "Error",
      warning: () => "Warning",
      info: () => "Information"
    },
    loading: () => "Data is loading...",
    loadSuccessful: () => "Data loaded.",
    loadFailed: () => "Data could not be loaded."
  }
}

export default enUs
