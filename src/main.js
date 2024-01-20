/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Nav from "@/components/NavComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Section1 from "@/components/Section1Component.vue";
import Section2 from "@/components/Section2Component.vue";
import Section3 from "@/components/Section3Component.vue";
import ImageTrack from "@/components/ImageTrack.vue";
import Footer from "@/components/FooterComponent.vue";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBV7LQfqgQt8zC3e69521Z3m7UC24WXAoo",
  authDomain: "arteamv2-a6422.firebaseapp.com",
  projectId: "arteamv2-a6422",
  storageBucket: "arteamv2-a6422.appspot.com",
  messagingSenderId: "53934501639",
  appId: "1:53934501639:web:5fd836e60f3f2f417edfa2",
};
firebase.initializeApp(firebaseConfig);

const app = createApp(App);
app.component("Nav", Nav);
app.component("Header", Header);
app.component("Section1", Section1);
app.component("Section2", Section2);
app.component("Section3", Section3);
app.component("ImageTrack", ImageTrack);
app.component("Footer", Footer);
app.use(router).mount("#app");
