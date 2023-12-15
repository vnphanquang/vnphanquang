<script lang="ts">
  import { cubicOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';

  import NEVER_ASKED_QUESTIONS from '../neverAskedQuestions.json';

  let cls = '';
  export { cls as class };

  const naq = NEVER_ASKED_QUESTIONS.map((n) => ({ ...n, checked: false }));
  let naqOnlyExpandOne: boolean;
  let expandedId: number | undefined;
  let expansionHistory: number[] = []; // saving index of naq

  function onChangeExpansionRule(event: Event) {
    const tEvent = event.target as HTMLInputElement;
    if (naqOnlyExpandOne === false && tEvent.checked) {
      let lastOpenedIndex = 0;
      for (const index of expansionHistory.reverse()) {
        if (naq[index].checked) {
          lastOpenedIndex = index;
          break;
        }
      }
      expandedId = naq[lastOpenedIndex].id;
    } else if (naqOnlyExpandOne && tEvent.checked=== false) {
      for (const n of naq) {
        n.checked = expandedId === n.id;
      }
    }
  }

  function onExpansionsChanged(index: number) {
    if (expansionHistory[expansionHistory.length - 1] !== index) {
      expansionHistory.push(index);
    }
    if (expansionHistory.length > 10) {
      expansionHistory.shift();
    }
  }
</script>

<div class={cls}>
  <div class="mt-4 mb-2 flex items-center justify-end">
    <label for="naq-expansion-toggle" class="mr-4 cursor-pointer text-sm">
      View one at a time
    </label>
    <input
      id="naq-expansion-toggle"
      type="checkbox"
      class="toggle"
      onchange={onChangeExpansionRule}
      bind:checked={naqOnlyExpandOne}
    />
  </div>

  <div class="grid grid-cols-1 gap-y-2">
    {#each naq as { id, question, answer, checked }, index (id)}
      {@const shouldExpand = naqOnlyExpandOne ? expandedId === id : checked}
      {@const htmlId = `naq-expansion-${id}`}
      {@const name = 'naq-expansion'}
      <article class="hover:text-link">
        <label
          for={htmlId}
          class="block py-4 hover:cursor-pointer"
          class:border-b={index < naq.length - 1}
        >
          {#if naqOnlyExpandOne}
            <input
              type="radio"
              id={htmlId}
              {name}
              onchange={() => onExpansionsChanged(index)}
              bind:group={expandedId}
              value={id}
              hidden
            />
          {:else}
            <input
              type="checkbox"
              id={htmlId}
              {name}
              onchange={() => onExpansionsChanged(index)}
              bind:checked
              value={id}
              hidden
            />
          {/if}
          <div class="flex items-center justify-between">
            <h3 class="justify-self-start pr-4 sm:pr-10 text-sm" id="naq-{id}">
              {question}
            </h3>
            <div>
              <svg
                class="{shouldExpand ? '-rotate-90' : 'rotate-90'} transition-transform fill-current"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                ><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg
              >
            </div>
          </div>
          {#if shouldExpand}
            <div
              class="prose mx-6 mt-4 max-w-none border-l px-4 py-2"
              transition:slide={{ duration: 250, easing: cubicOut }}
            >
              {#each answer as paragraph}
                <p class="text-sm">{paragraph}</p>
              {/each}
            </div>
          {/if}
        </label>
      </article>
    {/each}
  </div>
</div>

<style lang="postcss">
  /* from DaisyUI: https://daisyui.com/components/toggle/ */
  .toggle {
    --handle-sign: -1;
    --handle-offset: calc(1rem * var(--handle-sign));
    --toggle-bg: theme('colors.bg.DEFAULT');
    --toggle-fg: theme('colors.fg.DEFAULT');
    --toggle-opacity: 0.5;

    cursor: pointer;

    flex-shrink: 0;

    width: 2rem;
    height: 1rem;

    appearance: none;
    opacity: var(--toggle-opacity);
    background-color: var(--toggle-fg);
    border-color: var(--toggle-fg);
    border-width: 1px;
    border-radius: 1.9rem;
    box-shadow:
      var(--handle-offset) 0 0 2px var(--toggle-bg) inset,
      0 0 0 2px var(--toggle-bg) inset,
      0 0;

    transition:
      opacity,
      background,
      box-shadow 200ms ease-out;

    &:checked {
      --handle-sign: 1;
      --toggle-opacity: 1;
    }
  }
</style>
