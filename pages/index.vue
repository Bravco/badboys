<template>
  <section id="hero">
    <div class="content">
      <div class="text">
        <h1>Jedlo na úrovni</h1>
        <p>Stručná deskripcia reštaurácie Bad Boys. Ide o krátky výstižný text, ktorý správne popisuje web stránku a pizzériu ako takú.</p>
      </div>
      <div class="btns">
        <a class="btn-primary">Objednaj</a>
        <a class="btn-outlined">Zisti viac</a>
      </div>
    </div>
    <div class="background"></div>
  </section>
  <Quickinfo/>
</template>

<style scoped>
  #hero {
    place-items: start;
    align-items: center;
    position: relative;
  }

  #hero .background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -100;
    background-image: url("~/assets/hero-domov.png");
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
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

  @media only screen and (max-width: 768px) {
    .content .text p {
      width: auto;
    }

    .content .btns {
      flex-direction: column;
    }
  }
</style>