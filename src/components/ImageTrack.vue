<template>
  <div
    id="image-track"
    :data-mouse-down-at="mouseDownAt"
    :data-prev-percentage="prevPercentage"
  >
    <h1 class="img-text">
      Nasze<br />
      REALIZACJE
      <div class="arrow-box">
        <img alt="arrow" :src="arrowImg" draggable="false" />
      </div>
    </h1>
    <img
      v-for="(image, index) in images"
      :key="index"
      :src="image.src"
      alt="sec3-img"
      class="image"
      draggable="false"
    />
  </div>
</template>

<script>
import PocketBase from "pocketbase";

export default {
  data() {
    return {
      pb: new PocketBase("http://127.0.0.1:8090/"),
      mouseDownAt: 0,
      prevPercentage: 0,
      arrowImg: "",
      images: [
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },

        {
          src: "",
        },
      ],
    };
  },
  methods: {
    handleOnDown(e) {
      this.mouseDownAt = e.clientX;
    },
    handleOnUp() {
      this.mouseDownAt = 0;
      this.prevPercentage = this.$el.dataset.percentage;
    },
    handleOnMove(e) {
      if (this.mouseDownAt === 0) return;

      const mouseDelta = parseFloat(this.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
          parseFloat(this.prevPercentage) + percentage,
        nextPercentage = Math.max(
          Math.min(nextPercentageUnconstrained, 0),
          -60
        );

      this.$el.dataset.percentage = nextPercentage;

      this.$el.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of this.$el.getElementsByClassName("image")) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    },
    async loadImg(id, index) {
      try {
        const record = await this.pb.collection("img").getOne(id, {
          expand: "relField1,relField2.subRelField",
        });

        // Sprawdź, czy to obraz strzałki
        if (index === "arrowImg") {
          this.arrowImg = `http://127.0.0.1:8090/api/files/img/${id}/${record.field}`;
        } else {
          this.images[index] = {
            src: `http://127.0.0.1:8090/api/files/img/${id}/${record.field}`,
          };
        }
      } catch (error) {
        console.error("Błąd podczas ładowania obrazka:", error);
      }
    },
  },
  async mounted() {
    window.addEventListener("mousedown", this.handleOnDown);
    window.addEventListener("mouseup", this.handleOnUp);
    window.addEventListener("mousemove", this.handleOnMove);
    window.addEventListener("touchstart", (e) =>
      this.handleOnDown(e.touches[0])
    );
    window.addEventListener("touchend", (e) => this.handleOnUp(e.touches[0]));
    window.addEventListener("touchmove", (e) =>
      this.handleOnMove(e.touches[0])
    );
    await this.loadImg("qedslpylcx0pert", 0);
    await this.loadImg("1qgu4pyt9noqfn3", 1);
    await this.loadImg("bwrdeaub46dass1", 2);
    await this.loadImg("cs1b9louvdi2tfl", 3);
    await this.loadImg("ahs8hrz8f302r2v", 4);
    await this.loadImg("14kpyfpr11xzd2o", 5);
    await this.loadImg("o3kp4puie1g0cou", "arrowImg");
  },
  beforeUnmount() {
    window.removeEventListener("mousedown", this.handleOnDown);
    window.removeEventListener("mouseup", this.handleOnUp);
    window.removeEventListener("mousemove", this.handleOnMove);
    window.removeEventListener("touchstart", (e) =>
      this.handleOnDown(e.touches[0])
    );
    window.removeEventListener("touchend", (e) =>
      this.handleOnUp(e.touches[0])
    );
    window.removeEventListener("touchmove", (e) =>
      this.handleOnMove(e.touches[0])
    );
  },
};
</script>
<style lang="scss" scoped>
#image-track > .image {
  width: 40vmin;
  height: 56vmin;
  object-fit: cover;
  object-position: 100% 50%;
  box-shadow: 0px 0px 20px black;
}

#image-track {
  display: flex;
  gap: 4vmin;
  position: relative;
  left: 50%;
  top: 40%;
  transform: translate(0%, -50%);
}
.img-text {
  margin-right: 5%;
  font-size: 10rem;
  font-weight: 700;
  font-family: "Ubuntu", sans-serif;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 0px 3px white);
  color: aliceblue;
}
.arrow-box {
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  filter: drop-shadow(0px 0px 0px black);

  img {
    width: 100%;
    height: 2rem;
  }
}
</style>
