<script lang="ts">
  import { onMount } from 'svelte';

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });

  function copyToClipboard(text: string, buttonElement: HTMLButtonElement) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = buttonElement.innerHTML;
      buttonElement.innerHTML = '<span>✅</span><span class="ml-2">Copied!</span>';
      setTimeout(() => {
        buttonElement.innerHTML = originalText;
      }, 2000);
    });
  }
</script>

<svelte:head>
  <title>Download - Orion Vibe</title>
  <meta name="description" content="Download and get started with Orion Vibe. Multiple installation options available." />
</svelte:head>

<div class="min-h-screen pt-16">
  <!-- Hero Section -->
  <section class="py-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-900">
    <div class="max-w-6xl mx-auto px-4">
      <div
        class="text-center transform transition-all duration-1000 ease-out"
        class:translate-y-0={mounted}
        class:opacity-100={mounted}
        class:translate-y-8={!mounted}
        class:opacity-0={!mounted}
      >
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-8 shadow-lg">
          <span class="text-4xl">⬇️</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Get Started <span class="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Today</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose your preferred way to get started with Orion Vibe. Multiple installation options available.
        </p>
      </div>
    </div>
  </section>

  <!-- Download Options -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Download Options
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Pick the method that works best for your development workflow.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 mb-16">
        <!-- Git Clone -->
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Clone Repository</h3>
              <p class="text-gray-600 dark:text-gray-400">Get the latest source code directly from GitHub</p>
            </div>
          </div>

          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-6">
            <code class="text-sm text-gray-800 dark:text-gray-200 font-mono break-all">
              git clone https://github.com/romiyusnandar/orion-frontend.git
            </code>
          </div>

          <button
            onclick={(e) => copyToClipboard('git clone https://github.com/romiyusnandar/orion-frontend.git', e.currentTarget)}
            class="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 font-semibold w-full justify-center"
          >
            <span>📋</span>
            <span class="ml-2">Copy Git Command</span>
          </button>
        </div>

        <!-- NPM Create -->
        <div class="bg-gradient-to-br from-emerald-500/10 to-green-600/10 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 shadow-lg">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
              <span class="text-white text-xl font-bold">N</span>
            </div>
            <div>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">NPM Template</h3>
              <p class="text-gray-600 dark:text-gray-400">Quick start with SvelteKit template</p>
            </div>
          </div>

          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-6">
            <code class="text-sm text-gray-800 dark:text-gray-200 font-mono break-all">
              npm create svelte@latest my-orion-app
            </code>
          </div>

          <button
            onclick={(e) => copyToClipboard('npm create svelte@latest my-orion-app', e.currentTarget)}
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg font-semibold w-full justify-center"
          >
            <span>🚀</span>
            <span class="ml-2">Copy NPM Command</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Installation Steps -->
  <section class="py-20 bg-gray-50/50 dark:bg-gray-900/50">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
        Installation Steps
      </h2>

      <div class="space-y-8">
        <!-- Step 1 -->
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              1
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Clone or Download</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Choose your preferred method to get the source code on your local machine.
              </p>
              <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-3">
                <code class="text-sm text-gray-800 dark:text-gray-200 font-mono">
                  git clone https://github.com/romiyusnandar/orion-frontend.git
                </code>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              2
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Navigate to Directory</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Change into the project directory to start working with the code.
              </p>
              <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-3">
                <code class="text-sm text-gray-800 dark:text-gray-200 font-mono">
                  cd orion-frontend
                </code>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              3
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Install Dependencies</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Install all required packages and dependencies for the project.
              </p>
              <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-3">
                <code class="text-sm text-gray-800 dark:text-gray-200 font-mono">
                  npm install
                </code>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              4
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Start Development Server</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Launch the development server and start building amazing things!
              </p>
              <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-3">
                <code class="text-sm text-gray-800 dark:text-gray-200 font-mono">
                  npm run dev
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Requirements -->
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
        System Requirements
      </h2>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Minimum Requirements</h3>
          <ul class="space-y-3 text-gray-600 dark:text-gray-300">
            <li class="flex items-center">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Node.js 18.0 or higher
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              npm 8.0 or higher
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Modern web browser
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Git (for cloning)
            </li>
          </ul>
        </div>

        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recommended</h3>
          <ul class="space-y-3 text-gray-600 dark:text-gray-300">
            <li class="flex items-center">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Node.js 20.0 LTS
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              npm 10.0 or higher
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              VS Code with Svelte extension
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              TypeScript knowledge
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Quick Links -->
  <section class="py-20 bg-gray-50/50 dark:bg-gray-900/50">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Next Steps
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
        After installation, explore these resources to get the most out of Orion Vibe.
      </p>

      <div class="grid md:grid-cols-3 gap-6">
        <a
          href="/developer"
          class="block bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
        >
          <div class="text-2xl mb-3">👨‍💻</div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Meet Developer</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Learn about the person behind the project.</p>
        </a>

        <a
          href="/source"
          class="block bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
        >
          <div class="text-2xl mb-3">📦</div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Source Code</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Explore the open source codebase.</p>
        </a>

        <a
          href="/about"
          class="block bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
        >
          <div class="text-2xl mb-3">ℹ️</div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">About Project</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Learn more about the project vision.</p>
        </a>
      </div>
    </div>
  </section>
</div>
