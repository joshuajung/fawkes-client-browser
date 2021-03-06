// External imports
import * as React from "react"
import { render as reactRender } from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import { combineReducers } from "redux"

// Internal imports
import { configureStore } from "./store/store"
import * as componentEnhancer from "./helpers/componentEnhancer"
import Module, { ApiConfig } from "./helpers/moduleInterface"
import { ThunkCall } from "./helpers/middlewareTypes"
import { lookup, GenericLanguageSelector } from "./helpers/localization"
import * as apiActions from "./actions/api"
import * as advancedFormActions from "./actions/advancedForm"
import * as uiActions from "./actions/ui"
import * as eventLibrary from "./helpers/eventLibrary"
import loadIcons from "./helpers/icons"
import * as stateTools from "./helpers/stateTools"

// ## Components
import AdvancedForm from "./components/reusable/advancedForm/advancedForm"
import AdvancedFormArray from "./components/reusable/advancedForm/advancedFormArray"
import AdvancedFormField from "./components/reusable/advancedForm/advancedFormField"
import AdvancedFormInput from "./components/reusable/advancedForm/presenters/advancedFormInput"
import AdvancedFormInputReadonly from "./components/reusable/advancedForm/presenters/advancedFormInputReadonly"
import AdvancedFormTextarea from "./components/reusable/advancedForm/presenters/advancedFormTextarea"
import AdvancedFormSelect from "./components/reusable/advancedForm/presenters/advancedFormSelect"
import AdvancedFormCheckbox from "./components/reusable/advancedForm/presenters/advancedFormCheckbox"
import AdvancedFormSubmitButton from "./components/reusable/advancedForm/presenters/advancedFormSubmitButton"
import AdvancedDataSpan from "./components/reusable/advancedDataField/presenters/advancedDataSpan"
import AdvancedTable from "./components/reusable/advancedTable/advancedTable"
import AdvancedRecordDetails from "./components/reusable/advancedRecordDetails/advancedRecordDetails"
import NavbarItem from "./components/private/header/navbarItem"
import Root from "./components/root"
import Title from "./components/reusable/title"
import Button from "./components/reusable/button"
import Icon from "./components/reusable/icon"

const initialize = () => {
  loadIcons()
}
const render = (m: Module) => {
  return reactRender(
    <BrowserRouter>
      <Provider store={configureStore(m.reducer)}>
        {m.customRootComponent ? (
          <m.customRootComponent module={m} />
        ) : (
          <Root module={m} />
        )}
      </Provider>
    </BrowserRouter>,
    document.getElementById(m.rootElementId)
  )
}

export {
  AdvancedDataSpan,
  advancedFormActions,
  AdvancedForm,
  AdvancedFormArray,
  AdvancedFormCheckbox,
  AdvancedFormField,
  AdvancedFormInput,
  AdvancedFormInputReadonly,
  AdvancedFormSelect,
  AdvancedFormSubmitButton,
  AdvancedFormTextarea,
  AdvancedRecordDetails,
  AdvancedTable,
  apiActions,
  uiActions,
  ApiConfig,
  Button,
  combineReducers,
  componentEnhancer,
  eventLibrary,
  GenericLanguageSelector,
  initialize,
  lookup,
  Module,
  NavbarItem,
  React,
  render,
  Route,
  ThunkCall,
  Title,
  stateTools,
  Icon
}
