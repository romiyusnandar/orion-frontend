<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import CarouselImageSample from '$lib/components/home/CarouselImageSample.svelte';

  let mounted = $state(false);
  let currentTextIndex = $state(0);

  const changingTexts = ['awesome.', 'simple.', 'faster.', 'powerful.'];
  const longestText = changingTexts.reduce((a, b) => (b.length > a.length ? b : a), '');

  const TEXT_OUT_MS = 220;
  const TEXT_IN_MS = 260;

  onMount(() => {
    mounted = true;

    const interval = setInterval(() => {
      currentTextIndex = (currentTextIndex + 1) % changingTexts.length;
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  });
</script>

<section class="relative min-h-screen flex items-center justify-center">
  <div class="relative z-10 max-w-7xl mx-auto px-4 mb-10">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Left Content -->
      <div
        class="transform transition-all duration-1000 ease-out text-center lg:text-left"
        class:translate-y-0={mounted}
        class:opacity-100={mounted}
        class:translate-y-8={!mounted}
        class:opacity-0={!mounted}
      >
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Make your android
          <span class="inline-grid align-baseline items-center justify-items-center md:justify-items-start">
            <span class="opacity-0 col-start-1 row-start-1 whitespace-nowrap">
              {longestText}
            </span>
            {#key currentTextIndex}
              <span
                class="col-start-1 row-start-1 inline-block whitespace-nowrap will-change-transform bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                out:fly={{ y: -12, duration: TEXT_OUT_MS, easing: cubicIn }}
                in:fly={{ y: 12, duration: TEXT_IN_MS, easing: cubicOut, delay: TEXT_OUT_MS }}
              >
                {changingTexts[currentTextIndex]}
              </span>
            {/key}
          </span>
        </h1>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
          Experience the future of Android customization with cutting-edge technology, beautiful design, and seamless performance that transforms your device.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
          <a
            href="/download"
            class="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Download</span>
          </a>
          <a
            href="/source"
            class="inline-flex items-center px-8 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transform hover:scale-105 transition-all duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            <span>View Source</span>
          </a>
        </div>
      </div>

      <!-- Right UI Samples Carousel -->
      <div
        class="transform transition-all duration-1000 ease-out delay-200 p-4"
        class:translate-y-0={mounted}
        class:opacity-100={mounted}
        class:translate-y-8={!mounted}
        class:opacity-0={!mounted}
      >
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl blur-lg md:blur-xl"></div>
          <div class="relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl p-6 pb-12 border border-gray-200/20 dark:border-gray-700/20">
            <div class="w-full h-96 sm:h-[28rem] md:h-[32rem] lg:h-96 xl:h-[28rem] max-w-sm mx-auto overflow-hidden">
              <CarouselImageSample />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>