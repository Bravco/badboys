<template>
  <section id="hero">
    <div class="content">
      <div class="text">
        <h1>Jedlo na úrovni</h1>
        <p>Stručná deskripcia reštaurácie Bad Boys. Ide o krátky výstižný text, ktorý správne popisuje web stránku a pizzériu ako takú.</p>
      </div>
      <div class="btns">
        <NuxtLink class="btn-primary" to="ponuka">Objednaj</NuxtLink>
        <a href="#reviews" class="btn-outlined">Pozri Recenzie</a>
      </div>
    </div>
    <div class="hero-background"></div>
  </section>
  <Quickinfo/>
  <section id="location">
    <div class="text">
      <h1>Lokácia</h1>
      <p>Slovenského raja 169/23, 053 11 Smižany</p>
    </div>
    <div class="location-img"></div>
  </section>
  <section id="reviews">
    <h1>Recenzie</h1>
    <p>Viac ako 300+ pozitívnych recenzií</p>
    <Swiper
      class="swiper"
      style="--swiper-pagination-color: var(--color-primary); --swiper-pagination-bullet-inactive-color: var(--color-text);"
      :modules="[SwiperAutoplay, SwiperPagination]"
      :breakpoints="{
        1024: {
          slidesPerView: 3,
        },
      }"
      :slide-next-class="'preview-slide'"
      :slide-prev-class="'preview-slide'"
      :slide-active-class="'active-slide'"
      :slides-per-view="1"
      :centered-slides="true"
      :loop="true"
      :autoplay="{
        delay: 3000,
        pauseOnMouseEnter: true,
      }"
      :grab-cursor="true"
      :pagination="true"
    >
      <SwiperSlide v-for="review in reviews" :key="review">
        <div class="review">
          <Icon class="quote" name="fa6-solid:quote-right" size="4rem"/>
          <div class="stars">
            <Icon v-for="_ in 5" class="star-icon" name="fa6-solid:star" size="1.5rem"/>
          </div>
          <div class="text">
            <h4>{{ review.author }}</h4>
            <p>{{ review.content }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
  const reviews = [
    {
      author: "Silvia",
      content: "Krásne prostredie, veľmi milá obsluha, príjemná hudba. Najlepšie cestoviny, aké som kedy jedla! :) Pizza skvelá, aj syr, nápoje. Veľmi radi sa sem opäť vrátime. Odporúčam! :)",
    },
    {
      author: "Anka",
      content: "Keď mi jedlo prišlo bola som šokovaná. Tak luxusné vyzerajúcu pizzu som ešte nevidela. Na surovinách sa taktiež nešetrilo. Na môj vkus trochu suchá ale inak perfektná, chrumkavé okraje, tečúci syr a za fajn cenu 😊",
    },
    {
      author: "Erik",
      content: "Super prostredie, myslím že každý kto má rád trošku auta si príde na svoje 🙂 Objednal som si extra veľkú pizzu bola perfektná 🍕",
    },
    {
      author: "Stanislav",
      content: "Veľmi chutné jedlo, slušné jednanie. Mám veľmi rád ich pizza štangle ozaj pochúťka.",
    },
    {
      author: "Jarmila",
      content: "Dnes sme si dali obed v Bad Boys v príjemnom chládku vonku pod prístreškom. Musím pochváliť, všetko jedlo-pizze, štangle aj cestoviny boli skvelé, vychutené . Obsluha príjemná a pozitívne naladená, takže za nás TOP.  len tak ďalej",
    },
    {
      author: "Filip",
      content: "Objednali sme si pizzu… rýchla donáška , skvelá cena , na surovinách sa vôbec nešetrilo … veľká spokojnosť :) dostali sme aj pozornosť v podobe nápoja grátis , ďakujeme"
    },
    {
      author: "Michal",
      content: "Na základe kladných recenzií sme si vybrali tento podnik. Objednal som si pizzu pick up a manželka šalát Citroën, Pizza výborná  ( aj keď niekedy menej je viac ) - cesto fakt výborne ( a to som pochodil kopu pizzerii) Šalát zhodnotila manželka ako tiež výborný. Za nás dobrá voľba.",
    },
  ];
</script>

<style scoped>
  .hero-background {
    background-image: url("~/assets/hero-domov.png");
  }

  .content {
    display: grid;
    gap: 3rem;
  }

  .content .text {
    display: grid;
    gap: 1rem;
  }

  .content .text p {
    width: 50%;
  }

  .content .btns {
    display: flex;
    gap: 2rem;
  }

  .active-slide {
    scale: 1.5;
  }

  #location {
    position: relative;
    padding: 0;
  }

  #location .text {
    display: grid;
    place-items: center;
    gap: 1rem;
  }

  #location .text p {
    color: var(--color-text-alt);
  }

  .location-img {
    width: 100%;
    height: 32rem;
    left: 0;
    bottom: 0;
    background-image: url("~/assets/location.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  #reviews {
    min-height: unset;
    display: block;
    padding: 10% 0;
  }

  #reviews h1 {
    margin: 0 auto;
  }

  #reviews p {
    width: fit-content;
    padding-top: 1rem;
    margin: 0 auto;
    color: var(--color-text-alt);
  }

  .swiper {
    padding: 4rem 0;
  }

  .review {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    position: relative;
    margin: 0 2rem;
    padding: 3rem 4rem;
    border-radius: .5rem;
    background: linear-gradient(270deg, #242424 0%, #161616 100%);
    box-shadow: 0 0 2rem .25rem rgba(0, 0, 0, .25);
    transform: scale(.75);
  }

  .review .text {
    display: grid;
    gap: 1rem;
  }

  .review .text p, .review .text h4 {
    text-align: center;
  }

  .stars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;
  }

  .star-icon {
    color: var(--color-primary);
  }

  .quote {
    position: absolute;
    right: 1rem;
    top: .5rem;
    color: var(--color-text-alt);
  }

  @media only screen and (max-width: 768px) {
    .content .text p {
      width: auto;
    }

    .content .btns {
      flex-direction: column;
    }
  }
</style>