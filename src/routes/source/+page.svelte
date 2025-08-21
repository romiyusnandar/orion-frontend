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
  <section class="relative py-20 overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-blue-50/30 to-purple-50/50 dark:from-gray-900/90 dark:via-black/80 dark:to-gray-800/90"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent"></div>

    <div class="relative max-w-7xl mx-auto px-4">
      <div
        class="text-center transform transition-all duration-1000 ease-out"
        class:translate-y-0={mounted}
        class:opacity-100={mounted}
        class:translate-y-8={!mounted}
        class:opacity-0={!mounted}
      >
        <div class="group inline-flex items-center justify-center mb-8">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" class="animate-pulse"/>
                <circle cx="12" cy="12" r="2" class="animate-ping" opacity="0.6"/>
              </svg>
            </div>
          </div>
        </div>
        <h1 class="text-xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Source <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Releases</span>
        </h1>
        <p class="text-sm md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Download the latest OrionOS source releases, explore new features, and stay up to date with our development progress.
        </p>

        <!-- Stats -->
        <div class="flex justify-center items-center space-x-8 mt-12">
          <div class="text-center">
            <div class="text-xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400">{sources.length}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Releases</div>
          </div>
          <div class="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <div class="text-center">
            <div class="text-xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
                {sources.length > 0 ? sources[0].version : '---'}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Latest Version</div>
          </div>
          <div class="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <div class="text-center">
            <div class="text-xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">Open</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Source</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Source Releases Section -->
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-1.5 md:px-4">
      {#if loading}
        <!-- Loading State -->
        <div class="text-center py-0 md:py-20">
          <div class="relative inline-flex items-center justify-center w-16 h-16 mb-4">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-ping opacity-75"></div>
            <div class="relative w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-spin">
              <div class="absolute top-1 right-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <p class="text-xl text-gray-600 dark:text-gray-300">Loading source releases...</p>
        </div>
      {:else if error}
        <!-- Error State -->
        <div class="text-center py-20" in:fade={{ duration: 300 }}>
          <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Failed to load releases</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onclick={fetchSources}
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Try Again
          </button>
        </div>
      {:else if sources.length === 0}
        <!-- Empty State -->
        <div class="text-center py-0 md:py-20" in:fade={{ duration: 300 }}>
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No releases found</h3>
          <p class="text-gray-600 dark:text-gray-300">Check back later for new OrionOS releases.</p>
        </div>
      {:else}
        <!-- Releases Grid -->
        <div class="space-y-8">
          {#each sources as source, index (source.id)}
            <div
              class="group relative"
              in:fly={{ y: 30, duration: 600, delay: index * 150, easing: cubicOut }}
            >
              <!-- Glass Card Background Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 dark:from-cyan-500/10 dark:to-purple-500/10 rounded-2xl opacity-70 dark:opacity-60 group-hover:opacity-80 transition-all duration-300"></div>

              <!-- Main Card -->
              <div class="relative bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 hover:border-cyan-500/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">

                <!-- Banner -->
                <div class="relative aspect-video overflow-hidden">
                  <img
                    src={source.banner}
                    alt="{source.version} banner"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  <!-- Version Badge -->
                  <div class="absolute top-4 left-4 group/version">
                    <div class="relative">
                      <!-- Glow Effect -->
                      <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full opacity-75 group-hover/version:opacity-100 group-hover/version:scale-110 transition-all duration-300"></div>

                      <!-- Main Badge -->
                      <div class="relative px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full text-white font-bold shadow-xl border border-white/20 group-hover/version:scale-105 transition-all duration-300">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-cyan-200 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span class="text-sm font-bold tracking-wide">{source.version}</span>
                        </div>

                        <!-- Shimmer Effect -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full translate-x-[-100%] group-hover/version:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Codename Badge -->
                  <div class="absolute top-4 right-4 group/codename">
                    <div class="relative">
                      <!-- Glow Effect -->
                      <div class="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full opacity-60 group-hover/codename:opacity-90 group-hover/codename:scale-110 transition-all duration-300"></div>

                      <!-- Main Badge -->
                      <div class="relative px-4 py-2 bg-gradient-to-r from-purple-500/90 to-pink-500/90 rounded-full border border-white/30 shadow-lg group-hover/codename:scale-105 transition-all duration-300">
                        <div class="flex items-center space-x-2">
                          <div class="w-2 h-2 bg-pink-300 rounded-full animate-ping"></div>
                          <span class="text-white text-xs font-semibold tracking-wider uppercase">{source.codenameVersion}</span>
                        </div>

                        <!-- Shimmer Effect -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full translate-x-[-100%] group-hover/codename:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Release Date -->
                  <div class="absolute bottom-4 left-4">
                    <div class="flex items-center space-x-2 text-white">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-sm font-medium">{formatDate(source.releaseDate)}</span>
                    </div>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-4 md:p-6">
                  <!-- Description -->
                  <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {source.description}
                  </p>

                  <!-- Changelog -->
                  <div class="mb-6">
                    <div class="flex items-center justify-between mb-4">
                      <h4 class="text-sm md:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <svg class="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Changelog ({source.changelog.length})
                      </h4>

                      <!-- Toggle Button -->
                      <button
                        onclick={() => toggleChangelog(source.id)}
                        class="group/toggle inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-200"
                      >
                        <span class="mr-2">{expandedChangelogs[source.id] ? 'Hide' : 'View Changelog'}</span>
                        <svg
                          class="w-4 h-4 transform transition-transform duration-300"
                          class:rotate-180={expandedChangelogs[source.id]}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    </div>

                    <!-- Expanded Changelog -->
                    {#if expandedChangelogs[source.id]}
                      <div
                        class="mt-4"
                        in:fly={{ y: 20, duration: 400, easing: cubicOut }}
                      >
                        <ul
                          class="space-y-2"
                          class:md:columns-2={source.changelog.length > 4}
                          class:md:gap-6={source.changelog.length > 4}
                          class:md:space-y-0={source.changelog.length > 4}
                        >
                          {#each source.changelog as change, i}
                            <li
                              class="flex items-start space-x-2 text-gray-600 dark:text-gray-400 break-inside-avoid mb-2"
                              in:fly={{ y: 20, duration: 300, delay: i * 30 }}
                            >
                              <div class="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span class="text-sm">{change}</span>
                            </li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  </div>

                  <!-- Screenshots -->
                  {#if source.screenshots && source.screenshots.length > 0}
                    <div class="mb-6">
                      <div class="flex items-center justify-between mb-4">
                        <h4 class="text-sm md:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                          <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          Screenshots ({source.screenshots.length})
                        </h4>

                        <!-- Toggle Button -->
                        <button
                          onclick={() => toggleScreenshots(source.id)}
                          class="group/toggle inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
                        >
                          <span class="mr-2">{expandedScreenshots[source.id] ? 'Hide' : 'View Screenshots'}</span>
                          <svg
                            class="w-4 h-4 transform transition-transform duration-300"
                            class:rotate-180={expandedScreenshots[source.id]}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                      </div>

                      <!-- Expanded Screenshots Gallery -->
                      {#if expandedScreenshots[source.id]}
                        <div
                          class="mt-4"
                          in:fly={{ y: 20, duration: 400, easing: cubicOut }}
                        >
                          <!-- Screenshots Grid -->
                          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {#each source.screenshots as screenshot, i}
                              <div
                                class="relative aspect-[9/16] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                                in:fly={{ y: 20, duration: 300, delay: i * 50 }}
                              >
                                <img
                                  src={screenshot}
                                  alt="Screenshot {i + 1}"
                                  class="w-full h-full object-cover"
                                  loading="lazy"
                                />

                                <!-- Screenshot Number -->
                                <div class="absolute top-3 right-3 w-8 h-8 bg-purple-500/95 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                  {i + 1}
                                </div>
                              </div>
                            {/each}
                          </div>
                        </div>
                      {/if}
                    </div>
                  {/if}

                  <!-- Download Button -->
                  <div class="flex flex-col sm:flex-row gap-4">
                    <a href="/device" class="flex-1 inline-flex items-center justify-center text-sm md:text-base px-6 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Download For Your Devices
                    </a>

                    <a href="https://github.com/OrionOS-Project" target="_blank" class="inline-flex items-center justify-center text-sm md:text-base px-6 py-2 md:py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-300 font-semibold">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                      </svg>
                      View on GitHub
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
