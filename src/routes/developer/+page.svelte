<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { formatDate } from '$lib/components/utils/formatters';

  let mounted = $state(false);
  let developers = $state<Developer[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  interface Developer {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    role: string;
    socialLinks?: Array<{
      url: string;
      platform: string;
    }>;
    isActive?: boolean;
    createdAt: string;
    updatedAt?: string;
    maintainedDevices?: Array<{
      id: string;
      name: string;
      codename: string;
    }>;
    imageError?: boolean;
  }

  async function fetchDevelopers() {
    try {
      loading = true;

      const response = await fetch('https://orionos-api.onrender.com/api/v1/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        developers = sortDevelopers(data.map(dev => ({ ...dev, imageError: false })));
      } else if (data.data && Array.isArray(data.data)) {
        developers = sortDevelopers(data.data.map((dev: any) => ({ ...dev, imageError: false })));
      } else if (data.users && Array.isArray(data.users)) {
        developers = sortDevelopers(data.users.map((dev: any) => ({ ...dev, imageError: false })));
      } else if (data.result && Array.isArray(data.result)) {
        developers = sortDevelopers(data.result.map((dev: any) => ({ ...dev, imageError: false })));
      } else {
        throw new Error('Invalid API response structure');
      }

      error = null;
    } catch (err) {
      error = `Failed to load developers: ${err instanceof Error ? err.message : 'Unknown error'}`;
      developers = [];
    } finally {
      loading = false;
    }
  }  function getRoleColor(role: string) {
    const roleColors: Record<string, string> = {
      'admin': 'from-red-500 to-pink-600',
      'founder': 'from-yellow-500 to-orange-600',
      'co_founder': 'from-orange-500 to-red-600',
      'core_developer': 'from-blue-500 to-cyan-600',
      'ui_ux_designer': 'from-purple-500 to-pink-600',
      'group_support': 'from-green-500 to-emerald-600',
      'maintainer': 'from-indigo-500 to-purple-600',
      'default': 'from-cyan-500 to-blue-600'
    };
    return roleColors[role?.toLowerCase()] || roleColors.default;
  }

  function getAvatarUrl(developer: Developer) {
    if (developer.profileImage) {
      return developer.profileImage;
    }
    // Generate avatar from initials using a placeholder service
    const initials = developer.name?.split(' ').map(n => n.charAt(0)).join('') || '?';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name || 'User')}&background=${getRoleColor(developer.role).includes('red') ? 'ef4444' : getRoleColor(developer.role).includes('purple') ? '8b5cf6' : getRoleColor(developer.role).includes('blue') ? '3b82f6' : getRoleColor(developer.role).includes('green') ? '10b981' : '6b7280'}&color=fff&size=64`;
  }

  function getSocialLinkIcon(platform: string) {
    const icons = {
      'github': 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
      'telegram': 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
      'twitter': 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
      'linkedin': 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
      'email': 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    };
    return icons[platform?.toLowerCase() as keyof typeof icons] || icons.email;
  }

  function getSocialLinkColor(platform: string) {
    const colors = {
      'github': 'gray',
      'telegram': 'blue',
      'twitter': 'sky',
      'linkedin': 'blue',
      'email': 'green'
    };
    return colors[platform?.toLowerCase() as keyof typeof colors] || 'gray';
  }

  function sortDevelopers(developers: Developer[]) {
    const roleHierarchy = {
      'ADMIN': 1,
      'FOUNDER': 2,
      'CO_FOUNDER': 3,
      'CORE_DEVELOPER': 4,
      'UI_UX_DESIGNER': 5,
      'GROUP_SUPPORT': 6,
      'MAINTAINER': 7
    };

    return developers.sort((a, b) => {
      const roleA = roleHierarchy[a.role as keyof typeof roleHierarchy] || 999;
      const roleB = roleHierarchy[b.role as keyof typeof roleHierarchy] || 999;

      if (roleA !== roleB) {
        return roleA - roleB;
      }

      // If same role, sort by name
      return a.name.localeCompare(b.name);
    });
  }

  onMount(() => {
    mounted = true;
    fetchDevelopers();
  });
</script>

<svelte:head>
  <title>Developers - OrionOS</title>
  <meta name="description" content="Meet the talented developers behind OrionOS - passionate about creating exceptional Android experiences." />
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
                <!-- Main developer figure -->
                <circle cx="9" cy="7" r="3" class="group-hover:animate-pulse" opacity="0.9"/>
                <path d="M9 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" class="group-hover:animate-pulse" opacity="0.9"/>

                <!-- Second developer figure -->
                <circle cx="17" cy="7" r="2.5" class="animate-pulse" style="animation-delay: 0.3s;" opacity="0.8"/>
                <path d="M17 13c-2.67 0-8 1.34-8 4v2h8v-2c0-2.66 5.33-4 8-4v-1c-2.21 0-8 1.79-8 1z" class="animate-pulse" style="animation-delay: 0.3s;" opacity="0.8"/>

                <!-- Connection lines -->
                <line x1="11" y1="9" x2="15" y2="9" stroke="currentColor" stroke-width="0.5" class="group-hover:animate-ping" opacity="0.6"/>
                <line x1="9" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="0.5" class="group-hover:animate-ping" style="animation-delay: 0.5s;" opacity="0.6"/>

                <!-- Floating particles -->
                <circle cx="6" cy="4" r="0.5" class="animate-bounce" style="animation-delay: 0.2s;" opacity="0.7"/>
                <circle cx="20" cy="6" r="0.5" class="animate-bounce" style="animation-delay: 0.7s;" opacity="0.7"/>
                <circle cx="4" cy="12" r="0.5" class="animate-bounce" style="animation-delay: 1s;" opacity="0.7"/>
                <circle cx="22" cy="14" r="0.5" class="animate-bounce" style="animation-delay: 0.4s;" opacity="0.7"/>
              </svg>
            </div>
          </div>
        </div>
        <h1 class="text-2xl md:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Meet Our <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Developers</span>
        </h1>
        <p class="text-md md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          The talented minds behind OrionOS, working together to create exceptional Android experiences with cutting-edge technology and innovation.
        </p>

        <!-- Stats -->
        <div class="flex flex-row justify-center items-center space-x-8 mt-12">
          <div class="text-center">
            <div class="text-xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400">{developers.length}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Developers</div>
          </div>
          <div class="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <div class="text-center">
            <div class="text-xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Support</div>
          </div>
          <div class="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">∞</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Innovation</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Developers Grid Section -->
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4">
      {#if loading}
        <!-- Loading State -->
        <div class="text-center py-20">
          <div class="relative inline-flex items-center justify-center w-16 h-16 mb-4">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-ping opacity-75"></div>
            <div class="relative w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-spin">
              <div class="absolute top-1 right-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <p class="text-xl text-gray-600 dark:text-gray-300">Loading our amazing developers...</p>
        </div>
      {:else if error}
        <!-- Error State -->
        <div class="text-center py-20" in:fade={{ duration: 300 }}>
          <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onclick={fetchDevelopers}
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Try Again
          </button>
        </div>
      {:else if developers.length === 0}
        <!-- Empty State -->
        <div class="text-center py-20" in:fade={{ duration: 300 }}>
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No developers found</h3>
          <p class="text-gray-600 dark:text-gray-300">Check back later for our developer showcase.</p>
        </div>
      {:else}
        <!-- Developers Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each developers as developer, index (developer.id)}
            <div
              class="group relative"
              in:fly={{ y: 20, duration: 500, delay: index * 100, easing: cubicOut }}
            >
              <!-- Glass Card Background Effect - Enhanced for light/dark mode -->
              <div class="absolute inset-0 bg-gradient-to-r {getRoleColor(developer.role)}/20 dark:{getRoleColor(developer.role)}/10 rounded-2xl opacity-70 dark:opacity-60 group-hover:opacity-80 transition-all duration-300"></div>

              <!-- Main Card -->
              <div id={developer.name} class="relative bg-white/40 dark:bg-gray-800/40 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-700/30 hover:border-cyan-500/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-102 h-full">

                <!-- Avatar & Role Badge -->
                <div class="flex items-start justify-between mb-4">
                  <div class="relative">
                    <!-- Profile Photo Container -->
                    <div class="w-16 h-16 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br {getRoleColor(developer.role)}">
                      {#if !developer.imageError}
                        <img
                          src={getAvatarUrl(developer)}
                          alt="{developer.name}'s profile"
                          class="w-full h-full object-cover"
                          loading="lazy"
                          onerror={() => developer.imageError = true}
                        />
                      {:else}
                        <!-- Fallback to initials if image fails to load -->
                        <div class="w-full h-full flex items-center justify-center text-white font-semibold text-lg">
                          {developer.name?.charAt(0) || '?'}
                        </div>
                      {/if}
                    </div>
                    <!-- Status indicator -->
                    <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Role Badge -->
                  <div class="px-3 py-1 bg-gradient-to-r {getRoleColor(developer.role)}/90 rounded-full text-xs font-medium text-white shadow-md">
                    {developer.role || 'Member'}
                  </div>
                </div>

                <!-- Developer Info -->
                <div class="">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                      {developer.name}
                    </h3>
                  </div>

                  {#if developer.maintainedDevices && developer.maintainedDevices.length > 0}
                    <div>
                      <p class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Maintained Devices:</p>
                      <div class="flex flex-wrap gap-1">
                        {#each developer.maintainedDevices as device}
                          <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded-md">
                            {device.codename}
                          </span>
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Joined {formatDate(developer.createdAt)}
                  </div>
                </div>

                <!-- Social Links -->
                <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/10 dark:border-gray-700/10">
                  <div class="flex space-x-2">
                    {#if developer.socialLinks && developer.socialLinks.length > 0}
                      {#each developer.socialLinks as socialLink}
                        <a
                          href={socialLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View {developer.name}'s {socialLink.platform} profile"
                          class="group/social relative p-2 bg-white/20 dark:bg-gray-800/20 rounded-lg border border-gray-200/30 dark:border-gray-700/30 hover:border-{getSocialLinkColor(socialLink.platform)}-400/40 hover:bg-{getSocialLinkColor(socialLink.platform)}-500/20 transition-all duration-300"
                        >
                        <div class="absolute inset-0 bg-gradient-to-r from-{getSocialLinkColor(socialLink.platform)}-600/10 to-{getSocialLinkColor(socialLink.platform)}-400/10 rounded-lg opacity-0 group-hover/social:opacity-50 transition-all duration-300"></div>
                        <svg class="relative w-4 h-4 text-gray-500 dark:text-gray-400 group-hover/social:text-{getSocialLinkColor(socialLink.platform)}-500 dark:group-hover/social:text-{getSocialLinkColor(socialLink.platform)}-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="{getSocialLinkIcon(socialLink.platform)}"/>
                        </svg>
                        </a>
                      {/each}
                    {:else}
                      <!-- Email fallback if no social links -->
                      <a
                        href="mailto:{developer.email}"
                        aria-label="Send email to {developer.name}"
                        class="group/social relative p-2 bg-white/20 dark:bg-gray-800/20 rounded-lg border border-gray-200/30 dark:border-gray-700/30 hover:border-green-400/40 hover:bg-green-500/20 transition-all duration-300"
                      >
                        <div class="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-400/10 rounded-lg opacity-0 group-hover/social:opacity-50 transition-all duration-300"></div>
                        <svg class="relative w-4 h-4 text-gray-500 dark:text-gray-400 group-hover/social:text-green-500 dark:group-hover/social:text-green-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </a>
                    {/if}
                  </div>                  <!-- Online Status -->
                  <div class="flex items-center space-x-1">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                    <span class="text-xs text-gray-600 dark:text-gray-400">Active</span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>

  <!-- Call to Action Section -->
  <section class="py-20 bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/50 dark:from-gray-900/50 dark:via-black/30 dark:to-gray-800/50">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Want to Join Our Team?
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
        We're always looking for passionate developers to join the OrionOS project.
        Contribute to the future of Android customization!
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="https://t.me/OrionOS_prjkt"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-8 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transform hover:scale-105 transition-all duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span>Join Community</span>
        </a>
      </div>
    </div>
  </section>
</div>
