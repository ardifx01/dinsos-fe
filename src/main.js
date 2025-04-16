import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from "./router";
import Wrapper from "./components/Layout/Wrapper.vue";
import Button from "./components/Button.vue";
import DataGrid from "./components/DataGrid.vue";
import Action from "./components/Action.vue";
import FormGroup from "./components/FormGroup.vue";
import Filter from "./components/Filter.vue";
import FormSelect from "./components/FormSelect.vue";

const app = createApp(App);

// register global components
app.component("Wrapper", Wrapper);
app.component("Button", Button);
app.component("DataGrid", DataGrid);
app.component("Action", Action);
app.component("FormGroup", FormGroup);
app.component("Filter", Filter);
app.component("FormSelect", FormSelect);

app.use(VueQueryPlugin).use(router).mount("#app");
