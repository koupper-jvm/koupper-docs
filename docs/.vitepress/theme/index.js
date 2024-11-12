import { h } from "vue";
import DefaultLayout from "vitepress/theme";
import IndexLayout from "./layouts/IndexLayout.vue";
import "./custom.css";

export default {
  Layout: IndexLayout,
  extends: DefaultLayout,
};
