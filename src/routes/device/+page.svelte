<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { formatDate } from '$lib/components/utils/formatters';

  let mounted = $state(false);
  let devices = $state<Device[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let searchQuery = $state('');
  let searchResults = $state<Device[]>([]);
  let isSearching = $state(false);
  let searchError = $state<string | null>(null);
  let searchFocused = $state(false);

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

  async function fetchDevices() {
    try {
      loading = true;

      const response = await fetch('https://orionos-api.onrender.com/api/v1/devices', {
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
        devices = result.data.sort((a: Device, b: Device) =>
          a.name.localeCompare(b.name)
        );
      } else {
        throw new Error('Invalid API response structure');
      }

      error = null;
    } catch (err) {
      error = `Failed to load devices: ${err instanceof Error ? err.message : 'Unknown error'}`;
      devices = [];
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

  async function searchDevices(query: string) {
    if (!query.trim()) {
      searchResults = [];
      searchError = null;
      return;
    }

    try {
      isSearching = true;
      searchError = null;

      const response = await fetch(`https://orionos-api.onrender.com/api/v1/devices/search?q=${encodeURIComponent(query)}`, {
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
        searchResults = result.data;
      } else {
        throw new Error('Invalid search response structure');
      }
    } catch (err) {
      searchError = `Search failed: ${err instanceof Error ? err.message : 'Unknown error'}`;
      searchResults = [];
    } finally {
      isSearching = false;
    }
  }

  function handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;

    // Debounce search
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchDevices(searchQuery);
    }, 300);
  }

  function clearSearch() {
    searchQuery = '';
    searchResults = [];
    searchError = null;
    isSearching = false;
  }

  let searchTimeout: number;

  const displayDevices = $derived(searchQuery.trim() ? searchResults : devices);
  const isDisplayingSearchResults = $derived(searchQuery.trim().length > 0);

  onMount(() => {
    mounted = true;
    fetchDevices();
  });
</script>

<svelte:head>
  <title>Supported Devices - OrionOS</title>
  <meta name="description" content="Browse all devices officially supported by OrionOS. Find your device and download the latest build." />
</svelte:head>

<div class="min-h-screen pt-16">
  <!-- Hero Section -->
  <section class="relative py-20 overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-gray-900/90 dark:via-black/80 dark:to-gray-800/90"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

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
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Supported <span class="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">Devices</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Browse all devices officially supported by OrionOS. Find your device and download the latest build.
        </p>

        <!-- Stats -->
        <div class="flex justify-center items-center space-x-8 mt-12">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{devices.length}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Supported Devices</div>
          </div>
          <div class="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {devices.filter(d => d.status === 'ACTIVE').length}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Active Builds</div>
          </div>
          <div class="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <div class="text-center">
            <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {devices.reduce((acc, d) => acc + d.builds.length, 0)}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Builds</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Devices Section -->
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Search Bar -->
      <div class="mb-12">
        <div class="max-w-2xl mx-auto">
          <div class="relative group">
            <!-- Glass Background Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300 opacity-70 dark:opacity-60"></div>

            <!-- Search Container -->
            <div
              class="relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/20 dark:border-gray-700/20 shadow-lg transition-all duration-300"
              class:border-blue-500={searchFocused}
              class:border-opacity-40={searchFocused}
              class:shadow-xl={searchFocused}
            >
              <div class="flex items-center p-4">
                <!-- Search Icon -->
                <div class="flex-shrink-0 mr-4">
                  <svg
                    class="w-6 h-6 text-gray-400 dark:text-gray-500 transition-colors duration-300"
                    class:text-blue-500={searchFocused}
                    class:dark:text-blue-400={searchFocused}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>

                <!-- Search Input -->
                <input
                  type="text"
                  placeholder="Search devices by name or codename..."
                  bind:value={searchQuery}
                  oninput={handleSearchInput}
                  onfocus={() => searchFocused = true}
                  onblur={() => searchFocused = false}
                  class="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
                />

                <!-- Loading Spinner / Clear Button -->
                <div class="flex-shrink-0 ml-4">
                  {#if isSearching}
                    <!-- Loading Spinner -->
                    <div class="w-6 h-6 border-2 border-blue-200 dark:border-blue-800 border-t-blue-500 rounded-full animate-spin"></div>
                  {:else if searchQuery.trim()}
                    <!-- Clear Button -->
                    <button
                      onclick={clearSearch}
                      class="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-200 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  {/if}
                </div>
              </div>

              <!-- Search Results Info -->
              {#if isDisplayingSearchResults}
                <div class="px-4 pb-4 border-t border-gray-200/20 dark:border-gray-700/20 pt-3">
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="text-gray-600 dark:text-gray-400">
                        {#if searchError}
                          <span class="text-red-600 dark:text-red-400">{searchError}</span>
                        {:else if isSearching}
                          <span>Searching...</span>
                        {:else}
                          <span>Found {searchResults.length} device{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"</span>
                        {/if}
                      </span>
                    </div>
                    <button
                      onclick={clearSearch}
                      class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                    >
                      Clear search
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>

      {#if loading}
        <!-- Loading State -->
        <div class="text-center py-20">
          <div class="relative inline-flex items-center justify-center w-16 h-16 mb-4">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-75"></div>
            <div class="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin">
              <div class="absolute top-1 right-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <p class="text-xl text-gray-600 dark:text-gray-300">Loading supported devices...</p>
        </div>
      {:else if error && !isDisplayingSearchResults}
        <!-- Error State -->
        <div class="text-center py-20" in:fade={{ duration: 300 }}>
          <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Failed to load devices</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onclick={fetchDevices}
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Try Again
          </button>
        </div>
      {:else if displayDevices.length === 0 && !isSearching}
        <!-- Empty State -->
        <div class="text-center py-20" in:fade={{ duration: 300 }}>
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {#if isDisplayingSearchResults}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              {:else}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              {/if}
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {isDisplayingSearchResults ? 'No devices found' : 'No devices found'}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {isDisplayingSearchResults ? `No devices match "${searchQuery}". Try a different search term.` : 'Check back later for supported devices.'}
          </p>
          {#if isDisplayingSearchResults}
            <button
              onclick={clearSearch}
              class="mt-4 inline-flex items-center px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Show all devices
            </button>
          {/if}
        </div>
      {:else}
        <!-- Devices Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each displayDevices as device, index (device.id)}
            <div
              class="group relative"
              in:fly={{ y: 30, duration: 600, delay: index * 150, easing: cubicOut }}
            >
              <!-- Glass Card Background Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300 opacity-70 dark:opacity-60"></div>

              <!-- Main Card -->
              <a
                href="/device/{device.codename}"
                class="relative block bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/20 dark:border-gray-700/20 hover:border-blue-500/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-[1.02]"
              >
                <!-- Device Image -->
                <div class="relative h-48 overflow-hidden">
                  <img
                    src={device.image}
                    alt="{device.name}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  <!-- Status Badge -->
                  <div class="absolute top-4 left-4">
                    <div class="flex items-center space-x-2 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">
                      <div class="w-2 h-2 {getStatusColor(device.status)} rounded-full animate-pulse"></div>
                      <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">{getStatusText(device.status)}</span>
                    </div>
                  </div>

                  <!-- Build Count -->
                  <div class="absolute top-4 right-4">
                    <div class="px-2 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                      {device.builds.length} build{device.builds.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                  <!-- Device Info -->
                  <div class="mb-4">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {device.name}
                    </h3>
                    <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                      </svg>
                      <span class="text-sm font-mono">{device.codename}</span>
                    </div>
                  </div>

                  <!-- Maintainer -->
                  <div class="flex items-center space-x-3 mb-4">
                    <img
                      src={device.maintainer.profileImage}
                      alt={device.maintainer.name}
                      class="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700"
                      loading="lazy"
                    />
                    <div>
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">{device.maintainer.name}</p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">{device.maintainer.role.replace('_', ' ')}</p>
                    </div>
                  </div>

                  <!-- Latest Build Info -->
                  {#if device.builds.length > 0}
                    <div class="bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-3 mb-4">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Latest Build</span>
                        <span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                          {device.builds[0].type}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">{device.builds[0].version}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-500">{device.builds[0].fileSize}</p>
                    </div>
                  {/if}

                  <!-- View Details Button -->
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                      Updated {formatDate(device.updatedAt)}
                    </span>
                    <div class="flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold">
                      View Details
                      <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>
</div>
