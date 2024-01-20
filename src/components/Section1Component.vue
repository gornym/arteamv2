<template>
  <section id="section1">
    <video
      v-if="videoSrc"
      ref="myVideo"
      autoplay
      muted
      loop
      playsinline
      @loadeddata="startVideoPlayback"
    >
      <source :src="videoSrc" type="video/mp4" />
      Twoja przeglądarka nie obsługuje tagu video.
    </video>
  </section>
</template>

<script>
import PocketBase from "pocketbase";

export default {
  data() {
    return {
      pb: new PocketBase("http://127.0.0.1:8090/"),
      videoSrc: "",
    };
  },
  methods: {
    async loadImg(id, target) {
      try {
        const record = await this.pb.collection("img").getOne(id, {
          expand: "relField1,relField2.subRelField",
        });

        if (record.isVideo) {
          this.videoSrc = `http://127.0.0.1:8090/api/files/img/${id}/${record.field}`;
        } else {
          this[
            target
          ] = `http://127.0.0.1:8090/api/files/img/${id}/${record.field}`;
        }
      } catch (error) {
        console.error(`Błąd podczas ładowania `, error);
      }
    },
  },
  async mounted() {
    await this.loadImg("meby0pqr5cdb9gu", "videoSrc");
  },
};
</script>

<style lang="scss">
section {
  height: 100vh;
  width: 100%;
  background-color: #000000fd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  video {
    padding-top: 10vh;
    width: 70%;
    height: 75%;
    object-fit: cover;
  }
}
</style>
