// External imports
import * as React from "react"
import { Route } from "react-router-dom"

// Internal imports
import * as ce from "../../helpers/componentEnhancer"
import Header from "./header/header"
import AdvancedTable from "../reusable/advancedTable/advancedTable"
import AdvancedRecordDetails from "../reusable/advancedRecordDetails/advancedRecordDetails"

export interface ParentProps {}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

class Private extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <div>
        {this.props.module.hideHeader ? null : (
          <Header module={this.props.module} />
        )}
        <section>
          <div className="container">
            {this.props.module.advancedObjects.map(ao => (
              <Route
                path={"/" + ao.objectName + "/list"}
                exact={true}
                key={"route-at-" + ao.objectName}
                render={() => (
                  <AdvancedTable
                    advancedObject={ao}
                    module={this.props.module}
                  />
                )}
              />
            ))}
            {this.props.module.advancedObjects.map(ao => (
              <Route
                path={"/" + ao.objectName + "/record/:id?"}
                exact={true}
                key={"route-ard-" + ao.objectName}
                render={() => (
                  <AdvancedRecordDetails
                    advancedObject={ao}
                    module={this.props.module}
                  />
                )}
              />
            ))}
            {this.props.module.customRoutes.map((cr, crIndex) => (
              <Route
                path={cr.path}
                exact={true}
                key={"route-custom-" + crIndex}
                render={() => {
                  const Component = cr.component as any
                  return <Component module={this.props.module} />
                }}
              />
            ))}
          </div>
        </section>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(Private, { stateMappings, dispatchMappings }))()
