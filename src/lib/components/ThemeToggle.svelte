<script lang="ts">
  import { theme, setTheme, type Theme } from './utils/theme';

  type Item = { value: Theme; label: string; icon: string };
  const items: Item[] = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '🖥️' }
  ];

  let current = $state<Theme>('system');
  let open = $state(false);
  let buttonEl: HTMLButtonElement | undefined;

  // Sync from store
  $effect(() => {
    const unsub = theme.subscribe((t) => (current = t));
    return () => unsub();
  });

  function choose(next: Theme) {
    setTheme(next);
    open = false;
    queueMicrotask(() => buttonEl?.focus());
  }

  $effect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!buttonEl) return (open = false);
      const container = buttonEl.closest('[data-menu-root]');
      if (container && !container.contains(t)) open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        open = false;
        buttonEl?.focus();
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  });

  function toggleMenu() {
    open = !open;
  }

  function onButtonKey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open = true;
      queueMicrotask(() => {
        const first = buttonEl?.nextElementSibling?.querySelector<HTMLButtonElement>('[data-item]');
        first?.focus();
      });
    }
  }
</script>

<div class="relative inline-block text-left" data-menu-root>
  <button
    bind:this={buttonEl}
    type="button"
    class="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-2.5 py-1.5 text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
    aria-haspopup="menu"
    aria-expanded={open}
    onclick={toggleMenu}
    onkeydown={onButtonKey}
  >
    <span class="min-w-4 text-center">{items.find(i => i.value === current)?.icon}</span>
    <span class="hidden sm:inline">{items.find(i => i.value === current)?.label}</span>
    <svg class="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.085l3.71-3.856a.75.75 0 1 1 1.08 1.04l-4.24 4.41a.75.75 0 0 1-1.08 0l-4.24-4.41a.75.75 0 0 1 .02-1.06Z"/></svg>
    <span class="sr-only">Change theme</span>
  </button>

  <div
    role="menu"
    aria-label="Theme"
    class="absolute right-0 z-50 mt-2 w-44 origin-top-right rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-lg ring-1 ring-black/5 dark:ring-white/5 transition duration-150 ease-out"
    class:opacity-100={open}
    class:scale-100={open}
    class:pointer-events-auto={open}
    class:opacity-0={!open}
    class:scale-95={!open}
    class:pointer-events-none={!open}
    style="transform-origin: top right"
  >
    {#each items as item}
      <button
        data-item
        role="menuitemradio"
        aria-checked={current === item.value}
        class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        onclick={() => choose(item.value)}
      >
        <span class="w-4 text-center">{item.icon}</span>
        <span class="flex-1 text-left">{item.label}</span>
        {#if current === item.value}
          <svg class="h-4 w-4 text-cyan-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.3a1 1 0 0 1-1.425 0l-3.2-3.2a1 1 0 0 1 1.414-1.415l2.487 2.488 6.488-6.574a1 1 0 0 1 1.43-.003Z"/></svg>
        {/if}
      </button>
    {/each}
  </div>
</div>
