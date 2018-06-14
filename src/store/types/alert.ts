// External imports

// Internal imports
import { LanguageSelector } from "../../helpers/localization"
import * as cryptoHelper from "../../helpers/crypto"
import * as config from "../../config/ui"

// import * as stl from "./index"

export enum AlertType {
  Info,
  Success,
  Error,
  Warning
}

export class Alert {
  id: string
  type: AlertType
  created: Date
  lastUpdated: Date
  title: LanguageSelector
  message: LanguageSelector
  progress?: number
  dismissed: boolean
  autoDismissTimeout?: number

  constructor(options: {
    title?: LanguageSelector
    message?: LanguageSelector
    type?: AlertType
    progress?: number
    autoDismissTimeout?: number
  }) {
    this.id = cryptoHelper.createGuid()
    this.type = options.type || AlertType.Info
    this.created = new Date()
    this.lastUpdated = new Date()
    if (options.title) this.title = options.title
    else {
      switch (this.type) {
        case AlertType.Success:
          this.title = l => l.alert.title.success()
          break
        case AlertType.Error:
          this.title = l => l.alert.title.error()
          break
        case AlertType.Warning:
          this.title = l => l.alert.title.warning()
          break
        case AlertType.Info:
          this.title = l => l.alert.title.info()
          break
      }
    }
    this.message = options.message
    this.progress = options.progress
    this.dismissed = false
    this.autoDismissTimeout =
      options.autoDismissTimeout === null ? null : config.ui.defaultAlertAutoDismissTimeout
    return this
  }
}
