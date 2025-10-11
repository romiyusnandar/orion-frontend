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
      case 'DISCONTINUED':
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
      case 'DISCONTINUED':
        return 'Discontinued';
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
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/40 to-indigo-50/50 dark:from-gray-900/70 dark:via-black/80 dark:to-gray-800/70"></div>

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
      <div class="relative text-center p-8 bg-white/20 dark:bg-gray-800/20 rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl"
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
      <div class="absolute inset-0 bg-gradient-to-br from-red-50/50 via-orange-50/40 to-pink-50/50 dark:from-gray-900/70 dark:via-red-900/40 dark:to-gray-800/70"></div>

      <!-- Error Content -->
      <div class="relative text-center p-8 mx-4 max-w-md bg-white/20 dark:bg-gray-800/20 rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl"
           in:scale={{ duration: 600, easing: backOut }}>
        <!-- Error Icon -->
        <div class="inline-flex items-center justify-center w-20 h-20 bg-red-100/90 dark:bg-red-900/60 rounded-full mb-6 relative"
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
    <!-- Simplified Device Details -->
    <div class="relative" in:fade={{ duration: 800 }}>
      <!-- Simplified Hero Section -->
      <section class="relative py-16 md:py-24 overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0">
          <img
            src={device.image}
            alt={device.name}
            class="w-full h-full object-cover object-top"
          />
          <!-- Simple Overlay -->
          <div class="absolute inset-0 bg-black/60"></div>
        </div>

        <!-- Content Container -->
        <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div class="text-center text-white">
            <!-- Back Button -->
            <div class="flex justify-center sm:justify-start mb-8">
              <a
                href="/device"
                class="inline-flex items-center px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors duration-300"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <span class="font-medium">Back to Devices</span>
              </a>
            </div>

            <!-- Status Badge -->
            <div class="flex justify-center mb-6">
              <div class="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-full border border-white/30">
                <div class="w-3 h-3 {getStatusColor(device.status)} rounded-full"></div>
                <span class="text-sm font-medium">{getStatusText(device.status)}</span>
              </div>
            </div>

            <!-- Device Name -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {device.name}
            </h1>

            <!-- Codename -->
            <div class="flex items-center justify-center space-x-2 text-lg text-gray-300 mb-8">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              <span class="font-mono font-medium">{device.codename}</span>
            </div>

            <!-- Simple Stats -->
            <div class="flex justify-center items-center space-x-8">
              <div class="text-center">
                <div class="text-2xl font-bold text-white">{device.builds.length}</div>
                <div class="text-sm text-gray-300">Available Builds</div>
              </div>
              <div class="w-px h-8 bg-white/30"></div>
              <div class="text-center">
                <div class="text-2xl font-bold text-white">{formatDate(device.updatedAt)}</div>
                <div class="text-sm text-gray-300">Last Updated</div>
              </div>
            </div>
          </div>
        </div>
      </section>      <!-- Device Info Section -->
      <section class="py-8 md:py-16">
        <div class="max-w-7xl mx-auto px-4 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <!-- Maintainer & Flash Instructions Column -->
            <div class="lg:col-span-1 space-y-6">

              <!-- Maintainer Card -->
              <div class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <!-- Header -->
                <div class="flex items-center mb-6">
                  <div class="p-2 bg-blue-500/20 rounded-lg mr-3">
                    <svg class="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Maintainer</h3>
                </div>

                <!-- Maintainer Info -->
                <div class="flex flex-col items-center text-center">
                  <img
                    src={device.maintainer.profileImage}
                    alt={device.maintainer.name}
                    class="w-16 h-16 md:w-20 md:h-20 rounded-full border-3 border-white/50 dark:border-gray-700/50 shadow-lg mb-4"
                    loading="lazy"
                  />
                  <h4 class="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-3">{device.maintainer.name}</h4>

                  <!-- Social Links -->
                  {#if device.maintainer.socialLinks.length > 0}
                    <div class="flex flex-wrap gap-2 justify-center">
                      {#each device.maintainer.socialLinks as social}
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center px-3 py-2 bg-gray-100/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-100/80 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                        >
                          <div class="mr-2">
                            {@html getPlatformIcon(social.platform)}
                          </div>
                          <span class="capitalize font-medium">{social.platform}</span>
                        </a>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>

              <!-- Flash Instructions -->
              <div class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <!-- Header -->
                <div class="flex items-center mb-4">
                  <div class="p-2 bg-purple-500/20 rounded-lg mr-3">
                    <svg class="w-5 h-5 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Flash Instructions</h3>
                </div>

                <p class="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                  Learn how to install OrionOS on your {device.name}. Follow our step-by-step guide for a successful installation.
                </p>

                {#if device.flashInstruction}
                  <a
                    href={device.flashInstruction}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="relative z-10 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-colors duration-300 text-sm font-semibold shadow-lg w-full justify-center cursor-pointer"
                    role="button"
                    tabindex="0"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    <span>View Installation Guide</span>
                  </a>
                {:else}
                  <div class="inline-flex items-center px-6 py-3 bg-gray-400 text-white rounded-lg text-sm font-semibold shadow-lg w-full justify-center cursor-not-allowed opacity-60">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <span>Installation Guide Not Available</span>
                  </div>
                {/if}
              </div>
            </div>

            <!-- Builds Section -->
            <div class="lg:col-span-2">
              <div class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <!-- Header -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  <div class="flex items-center">
                    <div class="p-2 bg-green-500/20 rounded-lg mr-3">
                      <svg class="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Available Builds</h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400">({device.builds.length} build{device.builds.length !== 1 ? 's' : ''})</p>
                    </div>
                  </div>

                  <!-- Build Type Legend -->
                  <div class="flex items-center space-x-3">
                    {#each ['GAPPS', 'VANILLA'] as type}
                      <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full {getBuildTypeColor(type).split(' ')[0]}"></div>
                        <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{type}</span>
                      </div>
                    {/each}
                  </div>
                </div>

                {#if device.builds.length === 0}
                  <!-- Empty State -->
                  <div class="text-center py-12">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100/60 dark:bg-gray-800/60 rounded-full mb-4">
                      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">No builds available</h4>
                    <p class="text-gray-600 dark:text-gray-300">Check back later for new releases and updates.</p>
                  </div>
                {:else}
                  <div class="space-y-4">
                    {#each device.builds as build}
                      <div class="bg-gray-50/80 dark:bg-gray-800/80 rounded-lg p-4 border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-500/50 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                        <div class="flex flex-col gap-4">
                          <!-- Build Header -->
                          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <!-- Build Info -->
                            <div class="flex-1 min-w-0">
                              <div class="flex flex-wrap items-center gap-3 mb-3">
                                <span class="inline-flex items-center px-3 py-1 text-xs font-bold rounded-lg {getBuildTypeColor(build.type)}">
                                  <div class="w-2 h-2 bg-current rounded-full mr-2"></div>
                                  {build.type}
                                </span>
                                <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                  {formatDate(build.createdAt)}
                                </span>
                              </div>
                              <h4 class="font-bold text-gray-900 dark:text-white mb-2 text-base md:text-lg">{build.version}</h4>
                              <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"></path>
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8v12a2 2 0 002 2h10a2 2 0 002-2V8"></path>
                                </svg>
                                <span>{build.fileSize}</span>
                              </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex flex-col sm:flex-row gap-3">
                              <!-- Changelog Toggle Button -->
                              {#if build.changelogUrl}
                                <button
                                  onclick={() => toggleChangelog(build.id, build.changelogUrl)}
                                  class="flex items-center px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 bg-gray-100/60 dark:bg-gray-700/60 rounded-lg hover:bg-orange-50/80 dark:hover:bg-orange-900/30 transition-colors duration-300 justify-center"
                                  class:bg-orange-100={expandedChangelogs[build.id]}
                                  class:dark:bg-orange-900={expandedChangelogs[build.id]}
                                  class:text-orange-600={expandedChangelogs[build.id]}
                                  class:dark:text-orange-400={expandedChangelogs[build.id]}
                                >
                                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v11a2 2 0 01-2 2z"></path>
                                  </svg>
                                  <span class="hidden sm:inline">{expandedChangelogs[build.id] ? 'Hide' : 'View'} Changelog</span>
                                  <span class="sm:hidden">Changelog</span>
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
                                class="inline-flex items-center px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors duration-300 font-semibold text-sm justify-center"
                              >
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <span>Download</span>
                              </a>
                            </div>
                          </div>

                          <!-- Expanded Changelog -->
                          {#if expandedChangelogs[build.id]}
                            <div class="mt-4 border-t border-gray-200/60 dark:border-gray-700/60 pt-4">
                              <!-- Changelog Header -->
                              <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center">
                                  <div class="p-2 bg-orange-500/20 rounded-lg mr-3">
                                    <svg class="w-4 h-4 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v11a2 2 0 01-2 2z"></path>
                                    </svg>
                                  </div>
                                  <h5 class="text-base font-bold text-gray-900 dark:text-white">Changelog</h5>
                                </div>

                                <!-- Changelog Source Link -->
                                <a
                                  href={build.changelogUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="text-xs text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                                >
                                  View raw file
                                </a>
                              </div>

                              {#if changelogLoading[build.id]}
                                <!-- Loading State -->
                                <div class="flex items-center justify-center py-8">
                                  <div class="text-center">
                                    <div class="w-8 h-8 border-4 border-orange-200 dark:border-orange-800 border-t-orange-500 rounded-full animate-spin mb-2"></div>
                                    <p class="text-gray-600 dark:text-gray-400 text-sm">Loading changelog...</p>
                                  </div>
                                </div>
                              {:else if changelogContents[build.id]}
                                <!-- Changelog Content -->
                                <div class="bg-gray-100/70 dark:bg-gray-800/70 rounded-lg p-4 max-h-64 overflow-y-auto border border-gray-200/30 dark:border-gray-700/30">
                                  {#if changelogContents[build.id].startsWith('Failed to load')}
                                    <!-- Error State -->
                                    <div class="text-center py-6">
                                      <p class="text-red-600 dark:text-red-400 text-sm mb-3">{changelogContents[build.id]}</p>
                                      <button
                                        onclick={() => fetchChangelog(build.id, build.changelogUrl)}
                                        class="inline-flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50/80 dark:bg-red-900/20 rounded-lg transition-colors duration-200"
                                      >
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                        Try again
                                      </button>
                                    </div>
                                  {:else}
                                    <!-- Changelog Lines -->
                                    <div class="space-y-2">
                                      {#each formatChangelog(changelogContents[build.id]) as line}
                                        <div class="text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 p-2 rounded transition-colors duration-200">
                                          <span class="text-sm font-mono break-words">{line}</span>
                                        </div>
                                      {/each}
                                    </div>
                                  {/if}
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
