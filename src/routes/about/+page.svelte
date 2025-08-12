<script lang="ts">
  import { onMount } from 'svelte';

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>About - Orion Vibe</title>
  <meta name="description" content="Learn about Orion Vibe - the vision, mission, and technology behind this modern web application." />
</svelte:head>

<div class="min-h-screen pt-16">
  <!-- Hero Section -->
  <section class="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
    <div class="max-w-6xl mx-auto px-4">
      <div
        class="text-center transform transition-all duration-1000 ease-out"
        class:translate-y-0={mounted}
        class:opacity-100={mounted}
        class:translate-y-8={!mounted}
        class:opacity-0={!mounted}
      >
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-8 shadow-lg">
          <span class="text-4xl">ℹ️</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          About <span class="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">Orion Vibe</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn more about the vision, mission, and technology behind this modern web application.
        </p>
      </div>
    </div>
  </section>

  <!-- Mission Section -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Our Mission
        </h2>
        <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
          To create a modern, accessible, and performant web experience that showcases the power of
          contemporary web technologies. Orion Vibe represents the perfect harmony between design and functionality,
          providing users with an intuitive and engaging interface while demonstrating best practices in web development.
        </p>
      </div>
    </div>
  </section>

  <!-- Vision & Values -->
  <section class="py-20 bg-gray-50/50 dark:bg-gray-900/50">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
        Vision & Values
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
          <div class="text-4xl mb-4 text-center">🚀</div>
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white text-center">Innovation</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center">
            Pushing the boundaries of what's possible with modern web technologies and exploring new frontiers in user experience.
          </p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
          <div class="text-4xl mb-4 text-center">♿</div>
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white text-center">Accessibility</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center">
            Building inclusive experiences that work for everyone, regardless of their abilities or the devices they use.
          </p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
          <div class="text-4xl mb-4 text-center">⚡</div>
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white text-center">Performance</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center">
            Optimizing every aspect of the application to deliver lightning-fast experiences that delight users.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Technology Stack -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
        Technology Stack
      </h2>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Frontend Technologies</h3>
            <ul class="space-y-3 text-gray-700 dark:text-gray-300">
              <li class="flex items-center space-x-3">
                <span class="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span class="font-medium">SvelteKit</span>
                <span class="text-sm text-gray-500">- Meta-framework for blazing fast performance</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span class="font-medium">TypeScript</span>
                <span class="text-sm text-gray-500">- Type safety and better developer experience</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-3 h-3 bg-cyan-500 rounded-full"></span>
                <span class="font-medium">Tailwind CSS</span>
                <span class="text-sm text-gray-500">- Utility-first CSS framework</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
                <span class="font-medium">Vite</span>
                <span class="text-sm text-gray-500">- Lightning-fast build tool</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Features</h3>
            <ul class="space-y-3 text-gray-700 dark:text-gray-300">
              <li class="flex items-center space-x-3">
                <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                <span class="font-medium">Responsive Design</span>
                <span class="text-sm text-gray-500">- Works perfectly on all devices</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span class="font-medium">Dark/Light Theme</span>
                <span class="text-sm text-gray-500">- Automatic and manual theme switching</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-3 h-3 bg-red-500 rounded-full"></span>
                <span class="font-medium">Glass Morphism</span>
                <span class="text-sm text-gray-500">- Modern frosted glass effects</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-3 h-3 bg-indigo-500 rounded-full"></span>
                <span class="font-medium">Smooth Animations</span>
                <span class="text-sm text-gray-500">- Buttery smooth transitions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Project Goals -->
  <section class="py-20 bg-gray-50/50 dark:bg-gray-900/50">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
        Project Goals
      </h2>

      <div class="space-y-8">
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              1
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Showcase Modern Web Technologies</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Demonstrate the capabilities of cutting-edge web technologies like SvelteKit, TypeScript, and modern CSS techniques.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              2
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Provide Learning Resource</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Serve as a reference implementation for developers learning modern web development practices and patterns.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              3
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Inspire Innovation</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Encourage other developers to push the boundaries of what's possible with modern web technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Future Roadmap -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
        Future Roadmap
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-center mb-3">
            <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
            <span class="text-sm font-medium text-green-600 dark:text-green-400">Completed</span>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Core Features</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Responsive design, theme switching, glass morphism effects</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-center mb-3">
            <span class="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
            <span class="text-sm font-medium text-blue-600 dark:text-blue-400">In Progress</span>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Enhanced Animations</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Advanced micro-interactions and page transitions</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-center mb-3">
            <span class="w-3 h-3 bg-gray-400 rounded-full mr-3"></span>
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Planned</span>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Accessibility Audit</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Comprehensive accessibility testing and improvements</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-center mb-3">
            <span class="w-3 h-3 bg-gray-400 rounded-full mr-3"></span>
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Planned</span>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Performance Optimization</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Advanced performance monitoring and optimization</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-center mb-3">
            <span class="w-3 h-3 bg-gray-400 rounded-full mr-3"></span>
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Future</span>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Interactive Elements</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Advanced interactive components and features</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-center mb-3">
            <span class="w-3 h-3 bg-gray-400 rounded-full mr-3"></span>
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Future</span>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Comprehensive documentation and tutorials</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="py-20 bg-gray-50/50 dark:bg-gray-900/50">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Get Involved
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
        Interested in contributing to the project or have questions? We'd love to hear from you!
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="/source"
          class="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <span>📦</span>
          <span class="ml-2">View Source Code</span>
        </a>

        <a
          href="/developer"
          class="inline-flex items-center px-8 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transform hover:scale-105 transition-all duration-200"
        >
          <span>👨‍💻</span>
          <span class="ml-2">Meet the Developer</span>
        </a>
      </div>
    </div>
  </section>
</div>
