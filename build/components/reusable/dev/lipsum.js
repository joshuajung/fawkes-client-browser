"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../helpers/componentEnhancer");
class SimpleComponent extends React.Component {
    render() {
        return (React.createElement("span", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim sit amet leo eget interdum. Suspendisse et mattis urna. Vivamus at hendrerit dolor. Donec mattis, risus vel iaculis varius, libero risus vulputate lacus, sed consectetur elit mauris et ante. Ut id nisl aliquam, porta ipsum eu, cursus lectus. Etiam eleifend, metus sit amet accumsan posuere, sapien diam porttitor lorem, et aliquam mauris ipsum ac odio. Curabitur dui massa, dignissim at bibendum vitae, efficitur et dolor. Nunc molestie, tellus eu feugiat sollicitudin, urna lectus viverra lacus, vitae lacinia magna urna eu ipsum. Curabitur sit amet dignissim nulla. Ut id nisl mollis arcu bibendum faucibus ut vitae orci. Interdum et malesuada fames ac ante ipsum primis in faucibus."));
    }
}
exports.default = (() => ce.enhance(SimpleComponent))();
//# sourceMappingURL=lipsum.js.map