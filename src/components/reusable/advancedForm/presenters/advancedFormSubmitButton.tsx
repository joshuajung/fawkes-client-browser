// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"
import Button from "../../button"

export interface ParentProps {
  label?: string
}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

class AdvancedFormSubmitButton extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <div className="field">
        <div className="control">
          <Button
            classNames={["is-primary"]}
            label={
              this.props.label ||
              this.props.cl(l => l.advancedForm.submit())
            }
            isSubmit={true}
          />
        </div>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedFormSubmitButton, { stateMappings, dispatchMappings }))()
