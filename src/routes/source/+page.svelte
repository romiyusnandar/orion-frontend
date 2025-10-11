<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { formatDate } from '$lib/components/utils/formatters';

  let mounted = $state(false);
  let sources = $state<SourceRelease[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let expandedChangelogs = $state<{[key: string]: boolean}>({});
  let expandedScreenshots = $state<{[key: string]: boolean}>({});

  interface SourceRelease {
    id: string;
    version: string;
    codenameVersion: string;
    banner: string;
    releaseDate: string;
    description: string;
    changelog: string[];
    screenshots: string[];
    createdAt: string;
    updatedAt: string;
  }

  async function fetchSources() {
    try {
      loading = true;

      const response = await fetch('https://orionos-api.onrender.com/api/v1/sources', {
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

      if (result.success && Array.isArray(result.data)) {
        sources = result.data.sort((a: SourceRelease, b: SourceRelease) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );

        // Initialize screenshot states
        sources.forEach(source => {
          expandedScreenshots[source.id] = false;
          expandedChangelogs[source.id] = false;
        });
      } else {
        throw new Error('Invalid API response structure');
      }

      error = null;
    } catch (err) {
      error = `Failed to load source releases: ${err instanceof Error ? err.message : 'Unknown error'}`;
      sources = [];
    } finally {
      loading = false;
    }
  }

  function toggleScreenshots(sourceId: string) {
    expandedScreenshots[sourceId] = !expandedScreenshots[sourceId];
  }

  function toggleChangelog(sourceId: string) {
    expandedChangelogs[sourceId] = !expandedChangelogs[sourceId];
  }

  onMount(() => {
    mounted = true;
    fetchSources();
  });
</script>

<svelte:head>
  <title>Source Releases - OrionOS</title>
  <meta name="description" content="Download the latest OrionOS source releases, view changelogs, and explore new features." />
</svelte:head>

<div class="min-h-screen pt-16">
  <!-- Hero Section -->
  <section class="py-8 md:py-12">
    <div class="max-w-3xl mx-auto px-4 text-center">
      <!-- Title -->
      <h1 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Source <span class="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Releases</span>
      </h1>

      <!-- Description -->
      <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
        Download the latest OrionOS source releases and explore new features
      </p>

      <!-- Stats -->
      <div class="flex justify-center items-center space-x-6">
        <div class="inline-flex items-center px-3 py-1.5 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full">
          <span class="text-lg md:text-xl font-bold text-cyan-600 dark:text-cyan-400">{sources.length}</span>
          <span class="ml-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">Releases</span>
        </div>
        <div class="inline-flex items-center px-3 py-1.5 bg-purple-500/10 dark:bg-purple-500/20 rounded-full">
          <span class="text-lg md:text-xl font-bold text-purple-600 dark:text-purple-400">
            {sources.length > 0 ? sources[0].version : '---'}
          </span>
          <span class="ml-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">Latest</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Source Releases Section -->
  <section class="py-8 md:py-12 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
    <div class="max-w-6xl mx-auto px-3 md:px-4">
      {#if loading}
        <!-- Enhanced Loading State -->
        <div class="text-center py-12 md:py-20">
          <div class="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-ping opacity-40"></div>
            <div class="absolute inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-pulse opacity-60"></div>
            <div class="relative w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-spin shadow-lg">
              <div class="absolute top-1 right-1 w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200">Loading releases...</p>
            <p class="text-sm md:text-base text-gray-500 dark:text-gray-400">Fetching the latest OrionOS releases</p>
          </div>
        </div>
      {:else if error}
        <!-- Enhanced Error State -->
        <div class="text-center py-12 md:py-20" in:fade={{ duration: 300 }}>
          <div class="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
            <div class="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded-full animate-pulse"></div>
            <div class="relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-xl">
              <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
          <div class="space-y-3 md:space-y-4">
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Oops! Something went wrong</h3>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto">{error}</p>
            <button
              onclick={fetchSources}
              class="group inline-flex items-center px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg md:rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm md:text-base"
            >
              <svg class="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Try Again
            </button>
          </div>
        </div>
      {:else if sources.length === 0}
        <!-- Enhanced Empty State -->
        <div class="text-center py-12 md:py-20" in:fade={{ duration: 300 }}>
          <div class="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-6">
            <div class="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse opacity-60"></div>
            <div class="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 md:w-10 md:h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
          <div class="space-y-2 md:space-y-3">
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">No releases yet</h3>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto">We're working hard on new releases. Check back soon for exciting updates!</p>
          </div>
        </div>
      {:else}
        <!-- Enhanced Releases Grid -->
        <div class="space-y-6 md:space-y-8">
          {#each sources as source, index (source.id)}
            <div
              class="group relative transform transition-all duration-700"
              in:fly={{ y: 50, duration: 800, delay: index * 100, easing: cubicOut }}
            >
              <!-- Enhanced Glass Card Background -->
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 dark:from-cyan-500/5 dark:via-blue-500/5 dark:to-purple-500/5 rounded-2xl md:rounded-3xl opacity-60 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-none"></div>

              <!-- Animated Border -->
              <div class="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>

              <!-- Main Enhanced Card -->
              <div class="relative bg-white/80 backdrop-blur-xl dark:bg-gray-800/80 rounded-2xl md:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/30 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">

                <!-- Enhanced Banner -->
                <div class="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                  <img
                    src={source.banner}
                    alt="{source.version} banner"
                    class="w-full h-full object-cover  transition-transform duration-700"
                    loading="lazy"
                  />
                  <!-- Enhanced Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-500"></div>

                  <!-- Enhanced Version Badge -->
                  <div class="absolute top-3 left-3 md:top-6 md:left-6 group/version">
                    <div class="relative transform transition-transform duration-300">
                      <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/40 to-blue-500/40 rounded-lg md:rounded-xl blur group-hover/version:blur-md transition-all duration-300"></div>
                      <div class="relative px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg md:rounded-xl text-white font-bold shadow-2xl border border-white/30">
                        <div class="flex items-center space-x-1.5 md:space-x-2">
                          <div class="relative">
                            <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-200 rounded-full animate-ping absolute"></div>
                            <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                          </div>
                          <span class="text-xs md:text-sm font-extrabold tracking-wide">{source.version}</span>
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg md:rounded-xl translate-x-[-100%] group-hover/version:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Enhanced Codename Badge -->
                  <div class="absolute top-3 right-3 md:top-6 md:right-6 group/codename">
                    <div class="relative transform transition-transform duration-300">
                      <div class="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-lg md:rounded-xl blur transition-all duration-300"></div>
                      <div class="relative px-2.5 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-purple-500/95 to-pink-500/95 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/40 shadow-xl">
                        <div class="flex items-center space-x-1 md:space-x-1.5">
                          <div class="w-1 h-1 md:w-1.5 md:h-1.5 bg-pink-300 rounded-full animate-pulse"></div>
                          <span class="text-white text-xs font-bold tracking-wider uppercase">{source.codenameVersion}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Enhanced Release Date -->
                  <div class="absolute bottom-3 left-3 md:bottom-6 md:left-6">
                    <div class="flex items-center space-x-2 md:space-x-3 text-white bg-black/30 backdrop-blur-sm rounded-lg md:rounded-xl px-3 py-1.5 md:px-4 md:py-2 border border-white/20">
                      <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-xs md:text-sm font-semibold">{formatDate(source.releaseDate)}</span>
                    </div>
                  </div>
                </div>

                <!-- Enhanced Content -->
                <div class="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
                  <!-- Enhanced Description -->
                  <div class="relative">
                    <div class="absolute -left-2 md:-left-4 top-0 w-0.5 md:w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-600 rounded-full"></div>
                    <p class="text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium pl-3 md:pl-4">
                      {source.description}
                    </p>
                  </div>

                  <!-- Enhanced Changelog -->
                  <div class="group/changelog">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 p-3 md:p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl md:rounded-2xl border border-cyan-200/50 dark:border-cyan-700/50">
                      <h4 class="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white flex items-center mb-3 sm:mb-0">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center mr-2 md:mr-3 shadow-lg">
                          <svg class="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <span>Changelog</span>
                          <div class="text-xs md:text-sm font-normal text-cyan-600 dark:text-cyan-400">{source.changelog.length} improvements</div>
                        </div>
                      </h4>

                      <!-- Enhanced Toggle Button -->
                      <button
                        onclick={() => toggleChangelog(source.id)}
                        class="group/toggle flex items-center px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-semibold text-cyan-700 dark:text-cyan-300 hover:text-white bg-white/50 dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 rounded-lg md:rounded-xl border border-cyan-200 dark:border-cyan-700 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <span class="mr-1.5 md:mr-2">{expandedChangelogs[source.id] ? 'Hide Changes' : 'View Changes'}</span>
                        <svg
                          class="w-3 h-3 md:w-4 md:h-4 transform transition-transform duration-300"
                          class:rotate-180={expandedChangelogs[source.id]}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    </div>

                    <!-- Enhanced Expanded Changelog -->
                    {#if expandedChangelogs[source.id]}
                      <div
                        class="overflow-hidden"
                        in:fly={{ y: 30, duration: 500, easing: cubicOut }}
                      >
                        <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                          <ul
                            class="space-y-2 md:space-y-3"
                            class:md:columns-2={source.changelog.length > 6}
                            class:md:gap-6={source.changelog.length > 6}
                            class:lg:gap-8={source.changelog.length > 6}
                          >
                            {#each source.changelog as change, i}
                              <li
                                class="flex items-start space-x-3 md:space-x-4 text-gray-700 dark:text-gray-300 break-inside-avoid mb-2 md:mb-3 p-2.5 md:p-3 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50"
                                in:fly={{ y: 20, duration: 400, delay: i * 50 }}
                              >
                                <div class="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md">
                                  <svg class="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                  </svg>
                                </div>
                                <span class="text-xs md:text-sm lg:text-base font-medium leading-relaxed">{change}</span>
                              </li>
                            {/each}
                          </ul>
                        </div>
                      </div>
                    {/if}
                  </div>

                  <!-- Enhanced Screenshots -->
                  {#if source.screenshots && source.screenshots.length > 0}
                    <div class="group/screenshots">
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 p-3 md:p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl md:rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
                        <h4 class="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white flex items-center mb-3 sm:mb-0">
                          <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg md:rounded-xl flex items-center justify-center mr-2 md:mr-3 shadow-lg">
                            <svg class="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                          <div>
                            <span>Screenshots</span>
                            <div class="text-xs md:text-sm font-normal text-purple-600 dark:text-purple-400">{source.screenshots.length} previews</div>
                          </div>
                        </h4>

                        <!-- Enhanced Toggle Button -->
                        <button
                          onclick={() => toggleScreenshots(source.id)}
                          class="group/toggle flex items-center px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-semibold text-purple-700 dark:text-purple-300 hover:text-white bg-white/50 dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 rounded-lg md:rounded-xl border border-purple-200 dark:border-purple-700 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <span class="mr-1.5 md:mr-2">{expandedScreenshots[source.id] ? 'Hide Gallery' : 'View Gallery'}</span>
                          <svg
                            class="w-3 h-3 md:w-4 md:h-4 transform transition-transform duration-300"
                            class:rotate-180={expandedScreenshots[source.id]}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                      </div>

                      <!-- Enhanced Screenshots Gallery -->
                      {#if expandedScreenshots[source.id]}
                        <div
                          class="overflow-hidden"
                          in:fly={{ y: 30, duration: 500, easing: cubicOut }}
                        >
                          <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                              {#each source.screenshots as screenshot, i}
                                <div
                                  class="relative aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl md:rounded-2xl overflow-hidden shadow-lg transition-all duration-500"
                                  in:fly={{ y: 30, duration: 400, delay: i * 75 }}
                                >
                                  <img
                                    src={screenshot}
                                    alt="Screenshot {i + 1}"
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                              {/each}
                            </div>
                          </div>
                        </div>
                      {/if}
                    </div>
                  {/if}

                  <!-- Enhanced Download Buttons -->
                  <div class="flex flex-col sm:flex-row gap-3 md:gap-4 pt-3 md:pt-4">
                    <a href="/device" class="group relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div class="relative inline-flex items-center justify-center w-full text-sm md:text-base lg:text-lg px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl md:rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl font-bold">
                        <svg class="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Download For Your Device
                      </div>
                    </a>

                    <a href="https://github.com/OrionOS-Project" target="_blank" class="group relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div class="relative inline-flex items-center justify-center w-full text-sm md:text-base lg:text-lg px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 text-white rounded-xl md:rounded-2xl hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl border border-gray-500/30 dark:border-gray-600/30 hover:border-gray-400/50 dark:hover:border-gray-500/50">
                        <svg class="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>
</div>
