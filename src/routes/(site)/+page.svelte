<script lang="ts">
  import { getColorSchemeContext } from '$lib/contexts/colorScheme';

  import Mail from './_page/components/Mail.svelte';
  import NeverAskedQuestions from './_page/components/NeverAskedQuestions.svelte';

  const colorSchemaStore = getColorSchemeContext();
  $: ({ preferred } = colorSchemaStore);
  $: isLight = $preferred === 'light';

  function handleColorSchemeSwitch() {
    colorSchemaStore.change(isLight ? 'light' : 'dark');
  }
</script>

<div class="mx-auto max-w-2xl px-6 py-10 mdpx-10 md:py-20 space-y-10 relative overflow-hidden">
  <header class="sticky top-0 py-4 z-10">
    <label class="swap w-fit ml-auto bg-bg">
      <!-- this hidden checkbox controls the state -->
      <input type="checkbox" hidden bind:checked={isLight} onchange={handleColorSchemeSwitch} />
      <!-- sun icon -->
      <svg
        class="swap-on fill-current w-10 h-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><path
          d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
        /></svg
      >
      <!-- moon icon -->
      <svg
        class="swap-off fill-current w-10 h-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><path
          d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
        /></svg
      >
    </label>
  </header>

  <main class="prose dark:prose-invert">
    <section class="font-phanquang tracking-wide">
      <h1 class="font-bold">A Personal Digital Laboratory</h1>
      <p class="italic text-2xl">"It's not a lavatory!" - Quang Phan</p>
    </section>

    <hr class="my-6" />

    <section>
      <h2 class="sr-only" id="my-works">My Works</h2>
      <p>
        Hello there! You have reached this corner of the web where I conduct or record my
        <strong><i>nonsensical</i></strong> experiments:
      </p>
      <ul>
        <li>
          the <a href="https://sveltevietnam.dev">Svelte Vietnam</a> project - an information hub
          and inclusive community for people of Svelte in Vietnam. To learn more about what it is,
          read my blog post "<a
            href="https://sveltevietnam.dev/en/blog/20231012-svelte-vietnam-from-local-to-global"
            >Svelte Vietnam: from Local to Global</a
          >",
        </li>
        <li>
          <a href="https://svelte-put.vnphanquang.com">svelte-put</a>, a collection of utilities for
          working with Svelte,
        </li>
      </ul>
      <div class="flex justify-start not-prose mt-4">
        <p class="">
          and more to come. For more of my work, please check out
          <a href="https://github.com/vnphanquang" class="c-link">github.com/vnphanquang</a>
          or my CV on the right.
        </p>
        <div class="flex flex-col gap-1 items-center shrink-0">
          <a href="/vnphanquang_cv.pdf" class="c-link c-link--icon" external>
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="56" height="56"><path d="M30.13 51.31h20a1.75 1.75 0 0 0 1.75-1.75v-5.12a11.067 11.067 0 0 0-4.4-8.832 9.977 9.977 0 1 0-14.713 0 11.08 11.08 0 0 0-4.387 8.832v5.12a1.75 1.75 0 0 0 1.75 1.75zm10-28.894a6.477 6.477 0 1 1-6.477 6.477 6.485 6.485 0 0 1 6.473-6.476zM31.88 44.44a7.576 7.576 0 0 1 3.87-6.594 9.857 9.857 0 0 0 8.754 0 7.56 7.56 0 0 1 3.876 6.594v3.37h-16.5z"/><path d="M112.654 4.75H15.346A1.75 1.75 0 0 0 13.6 6.5v115a1.75 1.75 0 0 0 1.75 1.75h97.308a1.75 1.75 0 0 0 1.75-1.75V6.5a1.75 1.75 0 0 0-1.754-1.75zm-1.75 115H17.1V8.25h93.8z"/><path d="M26.346 65.75h75.308a1.75 1.75 0 1 0 0-3.5H26.346a1.75 1.75 0 0 0 0 3.5zM26.346 80.194h75.308a1.75 1.75 0 0 0 0-3.5H26.346a1.75 1.75 0 0 0 0 3.5zM26.346 109.083h75.308a1.75 1.75 0 0 0 0-3.5H26.346a1.75 1.75 0 0 0 0 3.5zM26.346 94.639h75.308a1.75 1.75 0 1 0 0-3.5H26.346a1.75 1.75 0 0 0 0 3.5zM64 22.417h37.654a1.75 1.75 0 0 0 0-3.5H64a1.75 1.75 0 0 0 0 3.5zM64 36.861h37.654a1.75 1.75 0 0 0 0-3.5H64a1.75 1.75 0 0 0 0 3.5zM64 51.306h37.654a1.75 1.75 0 0 0 0-3.5H64a1.75 1.75 0 0 0 0 3.5z"/></svg>
            <span class="sr-only">vnphanquang's Curriculum Vitae</span>
          </a>
          <p class="text-sm">My CV</p>
        </div>
      </div>
    </section>

    <section>
      <h2 id="never-asked-questions">Never Asked Questions</h2>
      <p class="italic">You might even find some answers...</p>
      <NeverAskedQuestions class="not-prose" />
    </section>

    <section class="grid-cols-2 md:grid pb-10">
      <div>
        <h2 id="message-from-quang">A Message From Quang</h2>
        <p class="italic">Tip: real people open suspicious red envelopes</p>
      </div>
      <Mail />
    </section>
  </main>

  <footer>
    <hr />
    <p class="text-[#6e7582] text-sm mt-4">
      <a
        class="c-link c-link--preserved"
        href="https://github.com/vnphanquang/vnphanquang/blob/main/LICENSE">MIT</a
      > 2023-Present © Quang Phan
    </p>
  </footer>
</div>

<style lang="postcss">
  /* from DaisyUI: https://daisyui.com/components/swap/ */
  .swap {
    cursor: pointer;
    user-select: none;;

    position: relative;

    display: grid;
    place-content: center;

    appearance: none;

    & > * {
      grid-column-start: 1;
      grid-row-start: 1;

      transition-timing-function: cubic-bezier(0,0,.2,1);
      transition-duration: .3s;
      transition-property: transform, opacity;
    }

    & input:not(:checked) ~ .swap-on {
      transform: rotate(45deg);
      opacity: 0;
    }

    & input:checked{
      & ~ .swap-off {
        transform: rotate(-45deg);
        opacity: 0;
      }

      & ~ .swap-on {
        transform: rotate(0);
        opacity: 1;
      }
    }
  }
</style>

