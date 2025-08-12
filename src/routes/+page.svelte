<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';

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

<svelte:head>
  <title>OrionOS - Better Your Android</title>
  <meta name="description" content="Experience the future of web development with Orion Vibe - a modern, responsive, and beautiful web application." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center">
  <div class="relative z-10 max-w-7xl mx-auto px-4">
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

      <!-- Right Image -->
      <div
        class="transform transition-all duration-1000 ease-out delay-200"
        class:translate-y-0={mounted}
        class:opacity-100={mounted}
        class:translate-y-8={!mounted}
        class:opacity-0={!mounted}
      >
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl blur-lg md:blur-xl"></div>
          <div class="relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/20 dark:border-gray-700/20">
            <img
              src="/src/lib/assets/orion-fw.png"
              alt="Orion Framework"
              class="w-2/5 h-auto max-w-xs sm:max-w-sm lg:max-w-xs xl:max-w-sm mx-auto p-4 rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Developer Section -->
<section id="developer" class="py-20 bg-white/50 dark:bg-gray-900/50 md:backdrop-blur-sm" style="content-visibility: auto; contain-intrinsic-size: 1px 1000px;">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        👨‍💻 Meet the Developer
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Passionate about creating exceptional web experiences with modern technologies and best practices.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="space-y-6">
  <div class="bg-white/70 dark:bg-gray-800/70 md:backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
          <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Skills & Expertise</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center space-x-2">
              <span class="text-2xl">⚡</span>
              <span class="text-gray-700 dark:text-gray-300">SvelteKit</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🎨</span>
              <span class="text-gray-700 dark:text-gray-300">Tailwind CSS</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">📱</span>
              <span class="text-gray-700 dark:text-gray-300">Responsive Design</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🚀</span>
              <span class="text-gray-700 dark:text-gray-300">Performance</span>
            </div>
          </div>
        </div>
      </div>

  <div class="bg-white/70 dark:bg-gray-800/70 md:backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
        <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Philosophy</h3>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          I believe in writing clean, maintainable code that not only works flawlessly but also provides
          an exceptional user experience. Every line of code is crafted with purpose and attention to detail.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Source Section -->
<section id="source" class="py-20" style="content-visibility: auto; contain-intrinsic-size: 1px 1000px;">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        📦 Open Source
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Built with transparency and community in mind. Explore the source code and contribute to the project.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
  <div class="bg-white/70 dark:bg-gray-800/70 md:backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
        <div class="text-3xl mb-4">🔓</div>
        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">MIT Licensed</h3>
        <p class="text-gray-600 dark:text-gray-300">Free to use, modify, and distribute for any purpose.</p>
      </div>

  <div class="bg-white/70 dark:bg-gray-800/70 md:backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
        <div class="text-3xl mb-4">🌟</div>
        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Modern Stack</h3>
        <p class="text-gray-600 dark:text-gray-300">Built with SvelteKit, TypeScript, and Tailwind CSS.</p>
      </div>

  <div class="bg-white/70 dark:bg-gray-800/70 md:backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
        <div class="text-3xl mb-4">🤝</div>
        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Community Driven</h3>
        <p class="text-gray-600 dark:text-gray-300">Contributions and feedback are always welcome.</p>
      </div>
    </div>
  </div>
</section>

<!-- Download Section -->
<section id="download" class="py-20 bg-white/50 dark:bg-gray-900/50 md:backdrop-blur-sm" style="content-visibility: auto; contain-intrinsic-size: 1px 1000px;">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
      ⬇️ Get Started Today
    </h2>
    <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
      Choose your preferred way to get started with Orion Vibe.
    </p>

    <div class="grid md:grid-cols-2 gap-8">
  <div class="bg-white/70 dark:bg-gray-800/70 md:backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
        <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Clone Repository</h3>
        <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-6">
          <code class="text-sm text-gray-800 dark:text-gray-200">
            git clone https://github.com/romiyusnandar/orion-frontend.git
          </code>
        </div>
        <button
          onclick={() => navigator.clipboard.writeText('git clone https://github.com/romiyusnandar/orion-frontend.git')}
          class="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
        >
          <span>📋</span>
          <span class="ml-2">Copy Command</span>
        </button>
      </div>

  <div class="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 md:backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
        <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">NPM Install</h3>
        <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-6">
          <code class="text-sm text-gray-800 dark:text-gray-200">
            npm create svelte@latest my-app
          </code>
        </div>
        <a
          href="/download"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
        >
          <span>🚀</span>
          <span class="ml-2">Quick Start</span>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- About Section -->
<section id="about" class="py-20" style="content-visibility: auto; contain-intrinsic-size: 1px 1000px;">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        ℹ️ About Orion Vibe
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Learn more about the vision, mission, and technology behind this project.
      </p>
    </div>

    <div class="space-y-12">
  <div class="bg-white/70 dark:bg-gray-800/70 md:backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
        <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Our Mission</h3>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          To create a modern, accessible, and performant web experience that showcases the power of
          contemporary web technologies. Orion Vibe represents the perfect harmony between design and functionality,
          providing users with an intuitive and engaging interface.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
  <div class="bg-white/70 dark:bg-gray-800/70 md:backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Technology Stack</h3>
          <ul class="space-y-3 text-gray-700 dark:text-gray-300">
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-cyan-500 rounded-full"></span>
              <span>SvelteKit for blazing fast performance</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>TypeScript for type safety</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Tailwind CSS for styling</span>
            </li>
          </ul>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Features</h3>
          <ul class="space-y-3 text-gray-700 dark:text-gray-300">
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Responsive design for all devices</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>Dark/Light theme support</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Smooth animations and transitions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="py-12 bg-gray-900 dark:bg-black text-white">
  <div class="max-w-6xl mx-auto px-4 text-center">
    <div class="mb-8">
      <h3 class="text-2xl font-bold mb-2">Orion Vibe</h3>
      <p class="text-gray-400">Building the future, one line of code at a time.</p>
    </div>

    <div class="flex justify-center space-x-6 mb-8">
      <a href="#developer" class="text-gray-400 hover:text-white transition-colors duration-200">Developer</a>
      <a href="#source" class="text-gray-400 hover:text-white transition-colors duration-200">Source</a>
      <a href="#download" class="text-gray-400 hover:text-white transition-colors duration-200">Download</a>
      <a href="#about" class="text-gray-400 hover:text-white transition-colors duration-200">About</a>
    </div>

    <div class="text-gray-400 text-sm">
      <p>&copy; 2025 Orion Vibe. Made with ❤️ and SvelteKit.</p>
    </div>
  </div>
</footer>
