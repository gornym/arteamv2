<template>
  <header
    class="animated"
    :style="{ backgroundImage: `url('${headerSrcBg}')` }"
    @animationend="headerAnimationEnd"
  >
    <div class="header-heading animate-color" :class="{ hovered: isHovered }">
      Kompleksowe Wykończenia Wnętrz
    </div>
    <div class="header-more">
      <a :class="{ hovered: isHovered }" @click="scrollToSection1">
        Dowiedz się więcej
        <span class="material-symbols-outlined"> expand_more </span>
      </a>
    </div>
  </header>
</template>

<script>
import PocketBase from "pocketbase";

export default {
  data() {
    return {
      pb: new PocketBase("http://127.0.0.1:8090/"),
      isHovered: false,
      headerSrcBg: "",
    };
  },
  methods: {
    scrollToSection1() {
      document
        .getElementById("section1")
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
    headerAnimationEnd() {
      this.isHovered = true;
    },
  },
  async mounted() {
    await this.loadImg("togeqz2komyymo8", "headerSrcBg");
  },
};
</script>

<style lang="scss">
header {
  height: 100vh;
  width: 100%;
  background-color: #1b1b1b;
  background-size: cover;
  background-position: center;
  border-image: fill 0 linear-gradient(#0003, #000000fd);
  filter: blur(10px);
  animation: fadeIn 2s ease-out forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .header-heading {
    height: 95vh;
    width: 100%;
    text-align: center;
    font-family: "Ubuntu", sans-serif;
    font-size: 3rem;
    color: transparent;
    transition: color 1.5s ease 0s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-heading.hovered {
    color: #e5e5e5;
  }
  .header-more {
    height: 5vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: transparent;
      font-family: "Montserrat", sans-serif;
      position: relative;
      animation: bounceUpDown 1.5s infinite;
      transition: color 1.5s ease 0s;
      cursor: pointer;
    }
    a.hovered {
      color: #e5e5e5;
    }
  }
}
@keyframes fadeIn {
  from {
    filter: blur(10px);
  }
  to {
    filter: blur(0px);
  }
}
@keyframes bounceUpDown {
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
}
</style>
