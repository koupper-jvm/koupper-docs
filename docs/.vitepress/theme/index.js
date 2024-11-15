import { h } from "vue";
import DefaultLayout from "vitepress/theme";
import IndexLayout from "./layouts/IndexLayout.vue";
import "./custom.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  Layout: IndexLayout,
  extends: DefaultLayout,
};
