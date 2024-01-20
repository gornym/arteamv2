<template>
  <section id="section3">
    <ImageTrack />
  </section>
</template>

<script>
import ImageTrack from "@/components/ImageTrack.vue";

export default {
  data() {
    return {};
  },
  components: {
    ImageTrack,
  },
};
</script>

<style lang="scss">
#section3 {
  height: 100vh;
  width: 100%;
  background: linear-gradient(#1b1b1b33, #000000fd);
  background-color: #727272;
  margin: 0rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: 16px;
}
</style>
