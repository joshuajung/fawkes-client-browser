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

export interface ParentProps {}
interface StateProps {}
interface DispatchProps {
  logIn: (email: string, password: string) => void
}

class Public extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate
> {
  render() {
    return (
      <section>
        <div className="container">
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
          />
        </div>
      </section>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(Public, { stateMappings, dispatchMappings }))()
