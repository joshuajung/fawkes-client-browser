// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../helpers/componentEnhancer"
import * as userActions from "../../actions/user"
import Title from "../reusable/title"
import Button from "../reusable/button"

export interface ParentProps {}
interface StateProps {}
interface DispatchProps {
  logInWithToken: (token: string) => void
}
interface LocalState {}

class LogInWithTokenPage extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  componentDidMount() {
    if (this.props.match.params.token)
      this.props.logInWithToken(this.props.match.params.token)
  }
  render() {
    return (
      <div>
        <Title
          title={this.props.cl(l => l.public.title())}
          subtitle={this.props.cl(l => l.loginForm.title())}
        >
          <Button
            label={this.props.cl(l => l.loginForm.title())}
            href="/"
          />
        </Title>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  logInWithToken: (token: string) => {
    d(userActions.logInWithToken(props.module.api, token, props.history))
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(LogInWithTokenPage, { stateMappings, dispatchMappings }))()
