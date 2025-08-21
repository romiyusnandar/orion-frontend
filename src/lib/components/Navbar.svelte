<script lang="ts">
  import { onMount } from 'svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import logo from '$lib/assets/orion-lg.png'

  let isOpen = $state(false);
  let scrolled = $state(false);
  let navElement: HTMLElement;

  // Navigation items
  const navItems = [
    { href: '/developer', label: 'Developer', icon: 'developer' },
    { href: '/source', label: 'Source', icon: 'source' },
    { href: '/device', label: 'Download', icon: 'download' },
    { href: '/about', label: 'About', icon: 'about' }
  ];

  // SVG icon component
  function getIcon(iconName: string) {
    const icons = {
      developer: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
      </svg>`,
      source: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
      </svg>`,
      download: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>`,
      about: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`
    };
    return icons[iconName as keyof typeof icons] || '';
  }

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navElement && !navElement.contains(event.target as Node)) {
        isOpen = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isOpen = false;
    }
  }
</script>

<nav
  bind:this={navElement}
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out {scrolled ? 'backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-lg border-b border-gray-200/20 dark:border-gray-800/20' : ''}"
  aria-label="Main navigation"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a
          href="/"
          class="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="OrionOS Logo"
              class="w-full h-full object-contain"
            />
          </div>
          <span class="hidden sm:block">Orion<span class="text-cyan-600">OS</span>.</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-1">
          {#each navItems as item}
            <a
              href={item.href}
              class="group relative px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              onclick={closeMenu}
            >
              <span class="flex items-center space-x-2">
                <span class="flex-shrink-0">{@html getIcon(item.icon)}</span>
                <span>{item.label}</span>
              </span>
              <div class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
            </a>
          {/each}
        </div>
      </div>

      <!-- Theme Toggle and Mobile Menu Button -->
      <div class="flex items-center space-x-3">
        <ThemeToggle />

        <!-- Mobile menu button -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          onclick={toggleMenu}
          onkeydown={handleKeydown}
        >
          <span class="sr-only">Open main menu</span>
          <div class="relative w-6 h-6">
            <!-- Hamburger icon -->
            <span
              class="absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out"
              class:rotate-45={isOpen}
              class:translate-y-2={isOpen}
              class:translate-y-0={!isOpen}
            ></span>
            <span
              class="absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out translate-y-2"
              class:opacity-0={isOpen}
              class:opacity-100={!isOpen}
            ></span>
            <span
              class="absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out translate-y-4"
              class:-rotate-45={isOpen}
              class:-translate-y-2={isOpen}
              class:translate-y-0={!isOpen}
            ></span>
          </div>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div
    id="mobile-menu"
    class="md:hidden overflow-hidden transition-all duration-300 ease-out"
    class:max-h-96={isOpen}
    class:opacity-100={isOpen}
    class:max-h-0={!isOpen}
    class:opacity-0={!isOpen}
  >
    <div class="px-2 pt-2 pb-6 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-800/20">
      {#each navItems as item}
        <a
          href={item.href}
          class="group flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 transform hover:translate-x-1"
          onclick={closeMenu}
          role="menuitem"
        >
          <span class="flex-shrink-0">{@html getIcon(item.icon)}</span>
          <span>{item.label}</span>
          <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </a>
      {/each}
    </div>
  </div>
</nav>

<!-- Spacer to prevent content from hiding behind fixed navbar -->
<div class="h-16"></div>

<style>
  /* Custom backdrop blur fallback for older browsers */
  @supports not (backdrop-filter: blur(12px)) {
    nav {
      background: rgba(255, 255, 255, 0.95);
    }

    :global(.dark) nav {
      background: rgba(17, 24, 39, 0.95);
    }
  }

  /* Smooth scroll behavior */
  :global(html) {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar for mobile menu */
  #mobile-menu {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
  }

  #mobile-menu::-webkit-scrollbar {
    width: 4px;
  }

  #mobile-menu::-webkit-scrollbar-track {
    background: transparent;
  }

  #mobile-menu::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 2px;
  }
</style>
