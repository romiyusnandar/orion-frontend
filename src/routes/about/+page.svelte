<script lang="ts">
  import { onMount } from 'svelte';
  import logo from '$lib/assets/orion-lg.png'

  let mounted = $state(false);
  let isScrolled = $state(false);
  let hoveredFeature = $state<string | null>(null);
  let activeSection = $state<string>('');

  // Statistics data
  const stats = [
    { number: '27+', label: 'Supported Devices', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { number: '1M+', label: 'Downloads', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { number: '2+', label: 'Years Active', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { number: '24/7', label: 'Community Support', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
  ];

  // Key features data
  const features = [
    {
      id: 'performance',
      title: 'High Performance',
      description: 'Optimized for speed and efficiency with minimal resource usage',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'design',
      title: 'Minimalist Design',
      description: 'Clean, modern interface that focuses on user experience',
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'features',
      title: 'Feature Rich',
      description: 'Packed with useful features while maintaining simplicity',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'support',
      title: 'Long-term Support',
      description: 'Committed to providing updates and support for extended periods',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  // Tech stack data
  const techStack = [
    {
      name: 'Android Open Source Project',
      description: 'Based on AOSP for maximum compatibility',
      icon: 'M17.5 12.5c0-2.485-2.015-4.5-4.5-4.5s-4.5 2.015-4.5 4.5 2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5zM12 9c-1.93 0-3.5 1.57-3.5 3.5S10.07 16 12 16s3.5-1.57 3.5-3.5S13.93 9 12 9zm8-7H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z'
    },
    {
      name: 'LineageOS Foundation',
      description: 'Built on proven LineageOS foundation',
      icon: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z'
    },
    {
      name: 'Indonesian Development',
      description: 'Proudly developed by Indonesian team',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
    },
    {
      name: 'Open Source',
      description: 'Transparent and community-driven development',
      icon: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'
    }
  ];

  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>About OrionOS - Modern Android Experience</title>
  <meta name="description" content="Learn about OrionOS - A high-performance Android ROM based on AOSP and LineageOS, developed in Indonesia with focus on minimalist design and long-term support." />
  <meta name="keywords" content="OrionOS, Android ROM, AOSP, LineageOS, Indonesia, Custom ROM, Performance, Minimalist" />
</svelte:head>

<div class="min-h-screen pt-16 relative overflow-hidden">
  <!-- Background Elements -->
  <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 dark:from-gray-900/80 dark:via-black/90 dark:to-gray-800/80 pointer-events-none"></div>

  <!-- Floating Particles -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    {#each Array(12) as _, i}
      <div
        class="absolute w-2 h-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-full animate-pulse"
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          animation-delay: {i * 0.5}s;
          animation-duration: {3 + Math.random() * 3}s;
        "
      ></div>
    {/each}
  </div>

  <!-- Hero Section -->
  <section class="relative py-20 md:py-32 overflow-hidden">
    <!-- Hero Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-indigo-500/5"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Logo/Icon with enhanced animation -->
        <div
          class="relative inline-flex items-center justify-center mb-8 md:mb-12"
        >
          <!-- Glow effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full blur-3xl opacity-20 animate-pulse scale-150"></div>

          <!-- Main icon container -->
          <div class="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-white/90 via-gray-100/90 to-gray-200/90 dark:from-slate-800 dark:via-gray-900 dark:to-black rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-500 border-2 border-cyan-500/30">
            <!-- Inner glow -->
            <div class="absolute inset-2 bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-slate-900/80 rounded-full opacity-60 blur-sm"></div>

            <!-- Android icon -->
            <div class="relative text-4xl md:text-5xl animate-bounce" style="animation-duration: 3s;">
              <img src={logo} alt="OrionOS logo">
            </div>

            <!-- Rotating ring -->
            <div class="absolute inset-0 border-4 border-white/20 rounded-full animate-spin" style="animation-duration: 10s;"></div>
          </div>
        </div>

        <!-- Title with staggered animation -->
        <div class="space-y-4 mb-8 md:mb-12">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            About
            <span class="">Orion<span class="text-cyan-600 bg-clip-text inline">OS</span></span>
          </h1>

          <p
            class="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Modern Android experience crafted with
            <span class="font-semibold text-blue-600 dark:text-blue-400">performance</span>,
            <span class="font-semibold text-purple-600 dark:text-purple-400">simplicity</span>, and
            <span class="font-semibold text-indigo-600 dark:text-indigo-400">innovation</span> in mind
          </p>
        </div>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
        >
          <a
            href="/device"
            class="group relative inline-flex items-center px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 font-bold text-lg overflow-hidden"
          >
            <!-- Button glow -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>

            <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <span class="relative z-10">Browse Devices</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Statistics Section -->
  <section class="relative py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
      >
          {#each stats as stat, i}
            <div
              class="group text-center p-6 md:p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform"
            >
              <!-- Icon -->
              <div class="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 md:mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={stat.icon}></path>
                </svg>
              </div>

              <!-- Number -->
              <div class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {stat.number}
              </div>

              <!-- Label -->
              <div class="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          {/each}
        </div>
    </div>
  </section>

  <!-- Mission Statement -->
  <section id="mission" class="relative py-16 md:py-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl md:rounded-[2rem] p-8 md:p-16 border border-gray-200/30 dark:border-gray-700/30 shadow-2xl text-center"
      >
        <div class="mb-8 md:mb-12">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
            Our <span class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Mission</span>
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
        </div>

        <p class="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-5xl mx-auto">
          OrionOS is an <span class="font-bold text-blue-600 dark:text-blue-400">Android Open Source Project (AOSP)</span>
          based custom ROM built upon the solid foundation of <span class="font-bold text-purple-600 dark:text-purple-400">LineageOS</span>.
          Proudly developed by a dedicated team from <span class="font-bold text-red-600 dark:text-red-400">Indonesia 🇮🇩</span>,
          we prioritize <span class="font-bold text-green-600 dark:text-green-400">high performance</span> with a
          <span class="font-bold text-indigo-600 dark:text-indigo-400">minimalist design philosophy</span>,
          packed with essential features while ensuring
          <span class="font-bold text-orange-600 dark:text-orange-400">long-term support</span> for our users.
        </p>
      </div>
    </div>
  </section>

  <!-- Key Features Section -->
  <section id="features" class="relative py-16 md:py-24">
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/50 dark:from-gray-900/50 dark:via-black/60 dark:to-gray-800/50"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 md:mb-20">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Why Choose <span class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">OrionOS</span>?
        </h2>
        <p
          class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
        >
          Discover what makes OrionOS the perfect choice for your Android device
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 md:gap-12">
        {#each features as feature, i}
          <div
            class="group relative p-8 md:p-10 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl border border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform cursor-pointer"
            role="button"
            tabindex="0"
            onmouseenter={() => hoveredFeature = feature.id}
            onmouseleave={() => hoveredFeature = null}
          >
            <!-- Background gradient on hover -->
            <div class="absolute inset-0 bg-gradient-to-br {feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl"></div>

            <!-- Icon -->
            <div class="relative flex items-center mb-6 md:mb-8">
              <div class="p-4 md:p-5 bg-gradient-to-br {feature.color} rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={feature.icon}></path>
                </svg>
              </div>

              <!-- Animated indicator -->
              {#if hoveredFeature === feature.id}
                <div
                  class="ml-4 w-2 h-2 bg-gradient-to-r {feature.color} rounded-full animate-pulse"
                ></div>
              {/if}
            </div>

            <!-- Content -->
            <div class="relative">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>

            <!-- Hover effect arrow -->
            {#if hoveredFeature === feature.id}
              <div
                class="absolute bottom-6 right-6 md:bottom-8 md:right-8"
              >
                <svg class="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Technology Foundation -->
  <section id="base" class="relative py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 md:mb-20">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Built on <span class="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">Solid Foundation</span>
        </h2>
        <p
          class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
        >
          OrionOS leverages proven technologies and methodologies to deliver exceptional user experience
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {#each techStack as tech, i}
          <div
            class="group relative p-6 md:p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-center"
          >
            <!-- Background glow -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <!-- Icon -->
            <div class="relative mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
              <div class="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
                <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d={tech.icon}></path>
                </svg>
              </div>
            </div>

            <!-- Content -->
            <div class="relative">
              <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {tech.name}
              </h3>
              <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                {tech.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Indonesian Pride Section -->
  <section id="id" class="relative py-16 md:py-24">
    <div class="absolute inset-0 bg-gradient-to-br from-red-50/30 via-white/20 to-red-50/30 dark:from-red-900/20 dark:via-black/40 dark:to-red-900/20"></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl md:rounded-[2rem] p-8 md:p-16 border border-gray-200/30 dark:border-gray-700/30 shadow-2xl"
      >
        <!-- Indonesian Flag -->
        <div class="inline-flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full mb-8 md:mb-12 shadow-2xl overflow-hidden">
          <div class="w-full h-1/2 bg-red-500"></div>
          <div class="w-full h-1/2 bg-white"></div>
        </div>

        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
          Proudly <span class="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Indonesian</span> 🇮🇩
        </h2>

        <p class="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
          OrionOS is developed by a passionate team of Indonesian developers who believe in creating world-class technology
          solutions from Indonesia. We are committed to showcasing Indonesian talent in the global open-source community
          while providing the best Android experience for users worldwide.
        </p>
      </div>
    </div>
  </section>

  <!-- Community & Future -->
  <section class="relative py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 md:mb-20">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Join Our <span class="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Community</span>
        </h2>
        <p
          class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12"
        >
          Be part of the OrionOS journey and help us shape the future of Android custom ROMs
        </p>
      </div>

      <!-- CTA Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <a
          href="/device"
          class="group relative p-8 md:p-10 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl border border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-center"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="relative">
            <div class="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Find Your Device</h3>
            <p class="text-gray-600 dark:text-gray-400">Browse supported devices and download OrionOS</p>
          </div>
        </a>

        <a
          href="/source"
          class="group relative p-8 md:p-10 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl border border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-center"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="relative">
            <div class="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">View Source</h3>
            <p class="text-gray-600 dark:text-gray-400">Explore our open-source code and contribute</p>
          </div>
        </a>

        <a
          href="/developer"
          class="group relative p-8 md:p-10 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl border border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-center md:col-span-2 lg:col-span-1"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="relative">
            <div class="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Meet the Team</h3>
            <p class="text-gray-600 dark:text-gray-400">Learn about the developers behind OrionOS</p>
          </div>
        </a>
      </div>
    </div>
  </section>
</div>
