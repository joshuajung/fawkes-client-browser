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
        <Header module={this.props.module} />
        <section>
          <div className="container">
            {this.props.module.advancedObjects.map(ao => (
              <Route
                path={"/" + ao.objectName + "/list"}
                exact={true}
                key={"route-at-" + ao.objectName}
              >
                <AdvancedTable advancedObject={ao} module={this.props.module} />
              </Route>
            ))}
            {this.props.module.advancedObjects.map(ao => (
              <Route
                path={"/" + ao.objectName + "/record/:id?"}
                exact={true}
                key={"route-ard-" + ao.objectName}
              >
                <AdvancedRecordDetails
                  advancedObject={ao}
                  module={this.props.module}
                />
              </Route>
            ))}
            {this.props.module.customRoutes.map((cr, crIndex) => (
              <Route
                path={cr.path}
                exact={true}
                component={cr.component}
                key={"route-custom-" + crIndex}
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
