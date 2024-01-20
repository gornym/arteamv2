<template>
  <Nav />
  <Header />
  <Section1 />
  <Section2 />
  <Section3 />
  <Footer />
</template>

<script>
import Nav from "@/components/NavComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Section1 from "@/components/Section1Component.vue";
import Section2 from "@/components/Section2Component.vue";
import Section3 from "@/components/Section3Component.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  data() {
    return {};
  },
  components: {
    Nav,
    Header,
    Section1,
    Section2,
    Section3,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
}
body {
  margin: 0;
  overflow-x: hidden;
  user-select: none;
}
</style>
