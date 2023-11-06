<script lang="ts">
  export let variant: 'button' | 'static' = 'button';
  export let shadow = true;
  let cls = '';
  export { cls as class };
</script>

<div
  class="letter-image {cls}"
  on:click|stopPropagation
  role={variant === 'button' ? 'button' : ''}
  aria-label="Mail"
>
  <div class="animated-mail">
    <div class="__back-fold" />
    <div class="__letter">
      <div class="__letter-border" />
      <div class="__letter-title" />
      <div class="__letter-context" />
      <div class="__letter-stamp">
        <div class="__letter-stamp-inner" />
      </div>
    </div>
    <div class="__top-fold" />
    <div class="__body" />
    <div class="__left-fold" />
  </div>
  {#if shadow}
    <div class="__shadow" />
  {/if}
</div>

<style lang="postcss">
  .letter-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 200px;
    height: 200px;

    &[role='button'] {
      cursor: pointer;
    }
  }

  .animated-mail {
    position: absolute;
    width: 200px;
    height: 150px;
    transition: 0.4s;

    & .__body {
      position: absolute;
      z-index: 2;
      bottom: 0;

      width: 0;
      height: 0;

      border-color: transparent transparent #e95f55;
      border-style: solid;
      border-width: 0 0 100px 200px;
    }

    & .__top-fold {
      position: absolute;
      z-index: 2;
      top: 50px;
      transform-origin: 50% 0%;

      width: 0;
      height: 0;

      border-color: #cf4a43 transparent transparent;
      border-style: solid;
      border-width: 50px 100px 0;

      transition: transform 0.4s 0.4s, z-index 0.2s 0.4s;
    }

    & .__back-fold {
      position: absolute;
      z-index: 0;
      bottom: 0;

      width: 200px;
      height: 100px;

      background: #cf4a43;
    }

    & .__left-fold {
      position: absolute;
      z-index: 2;
      bottom: 0;

      width: 0;
      height: 0;

      border-color: transparent transparent transparent #e15349;
      border-style: solid;
      border-width: 50px 0 50px 100px;
    }

    & .__letter {
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 20px;

      overflow: hidden;

      width: 160px;
      height: 60px;

      background: white;

      transition: 0.4s 0.2s;

      & .__letter-border {
        width: 100%;
        height: 10px;
        background: repeating-linear-gradient(
          -45deg,
          #cb5a5e,
          #cb5a5e 8px,
          transparent 8px,
          transparent 18px
        );
      }

      & .__letter-title {
        width: 40%;
        height: 10px;
        margin-top: 10px;
        margin-left: 5px;

        background: #cb5a5e;
      }

      & .__letter-context {
        width: 20%;
        height: 10px;
        margin-top: 10px;
        margin-left: 5px;

        background: #cb5a5e;
      }

      & .__letter-stamp {
        width: 30px;
        height: 30px;
        margin-top: 30px;
        margin-left: 120px;

        opacity: 0.3;
        background: #cb5a5e;
        border-radius: 100%;
      }
    }
  }

  .__shadow {
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);

    width: 400px;
    height: 30px;

    background: radial-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 0%), rgb(0 0 0 / 0%));
    border-radius: 100%;

    transition: 0.4s;

    @dark global {
      background: radial-gradient(rgb(255 255 255 / 50%), rgb(255 255 255 / 0%), rgb(255 255 255 / 0%));
    }
  }

  .letter-image:hover {
    & .animated-mail {
      transform: translateY(50px);
    }

    & .animated-mail .__top-fold {
      z-index: 0;
      transform: rotateX(180deg);
      transition: transform 0.4s, z-index 0.2s;
    }

    & .animated-mail .__letter {
      height: 180px;
    }

    & .__shadow {
      width: 250px;
    }
  }

  .letter-image.open {
    opacity: 0.25;

    & .animated-mail {
      transform: translateY(50px);
    }

    & .animated-mail .__top-fold {
      z-index: 0;
      transform: rotateX(180deg);
      transition: transform 0.4s, z-index 0.2s;
    }

    & .animated-mail .__letter {
      height: 180px;
    }

    & .__shadow {
      width: 250px;
    }
  }

  .letter-image.closed {
    cursor: default;

    & .animated-mail {
      transform: none;
    }

    & .animated-mail .__top-fold {
      transform: none;
    }

    & .animated-mail .__letter {
      display: none;
    }
  }
</style>
