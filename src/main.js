import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primeicons/primeicons.css";
import "./style.css";
import "./flags.css";

import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import ConfirmationService from "primevue/confirmationservice";
import Button from "primevue/button";
import Tooltip from "primevue/tooltip";
import BadgeDirective from "primevue/badgedirective";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import ToastService from "primevue/toastservice";
import Dialog from "primevue/dialog";
import DialogService from "primevue/dialogservice";
import DynamicDialog from "primevue/dynamicdialog";

import FocusTrap from "primevue/focustrap";

const pinia = createPinia();

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.use(router);

app.directive("tooltip", Tooltip);
app.directive("badge", BadgeDirective);
app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);
app.directive("focustrap", FocusTrap);

app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("DynamicDialog", DynamicDialog);

app.use(DialogService);
app.use(pinia);
app.mount("#app");
