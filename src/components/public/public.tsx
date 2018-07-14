// External imports
import * as React from "react"
import { Route } from "react-router-dom"

// Internal imports
import * as ce from "../../helpers/componentEnhancer"
import LoginForm from "./loginForm"
import RegistrationForm from "./registrationForm"
import ForgotPasswordForm from "./forgotPasswordForm"
import ResetPasswordWithTokenForm from "./resetPasswordWithTokenForm"
import LogInWithTokenPage from "./logInWithTokenPage"
import * as userActions from "../../actions/user"
import LoadingIndicator from "../reusable/loadingIndicator"

export interface ParentProps {}
interface StateProps {}
interface DispatchProps {
  logInWithAppleIdentifier: () => void
}

class Public extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate
> {
  componentDidMount() {
    if (this.props.module.autoLoginWithAppleIdentifier)
      this.props.logInWithAppleIdentifier()
  }
  render() {
    return (
      <section>
        <div className="container">
          {this.props.module.autoLoginWithAppleIdentifier ? (
            <LoadingIndicator />
          ) : (
            <>
              <Route
                path={"/"}
                exact={true}
                render={() => <LoginForm module={this.props.module} />}
              />
              <Route
                path={"/register"}
                exact={true}
                render={() => <RegistrationForm module={this.props.module} />}
              />
              <Route
                path={"/forgotPassword"}
                exact={true}
                render={() => <ForgotPasswordForm module={this.props.module} />}
              />
              <Route
                path={"/resetPasswordWithToken/:token"}
                exact={true}
                render={() => (
                  <ResetPasswordWithTokenForm module={this.props.module} />
                )}
              />
              <Route
                path={"/logInWithToken/:token"}
                exact={true}
                render={() => <LogInWithTokenPage module={this.props.module} />}
              />{" "}
            </>
          )}
        </div>
      </section>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  logInWithAppleIdentifier: () =>
    d(userActions.logInWithAppleIdentifier(props.module.api, props.history))
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(Public, { stateMappings, dispatchMappings }))()
