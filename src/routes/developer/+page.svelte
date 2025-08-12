<script lang="ts">
  import { onMount } from 'svelte';

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Developer - Orion Vibe</title>
  <meta name="description" content="Meet the developer behind Orion Vibe - passionate about creating exceptional web experiences." />
</svelte:head>

<div class="min-h-screen pt-16">
  <!-- Hero Section -->
  <section class="py-20 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-6xl mx-auto px-4">
      <div
        class="text-center transform transition-all duration-1000 ease-out"
        class:translate-y-0={mounted}
        class:opacity-100={mounted}
        class:translate-y-8={!mounted}
        class:opacity-0={!mounted}
      >
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-8 shadow-lg">
          <span class="text-4xl">👨‍💻</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Meet the <span class="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Developer</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Passionate about creating exceptional web experiences with modern technologies and best practices.
        </p>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-8">
          <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              I'm a passionate full-stack developer with expertise in modern web technologies.
              I believe in writing clean, maintainable code that not only works flawlessly but also provides
              an exceptional user experience.
            </p>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Every project I work on is crafted with purpose and attention to detail,
              focusing on performance, accessibility, and user-centered design.
            </p>
          </div>
        </div>

        <div class="space-y-8">
          <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Skills & Expertise</h3>
            <div class="grid grid-cols-2 gap-6">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-lg">⚡</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">SvelteKit</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Advanced</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-lg">🎨</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Tailwind CSS</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Expert</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-lg">📱</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Responsive Design</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Expert</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-lg">🚀</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Performance</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Advanced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Philosophy Section -->
  <section class="py-20 bg-gray-50/50 dark:bg-gray-900/50">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Development Philosophy
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
          <div class="text-4xl mb-4">🎯</div>
          <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">User-Centered</h3>
          <p class="text-gray-600 dark:text-gray-300">Every decision is made with the end user in mind, ensuring intuitive and accessible experiences.</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
          <div class="text-4xl mb-4">⚡</div>
          <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Performance First</h3>
          <p class="text-gray-600 dark:text-gray-300">Optimized code and efficient algorithms to deliver lightning-fast experiences.</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
          <div class="text-4xl mb-4">🔧</div>
          <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Clean Code</h3>
          <p class="text-gray-600 dark:text-gray-300">Maintainable, scalable code that follows best practices and industry standards.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Let's Connect
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
        Interested in collaboration or have a project in mind? Let's build something amazing together.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="mailto:contact@orion-vibe.dev"
          class="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <span>📧</span>
          <span class="ml-2">Get In Touch</span>
        </a>

        <a
          href="https://github.com/romiyusnandar"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-8 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transform hover:scale-105 transition-all duration-200"
        >
          <span>🐙</span>
          <span class="ml-2">View GitHub</span>
        </a>
      </div>
    </div>
  </section>
</div>
