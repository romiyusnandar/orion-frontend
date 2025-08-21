<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { fly, fade, scale, blur } from 'svelte/transition';
  import { cubicOut, backOut, elasticOut } from 'svelte/easing';
  import { formatDate } from '$lib/components/utils/formatters';

  let mounted = $state(false);
  let device = $state<Device | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let expandedChangelogs = $state<{[key: string]: boolean}>({});
  let changelogContents = $state<{[key: string]: string}>({});
  let changelogLoading = $state<{[key: string]: boolean}>({});
  let hoveredBuild = $state<string | null>(null);
  let isScrolled = $state(false);

  // Mobile performance optimization states
  let isMobile = $state(false);
  let reduceAnimations = $state(false);

  interface SocialLink {
    url: string;
    platform: string;
  }

  interface Maintainer {
    id: string;
    name: string;
    profileImage: string;
    role: string;
    socialLinks: SocialLink[];
  }

  interface Build {
    id: string;
    type: string;
    downloadUrl: string;
    version: string;
    fileSize: string;
    changelogUrl: string;
    createdAt: string;
  }

  interface Device {
    id: string;
    name: string;
    codename: string;
    image: string;
    status: string;
    flashInstruction: string;
    createdAt: string;
    updatedAt: string;
    maintainerId: string;
    maintainer: Maintainer;
    builds: Build[];
  }

  async function fetchDevice(codename: string) {
    try {
      loading = true;

      const response = await fetch(`https://orionos-api.onrender.com/api/v1/devices/codename/${codename}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        device = result.data;
      } else {
        throw new Error('Device not found');
      }

      error = null;
    } catch (err) {
      error = `Failed to load device: ${err instanceof Error ? err.message : 'Unknown error'}`;
      device = null;
    } finally {
      loading = false;
    }
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500';
      case 'INACTIVE':
        return 'bg-red-500';
      case 'BETA':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'Active';
      case 'INACTIVE':
        return 'Inactive';
      case 'BETA':
        return 'Beta';
      default:
        return status;
    }
  }

  function getBuildTypeColor(type: string): string {
    switch (type) {
      case 'GAPPS':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'VANILLA':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  }

  function getPlatformIcon(platform: string): string {
    switch (platform.toLowerCase()) {
      case 'github':
        return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
      case 'telegram':
        return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`;
      case 'twitter':
        return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`;
      case 'instagram':
        return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
      default:
        return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>`;
    }
  }

  async function fetchChangelog(buildId: string, changelogUrl: string) {
    if (changelogContents[buildId]) {
      return; // Already fetched
    }

    try {
      changelogLoading[buildId] = true;

      const response = await fetch(changelogUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch changelog: ${response.status}`);
      }

      const content = await response.text();
      changelogContents[buildId] = content;
    } catch (err) {
      changelogContents[buildId] = `Failed to load changelog: ${err instanceof Error ? err.message : 'Unknown error'}`;
    } finally {
      changelogLoading[buildId] = false;
    }
  }

  function toggleChangelog(buildId: string, changelogUrl: string) {
    expandedChangelogs[buildId] = !expandedChangelogs[buildId];

    if (expandedChangelogs[buildId] && !changelogContents[buildId]) {
      fetchChangelog(buildId, changelogUrl);
    }
  }

  function formatChangelog(content: string): string[] {
    if (!content) return [];

    // Split by lines and filter out empty lines
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }

  onMount(() => {
    // Detect mobile device and set performance preferences
    isMobile = window.innerWidth < 768;
    reduceAnimations = window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobile;

    // Performance logging for mobile
    if (isMobile) {
      console.log('Mobile device detected - enabling performance optimizations');
    }

    mounted = true;
    const codename = $page.params.codename;
    if (codename) {
      fetchDevice(codename);
    }

    // Optimized scroll handler with RAF throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          isScrolled = window.scrollY > 100;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttled resize handler
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth < 768;

        // Update animation preferences if mobile state changed
        if (wasMobile !== isMobile) {
          reduceAnimations = window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobile;
          console.log(`Device state changed: ${isMobile ? 'mobile' : 'desktop'} mode`);
        }
      }, 150);
    };

    // Listen for animation preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reduceAnimations = e.matches || isMobile;
    };

    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    motionQuery.addEventListener('change', handleMotionChange);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  });
</script>

<svelte:head>
  <title>{device ? `${device.name} (${device.codename})` : 'Device'} - OrionOS</title>
  <meta name="description" content={device ? `Download OrionOS for ${device.name}. Official builds maintained by ${device.maintainer.name}.` : 'Device details and downloads for OrionOS.'} />
</svelte:head>

<div class="min-h-screen pt-16">
  {#if loading}
    <!-- Enhanced Loading State with Glass UI -->
    <div class="flex items-center justify-center min-h-[100vh] relative overflow-hidden">
      <!-- Background Glass Effect -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 dark:from-gray-900/50 dark:via-black/60 dark:to-gray-800/50"></div>
      <div class="absolute inset-0 backdrop-blur-3xl"></div>

      <!-- Floating Particles - Reduced for mobile -->
      <div class="absolute inset-0 overflow-hidden">
        {#each Array(isMobile ? 3 : 6) as _, i}
          <div
            class="absolute w-3 h-3 md:w-4 md:h-4 bg-blue-500/15 dark:bg-blue-400/15 rounded-full"
            class:animate-pulse={!reduceAnimations}
            style="
              left: {Math.random() * 100}%;
              top: {Math.random() * 100}%;
              animation-delay: {i * 0.8}s;
              animation-duration: {reduceAnimations ? '4s' : 2 + Math.random() * 2 + 's'};
            "
          ></div>
        {/each}
      </div>

      <!-- Loading Content -->
      <div class="relative text-center p-8 bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl"
           in:scale={{ duration: 800, easing: backOut }}>
        <div class="relative inline-flex items-center justify-center w-20 h-20 mb-6">
          <!-- Spinning Ring -->
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-full animate-spin opacity-80"
               style="animation-duration: 3s;"></div>
          <div class="absolute inset-2 bg-white/90 dark:bg-gray-900/90 rounded-full"></div>

          <!-- Inner Pulse -->
          <div class="relative w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>

          <!-- Device Icon -->
          <svg class="absolute w-6 h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v12H7V4z"/>
          </svg>
        </div>

        <!-- Loading Text -->
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Loading Device</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm animate-pulse">Fetching device details...</p>

        <!-- Progress Dots -->
        <div class="flex justify-center space-x-2 mt-4">
          {#each Array(3) as _, i}
            <div
              class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style="animation-delay: {i * 0.2}s;"
            ></div>
          {/each}
        </div>
      </div>
    </div>
  {:else if error}
    <!-- Enhanced Error State with Glass UI -->
    <div class="flex items-center justify-center min-h-[100vh] relative overflow-hidden" in:fade={{ duration: 500 }}>
      <!-- Background Glass Effect -->
      <div class="absolute inset-0 bg-gradient-to-br from-red-50/30 via-orange-50/20 to-pink-50/30 dark:from-gray-900/50 dark:via-red-900/20 dark:to-gray-800/50"></div>
      <div class="absolute inset-0 backdrop-blur-3xl"></div>

      <!-- Error Content -->
      <div class="relative text-center p-8 mx-4 max-w-md bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl"
           in:scale={{ duration: 600, easing: backOut }}>
        <!-- Error Icon -->
        <div class="inline-flex items-center justify-center w-20 h-20 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-full mb-6 relative"
             in:scale={{ duration: 800, delay: 200, easing: elasticOut }}>
          <div class="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
          <svg class="w-10 h-10 text-red-600 dark:text-red-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>

        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Device Not Found</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{error}</p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onclick={() => {
              const codename = $page.params.codename;
              if (codename) {
                fetchDevice(codename);
              }
            }}
            class="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold overflow-hidden"
          >
            <!-- Button Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>

            <svg class="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span class="relative z-10">Try Again</span>
          </button>

          <a
            href="/device"
            class="group inline-flex items-center px-6 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-2 border-gray-300/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-300 rounded-xl hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 font-semibold"
          >
            <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Devices
          </a>
        </div>
      </div>
    </div>
  {:else if device}
    <!-- Enhanced Device Details with Glass UI -->
    <div class="relative" in:fade={{ duration: 800 }}>
      <!-- Enhanced Hero Section -->
      <section class="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
        <!-- Background Image with Parallax Effect -->
        <div class="absolute inset-0">
          <img
            src={device.image}
            alt={device.name}
            class="w-full h-full object-cover transform scale-110 transition-transform duration-1000"
            class:scale-105={isScrolled}
          />
          <!-- Enhanced Overlay Gradients -->
          <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/90"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/60"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/30"></div>
        </div>

        <!-- Floating Glass Elements - Reduced for mobile -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          {#each Array(isMobile ? 4 : 8) as _, i}
            <div
              class="absolute w-2 h-2 bg-white/20 rounded-full"
              class:animate-pulse={!reduceAnimations}
              style="
                left: {10 + (i * 15)}%;
                top: {20 + Math.sin(i) * 30}%;
                animation-delay: {i * 0.5}s;
                animation-duration: {reduceAnimations ? '5s' : 3 + Math.random() * 2 + 's'};
              "
            ></div>
          {/each}
        </div>

        <!-- Content Container -->
        <div class="relative w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 z-10">
          <div
            class="text-center text-white transform transition-all duration-1000 ease-out"
            class:translate-y-0={mounted}
            class:opacity-100={mounted}
            class:translate-y-8={!mounted}
            class:opacity-0={!mounted}
          >
            <!-- Back Button with Glass Effect -->
            <div class="flex justify-center sm:justify-start mb-6 md:mb-8">
              <a
                href="/device"
                class="group inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                class:transform-none={reduceAnimations}
                class:hover:scale-105={!reduceAnimations}
                in:fly={{ x: reduceAnimations ? 0 : -50, duration: reduceAnimations ? 300 : 600, delay: reduceAnimations ? 0 : 200 }}
              >
                <svg class="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <span class="font-semibold text-sm md:text-base">Back to Devices</span>
              </a>
            </div>

            <!-- Status Badge with Enhanced Animation -->
            <div class="flex justify-center mb-6 md:mb-8" in:scale={{ duration: 600, delay: 400, easing: backOut }}>
              <div class="group flex items-center space-x-3 px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg">
                <div class="relative">
                  <div class="w-3 h-3 md:w-4 md:h-4 {getStatusColor(device.status)} rounded-full animate-pulse"></div>
                  <div class="absolute inset-0 {getStatusColor(device.status)} rounded-full animate-ping opacity-75"></div>
                </div>
                <span class="text-sm md:text-base font-semibold">{getStatusText(device.status)}</span>
                <div class="w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <!-- Device Name with Responsive Typography -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight"
                in:fly={{ y: 50, duration: 800, delay: 600, easing: cubicOut }}>
              <span class="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {device.name}
              </span>
            </h1>

            <!-- Codename with Glass Background -->
            <div class="flex items-center justify-center space-x-2 text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12"
                 in:fly={{ y: 30, duration: 600, delay: 800 }}>
              <div class="p-2 md:p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <span class="font-mono font-semibold">{device.codename}</span>
            </div>

            <!-- Enhanced Stats with Glass Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto"
                 in:fly={{ y: 40, duration: 800, delay: 1000 }}>
              {#each [
                { label: 'Available Builds', value: device.builds.length, icon: 'M12 10v6m0 0l-3-3m3 3l3-3' },
                { label: 'Maintainer Role', value: device.maintainer.role.replace('_', ' '), icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { label: 'Last Updated', value: formatDate(device.updatedAt), icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
              ] as stat, i}
                <div class="group text-center p-4 md:p-6 bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                     in:scale={{ duration: 500, delay: 1200 + (i * 150), easing: backOut }}>
                  <!-- Icon -->
                  <div class="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full mb-3 md:mb-4 group-hover:bg-white/20 transition-colors duration-300">
                    <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={stat.icon}></path>
                    </svg>
                  </div>
                  <!-- Value -->
                  <div class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <!-- Label -->
                  <div class="text-xs md:text-sm text-gray-300 font-medium">{stat.label}</div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
             in:fade={{ duration: 600, delay: 1800 }}>
          <div class="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      <!-- Enhanced Device Info Section -->
      <section class="py-12 md:py-20 relative">
        <!-- Background with Glass Effect -->
        <div class="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-blue-50/40 to-purple-50/80 dark:from-gray-900/90 dark:via-black/80 dark:to-gray-800/90"></div>
        <div class="absolute inset-0 backdrop-blur-sm"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

            <!-- Maintainer & Flash Instructions Column -->
            <div class="lg:col-span-1 space-y-6 md:space-y-8">

              <!-- Enhanced Maintainer Card -->
              <div class="group bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform"
                   in:fly={{ x: -50, duration: 800, delay: 400 }}>

                <!-- Header with Icon -->
                <div class="flex items-center mb-6 md:mb-8">
                  <div class="p-3 bg-blue-500/20 backdrop-blur-sm rounded-xl mr-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <svg class="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Maintainer</h3>
                </div>

                <!-- Maintainer Info -->
                <div class="flex flex-col items-center text-center">
                  <div class="relative group/avatar mb-4 md:mb-6">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover/avatar:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={device.maintainer.profileImage}
                      alt={device.maintainer.name}
                      class="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white/50 dark:border-gray-700/50 shadow-lg transform transition-transform duration-300 group-hover/avatar:scale-110"
                      loading="lazy"
                    />
                    <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                  </div>

                  <h4 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">{device.maintainer.name}</h4>
                  <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 px-2 py-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    {device.maintainer.role.replace('_', ' ')}
                  </p>

                  <!-- Enhanced Social Links -->
                  {#if device.maintainer.socialLinks.length > 0}
                    <div class="flex flex-wrap gap-3 justify-center">
                      {#each device.maintainer.socialLinks as social, i}
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="group/social inline-flex items-center px-3 py-2 md:px-4 md:py-2 bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl hover:bg-blue-100/80 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                          in:scale={{ duration: 400, delay: 600 + (i * 100), easing: backOut }}
                        >
                          <div class="mr-2 group-hover/social:rotate-12 transition-transform duration-300">
                            {@html getPlatformIcon(social.platform)}
                          </div>
                          <span class="capitalize font-medium">{social.platform}</span>
                        </a>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>

              <!-- Enhanced Flash Instructions -->
              <div class="group bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform"
                   in:fly={{ x: -50, duration: 800, delay: 600 }}>

                <!-- Header -->
                <div class="flex items-center mb-4 md:mb-6">
                  <div class="p-3 bg-purple-500/20 backdrop-blur-sm rounded-xl mr-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                    <svg class="w-6 h-6 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Flash Instructions</h3>
                </div>

                <p class="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
                  Learn how to install OrionOS on your {device.name}. Follow our comprehensive step-by-step guide for a successful installation.
                </p>

                <a
                  href={device.flashInstruction}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group/button inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl md:rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 text-sm md:text-base font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 w-full sm:w-auto justify-center relative overflow-hidden"
                >
                  <!-- Button Glow -->
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover/button:opacity-30 transition-opacity duration-300 blur-xl"></div>

                  <svg class="w-5 h-5 mr-3 group-hover/button:rotate-12 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  <span class="relative z-10">View Installation Guide</span>
                </a>
              </div>
            </div>

            <!-- Enhanced Builds Section -->
            <div class="lg:col-span-2">
              <div class="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500"
                   in:fly={{ x: 50, duration: 800, delay: 400 }}>

                <!-- Header -->
                <div class="flex items-center justify-between mb-6 md:mb-8">
                  <div class="flex items-center">
                    <div class="p-3 bg-green-500/20 backdrop-blur-sm rounded-xl mr-4">
                      <svg class="w-6 h-6 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Available Builds</h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400">({device.builds.length} build{device.builds.length !== 1 ? 's' : ''})</p>
                    </div>
                  </div>

                  <!-- Build Type Legend (Hidden on mobile) -->
                  <div class="hidden md:flex items-center space-x-3">
                    {#each ['GAPPS', 'VANILLA'] as type}
                      <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full {getBuildTypeColor(type).split(' ')[0]}"></div>
                        <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{type}</span>
                      </div>
                    {/each}
                  </div>
                </div>

                {#if device.builds.length === 0}
                  <!-- Enhanced Empty State -->
                  <div class="text-center py-16 md:py-20">
                    <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full mb-6"
                         in:scale={{ duration: 600, easing: elasticOut }}>
                      <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <h4 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">No builds available</h4>
                    <p class="text-gray-600 dark:text-gray-300 max-w-md mx-auto">Check back later for new releases and updates.</p>
                  </div>
                {:else}
                  <div class="space-y-4 md:space-y-6">
                    {#each device.builds as build, index (build.id)}
                      <div
                        class="group bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/40 hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                        class:transform-none={reduceAnimations}
                        class:hover:scale-[1.01]={!reduceAnimations}
                        role="article"
                        onmouseenter={() => !isMobile && (hoveredBuild = build.id)}
                        onmouseleave={() => !isMobile && (hoveredBuild = null)}
                        in:fly={{ y: reduceAnimations ? 0 : 30, duration: reduceAnimations ? 200 : 500, delay: reduceAnimations ? 0 : 200 + (index * 100), easing: cubicOut }}
                      >
                        <div class="flex flex-col gap-4">
                          <!-- Build Header -->
                          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <!-- Build Info -->
                            <div class="flex-1 min-w-0">
                              <div class="flex flex-wrap items-center gap-3 mb-3">
                                <span class="inline-flex items-center px-3 py-1 text-xs md:text-sm font-bold rounded-lg {getBuildTypeColor(build.type)} shadow-sm">
                                  <div class="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
                                  {build.type}
                                </span>
                                <span class="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                                  {formatDate(build.createdAt)}
                                </span>
                              </div>
                              <h4 class="font-bold text-gray-900 dark:text-white mb-2 text-lg md:text-xl truncate">{build.version}</h4>
                              <div class="flex items-center space-x-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"></path>
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8v12a2 2 0 002 2h10a2 2 0 002-2V8"></path>
                                </svg>
                                <span>{build.fileSize}</span>
                              </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex flex-wrap gap-3 lg:flex-nowrap">
                              <!-- Changelog Toggle Button -->
                              {#if build.changelogUrl}
                                <button
                                  onclick={() => toggleChangelog(build.id, build.changelogUrl)}
                                  class="group/changelog flex items-center px-4 py-2 md:px-5 md:py-3 text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 bg-gray-100/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl hover:bg-orange-50/80 dark:hover:bg-orange-900/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 lg:flex-none justify-center"
                                  class:bg-orange-100={expandedChangelogs[build.id]}
                                  class:dark:bg-orange-900={expandedChangelogs[build.id]}
                                  class:text-orange-600={expandedChangelogs[build.id]}
                                  class:dark:text-orange-400={expandedChangelogs[build.id]}
                                >
                                  <svg class="w-5 h-5 mr-2 group-hover/changelog:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v11a2 2 0 01-2 2z"></path>
                                  </svg>
                                  <span class="hidden sm:inline">{expandedChangelogs[build.id] ? 'Hide' : 'View'} Changelog</span>
                                  <span class="sm:hidden">{expandedChangelogs[build.id] ? 'Hide' : 'Changes'}</span>
                                  <svg
                                    class="w-4 h-4 ml-2 transform transition-transform duration-300"
                                    class:rotate-180={expandedChangelogs[build.id]}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                  </svg>
                                </button>
                              {/if}

                              <!-- Download Button -->
                              <a
                                href={build.downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="group/download relative inline-flex items-center px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-2xl font-bold text-sm md:text-base flex-1 lg:flex-none justify-center overflow-hidden"
                                class:transform-none={reduceAnimations}
                                class:hover:scale-105={!reduceAnimations}
                                class:animate-pulse={hoveredBuild === build.id && !reduceAnimations}
                              >
                                <!-- Button Glow - Hidden on mobile for performance -->
                                <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover/download:opacity-30 transition-opacity duration-300 blur-xl"
                                     class:hidden={reduceAnimations}></div>

                                <svg class="w-5 h-5 mr-2 relative z-10"
                                     class:animate-bounce={!reduceAnimations && hoveredBuild === build.id}
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <span class="relative z-10">Download</span>
                              </a>
                            </div>
                          </div>

                          <!-- Enhanced Expanded Changelog -->
                          {#if expandedChangelogs[build.id]}
                            <div
                              class="mt-6 border-t border-gray-200/60 dark:border-gray-700/60 pt-6"
                              in:fly={{ y: 20, duration: 500, easing: cubicOut }}
                            >
                              <!-- Changelog Header -->
                              <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center">
                                  <div class="p-2 bg-orange-500/20 backdrop-blur-sm rounded-lg mr-3">
                                    <svg class="w-5 h-5 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v11a2 2 0 01-2 2z"></path>
                                    </svg>
                                  </div>
                                  <h5 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Changelog</h5>
                                </div>

                                <!-- Changelog Source Link (Mobile Hidden) -->
                                <a
                                  href={build.changelogUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="hidden sm:inline-flex items-center text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-lg"
                                >
                                  <svg class="w-3 h-3 md:w-4 md:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                  </svg>
                                  View raw file
                                </a>
                              </div>

                              {#if changelogLoading[build.id]}
                                <!-- Enhanced Loading State -->
                                <div class="flex items-center justify-center py-12 md:py-16">
                                  <div class="text-center">
                                    <div class="relative inline-flex items-center justify-center mb-4">
                                      <div class="w-10 h-10 md:w-12 md:h-12 border-4 border-orange-200 dark:border-orange-800 border-t-orange-500 rounded-full animate-spin"></div>
                                      <div class="absolute inset-2 md:inset-3 bg-orange-500/20 rounded-full animate-pulse"></div>
                                    </div>
                                    <p class="text-gray-600 dark:text-gray-400 font-medium">Loading changelog...</p>
                                  </div>
                                </div>
                              {:else if changelogContents[build.id]}
                                <!-- Enhanced Changelog Content -->
                                <div class="bg-gray-100/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 max-h-80 md:max-h-96 overflow-y-auto border border-gray-200/30 dark:border-gray-700/30 shadow-inner">
                                  {#if changelogContents[build.id].startsWith('Failed to load')}
                                    <!-- Enhanced Error State -->
                                    <div class="text-center py-8 md:py-12">
                                      <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-full mb-4"
                                           in:scale={{ duration: 400, easing: backOut }}>
                                        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                        </svg>
                                      </div>
                                      <p class="text-red-600 dark:text-red-400 text-sm md:text-base font-medium mb-4">{changelogContents[build.id]}</p>
                                      <button
                                        onclick={() => fetchChangelog(build.id, build.changelogUrl)}
                                        class="inline-flex items-center px-4 py-2 text-sm md:text-base text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm rounded-lg hover:bg-red-100/80 dark:hover:bg-red-900/40 transition-all duration-200 font-medium"
                                      >
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                        Try again
                                      </button>
                                    </div>
                                  {:else}
                                    <!-- Enhanced Changelog Lines -->
                                    <div class="space-y-2 md:space-y-3">
                                      {#each formatChangelog(changelogContents[build.id]) as line, i}
                                        <div
                                          class="group flex items-start space-x-3 md:space-x-4 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 p-2 md:p-3 rounded-lg transition-all duration-200"
                                          in:fly={{ y: 10, duration: 300, delay: i * 30 }}
                                        >
                                          <div class="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                                          <span class="text-sm md:text-base leading-relaxed font-mono break-words">{line}</span>
                                        </div>
                                      {/each}
                                    </div>
                                  {/if}
                                </div>

                                <!-- Mobile Changelog Source Link -->
                                <div class="mt-4 flex justify-center sm:hidden">
                                  <a
                                    href={build.changelogUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg"
                                  >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                    View raw file
                                  </a>
                                </div>
                              {/if}
                            </div>
                          {/if}
                        </div>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  {/if}
</div>
