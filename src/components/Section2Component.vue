<template>
  <section id="section2">
    <div class="about-box">
      <div class="about-content">
        <div
          class="about-content1"
          id="aboutSection"
          :class="{ 'slide-left': isScrolledToAbout }"
        >
          <a>Kompleksowe usługi wykończeniowo-budowlane</a>
          <a style="font-weight: 700">8 lat doświadczenia na rynku</a>
          <a>Od projektu do realizacji jedna umowa, jeden wykonawca</a>
        </div>
        <div
          class="about-content2"
          id="aboutSection"
          :class="{ 'slide-left': isScrolledToAbout }"
        >
          <p>
            Zespół AR Team realizuje prace związane z wykończeniem wnętrz,
            remontami oraz usługami budowlanymi. Każdy projekt wykonujemy z
            najwyższą starannością i dbałością o detale. Nasze doświadczenie
            budowane przez wiele lat pracy w Polsce i Ukrainie oraz staranny
            dobór niezawodnych materiałów gwarantują rezultaty na najwyższym
            poziomie.
          </p>
        </div>
        <div
          class="about-content3"
          id="aboutSection"
          :class="{ 'slide-left': isScrolledToAbout }"
        >
          <div class="offer-box1">
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Tynkowanie, szpachlowanie, malowanie
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Hydraulika, elektryka
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Kabiny prysznicowe
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Baterie podtynkowe
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Zabudowy GK
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Glazura, terakota
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Układanie parkietu
            </h1>
          </div>
          <div class="offer-box2">
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Montaż listw przypodłogowych oraz sufitowych
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Montaż drzwi zewnętrznych oraz wewnętrznych
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Baterie podtynkowe
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Montaż sufitów podwieszanych oraz naciąganych
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Oświetlenie
            </h1>
            <h1>
              <span
                class="material-symbols-outlined"
                style="font-size: 15px; padding-right: 1rem"
              >
                done_outline </span
              >Meble na wymiar
            </h1>
          </div>
        </div>
        <div
          class="about-content4"
          id="aboutSection"
          :class="{ 'slide-left': isScrolledToAbout }"
        >
          <a @click="scrollToSection3">Zobacz Nasze Realizacje!</a>
        </div>
      </div>
      <div class="about-img">
        <img
          alt="sec2-photo1"
          :src="aboutImg1"
          style="transform: translateX(100px)"
        />
        <img alt="sec2-photo2" :src="aboutImg2" />
      </div>
    </div>
  </section>
</template>

<script>
import PocketBase from "pocketbase";

export default {
  data() {
    return {
      pb: new PocketBase("http://127.0.0.1:8090/"),
      aboutImg1: "",
      aboutImg2: "",
    };
  },
  methods: {
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
    await this.loadImg("8fm64o1mleoc0du", "aboutImg1");
    await this.loadImg("hz2ygv3jc82q8ni", "aboutImg2");
  },
};
</script>

<style lang="scss">
#section2 {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#000000fd, #1b1b1b33);
  background-color: #727272;
  .about-box {
    margin-top: 10vh;
    height: 80vh;
    width: 100%;
    padding: 0 10rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .about-content {
      height: 100%;
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .about-content1,
      .about-content2,
      .about-content3 {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 3%;
        a {
          font-size: 2rem;
          font-family: "Ubuntu", sans-serif;
          color: #e5e5e5;
        }
        p {
          font-size: 1.3rem;
          font-family: "Ubuntu", sans-serif;
          color: #e5e5e5;
        }
        .offer-box1,
        .offer-box2 {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;

          h1 {
            font-size: 1rem;
            font-family: "Ubuntu", sans-serif;
            color: #e5e5e5;
            font-weight: 100;
          }
        }
      }
      .about-content3 {
        flex-direction: row;
      }
      .about-content4 {
        height: 5rem;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        a {
          font-size: 1.5rem;
          font-family: "Ubuntu", sans-serif;
          cursor: pointer;
          color: #e5e5e5;
          background-color: #7272726f;
          padding: 10px 20px;
          border-radius: 0.5rem;
          border: 1px solid #e5e5e556;
          box-shadow: 0px 0px 10px black;
          transition: 0.3s all;
        }
        a:hover {
          background-color: #727272b0;
        }
      }
    }
    .about-img {
      height: 100%;
      width: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5%;
      img {
        width: 70%;
        box-shadow: 0px 0px 10px black;
        border-radius: 0.5rem;
      }
    }
  }
}
</style>
