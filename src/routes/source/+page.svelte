<script lang="ts">
  import { onMount } from 'svelte';

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Source Code - Orion Vibe</title>
  <meta name="description" content="Explore the open source code behind Orion Vibe. Built with transparency and community in mind." />
</svelte:head>

<div class="min-h-screen pt-16">
  <!-- Hero Section -->
  <section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
    <div class="max-w-6xl mx-auto px-4">
      <div
        class="text-center transform transition-all duration-1000 ease-out"
        class:translate-y-0={mounted}
        class:opacity-100={mounted}
        class:translate-y-8={!mounted}
        class:opacity-0={!mounted}
      >
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full mb-8 shadow-lg">
          <span class="text-4xl">📦</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          <span class="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-white bg-clip-text text-transparent">Open Source</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Built with transparency and community in mind. Explore the source code and contribute to the project.
        </p>
      </div>
    </div>
  </section>

  <!-- Repository Info -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Project Repository
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Dive into the codebase and see how everything works under the hood.
        </p>
      </div>

      <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg mb-12">
        <div class="flex flex-col lg:flex-row items-center gap-8">
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              romiyusnandar/orion-frontend
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              A modern, responsive web application built with SvelteKit, TypeScript, and Tailwind CSS.
              Features glass morphism UI, smooth animations, and optimized performance.
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">SvelteKit</span>
              <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">TypeScript</span>
              <span class="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full text-sm font-medium">Tailwind CSS</span>
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">Vite</span>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/romiyusnandar/orion-frontend"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 font-semibold"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                </svg>
                View on GitHub
              </a>

              <button
                onclick={() => navigator.clipboard.writeText('git clone https://github.com/romiyusnandar/orion-frontend.git')}
                class="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200 font-semibold"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                Clone Repository
              </button>
            </div>
          </div>

          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 w-full lg:w-auto">
            <div class="flex items-center gap-4 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-gray-600 dark:text-gray-400">Active</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="text-gray-600 dark:text-gray-400">MIT License</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="py-20 bg-gray-50/50 dark:bg-gray-900/50">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
        Open Source Features
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
          <div class="text-3xl mb-4">🔓</div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">MIT Licensed</h3>
          <p class="text-gray-600 dark:text-gray-300">Free to use, modify, and distribute for any purpose. Commercial use allowed.</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
          <div class="text-3xl mb-4">🌟</div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Modern Stack</h3>
          <p class="text-gray-600 dark:text-gray-300">Built with SvelteKit, TypeScript, and Tailwind CSS for optimal performance.</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
          <div class="text-3xl mb-4">🤝</div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Community Driven</h3>
          <p class="text-gray-600 dark:text-gray-300">Contributions and feedback are always welcome from the community.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Installation -->
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
        Quick Start Guide
      </h2>

      <div class="space-y-8">
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">1. Clone the Repository</h3>
          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4">
            <code class="text-sm text-gray-800 dark:text-gray-200 font-mono">
              git clone https://github.com/romiyusnandar/orion-frontend.git
            </code>
          </div>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">2. Install Dependencies</h3>
          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4">
            <code class="text-sm text-gray-800 dark:text-gray-200 font-mono">
              cd orion-frontend && npm install
            </code>
          </div>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">3. Start Development Server</h3>
          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4">
            <code class="text-sm text-gray-800 dark:text-gray-200 font-mono">
              npm run dev
            </code>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contributing -->
  <section class="py-20 bg-gray-50/50 dark:bg-gray-900/50">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Contributing
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
        We welcome contributions from the community! Whether it's bug fixes, new features, or documentation improvements.
      </p>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div class="text-2xl mb-3">🐛</div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Report Issues</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Found a bug? Let us know on GitHub Issues.</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div class="text-2xl mb-3">🚀</div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Submit PRs</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Contribute code improvements and new features.</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div class="text-2xl mb-3">📖</div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Improve Docs</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Help make our documentation better.</p>
        </div>
      </div>
    </div>
  </section>
</div>
