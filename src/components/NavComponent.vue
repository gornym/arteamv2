<template>
  <nav>
    <div class="left-nav">
      <a @click="scrollToSection2"> O NAS</a>
    </div>
    <div class="middle-nav">
      <img alt="logo" :src="logoSrc" draggable="false" />
    </div>
    <div class="right-nav">
      <a @click="scrollToSection3">REALIZACJE</a>
    </div>
  </nav>
</template>

<script>
import PocketBase from "pocketbase";

export default {
  data() {
    return {
      pb: new PocketBase("http://127.0.0.1:8090/"),
      logoSrc: "",
    };
  },
  methods: {
    scrollToSection2() {
      document
        .getElementById("section2")
        .scrollIntoView({ behavior: "smooth" });
    },
    scrollToSection3() {
      document
        .getElementById("section3")
        .scrollIntoView({ behavior: "smooth" });
    },
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
    await this.loadImg("4akvg0zvcur2xd7", "logoSrc");
  },
};
</script>

<style lang="scss">
nav {
  height: 12vh;
  width: 100%;
  background-color: #000000c0;
  box-shadow: 0px 3px 15px black;
  border-bottom: 1px solid rgb(73, 73, 73);
  position: fixed;
  top: 0;
  z-index: 5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .left-nav,
  .right-nav {
    height: 100%;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      font-size: 1.5rem;
      font-family: "Montserrat", sans-serif;
      cursor: pointer;
      color: #e5e5e5;
    }
  }
  .middle-nav {
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 90%;
      filter: drop-shadow(0px 0px 2px black);
    }
  }
}
</style>
