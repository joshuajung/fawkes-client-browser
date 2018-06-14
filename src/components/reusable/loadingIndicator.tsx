// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../helpers/componentEnhancer"

export interface ParentProps {}

class LoadingIndicator extends React.Component<ParentProps & ce.EnhancedPropsPrivate> {
  render() {
    return <p>{this.props.cl(l => l.loading())}</p>
  }
}

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(LoadingIndicator))()
