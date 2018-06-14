// External imports
import * as React from "react"
import FontawesomeIcon from "@fortawesome/react-fontawesome"

// Internal imports
import * as ce from "../../helpers/componentEnhancer"

export interface ParentProps {
  icon: string | Array<string>
  spin?: boolean
}

class Icon extends React.Component<ParentProps & ce.EnhancedPropsPrivate> {
  render() {
    return (
      <span className="fawkes-icon">
        <FontawesomeIcon icon={this.props.icon} spin={this.props.spin} />
      </span>
    )
  }
}

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(Icon))()
