<template>
  <div class="footer-box">
    <div class="copy">
      <a class="copy-text">AR-TEAM © 2016 - 2024 All rights reserved. </a>
    </div>
    <div class="logo">
      <img alt="logo" :src="footerLogo" draggable="false" />
    </div>
    <div class="social-media">
      <a class="social" href="https://www.facebook.com/arteamwykonczeniewnetrz">
        <img alt="facebook" :src="fbIcon" />
      </a>
      <a
        class="social"
        href="https://www.instagram.com/roman.arteam"
        style="padding-right: 2rem"
      >
        <img alt="instagram" :src="igIcon" />
      </a>
    </div>
  </div>
</template>
<script>
import PocketBase from "pocketbase";

export default {
  data() {
    return {
      pb: new PocketBase("http://127.0.0.1:8090/"),
      footerLogo: "",
      fbIcon: "",
      igIcon: "",
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
    await this.loadImg("i28yfritcawp9aa", "footerLogo");
    await this.loadImg("7k9c59xq35bfdig", "fbIcon");
    await this.loadImg("dsffepi3n9mvq2y", "igIcon");
  },
};
</script>
<style lang="scss">
.footer-box {
  height: 10vh;
  width: 100%;
  border-top: 1px solid white;
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .copy {
    height: 100%;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .copy-text {
      padding-left: 2rem;
      color: #e3e3e3;
      font-family: "Montserrat", sans-serif;
    }
  }
  .logo {
    height: 90%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-left: 1px solid grey;
    // border-right: 1px solid grey;
    img {
      height: 70%;
    }
  }
  .social-media {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 2%;
    .social {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 2.5rem;
        transition: 0.6s all;
        padding: 5px 5px;
        border-radius: 50%;
      }
      img:hover {
        background-color: #e3e3e35a;
      }
    }
  }
}
</style>
