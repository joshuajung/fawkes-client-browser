import fontawesome from "@fortawesome/fontawesome"
import solid from "@fortawesome/fontawesome-pro-solid"
import regular from "@fortawesome/fontawesome-pro-regular"
import light from "@fortawesome/fontawesome-pro-light"

const icons: Array<any> = [solid, regular, light]

export default () => fontawesome.library.add(...icons)
