<script lang="ts">
  import logo from '$lib/assets/orion-lg.png'
</script>
<footer class="relative py-16 bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 text-white backdrop-blur-sm border-t border-white/10">
  <!-- Background Effects -->
  <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5"></div>
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>

  <div class="relative max-w-7xl mx-auto px-4">
    <!-- Main Footer Content -->
    <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">

      <!-- Brand Section -->
      <div class="lg:col-span-2 text-center lg:text-left">
        <div class="group mb-6">
          <div class="inline-flex items-center space-x-3 mb-4">
            <div class="relative">
              <div class="relative w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src={logo} />
              </div>
            </div>
            <h3 class="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              OrionOS
            </h3>
          </div>
          <p class="text-gray-300 text-lg mb-4 max-w-md mx-auto lg:mx-0">
            Revolutionizing Android experience with cutting-edge customization, performance optimization, and innovative features.
          </p>

          <!-- Social Links -->
          <div class="flex justify-center lg:justify-start space-x-4">
            <a href="https://github.com/OrionOS-Project" target="_blank" rel="noopener noreferrer"
               class="group relative">
              <div class="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-400/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div class="relative p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group-hover:scale-110">
                <svg class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
            </a>

            <a href="https://t.me/OrionOS_Update" target="_blank" rel="noopener noreferrer"
               class="group relative">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div class="relative p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-300 group-hover:scale-110">
                <svg class="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
            </a>

          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="text-center md:text-left">
        <h4 class="text-lg font-semibold mb-4 text-white">Quick Links</h4>
        <ul class="space-y-3">
          <li>
            <a href="#features" class="group inline-flex items-center text-gray-300 hover:text-cyan-400 transition-all duration-300">
              <svg class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Features
            </a>
          </li>
          <li>
            <a href="#build" class="group inline-flex items-center text-gray-300 hover:text-cyan-400 transition-all duration-300">
              <svg class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Build Guide
            </a>
          </li>
          <li>
            <a href="#donate" class="group inline-flex items-center text-gray-300 hover:text-cyan-400 transition-all duration-300">
              <svg class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Support Us
            </a>
          </li>
        </ul>
      </div>

      <!-- Resources -->
      <div class="text-center md:text-left">
        <h4 class="text-lg font-semibold mb-4 text-white">Resources</h4>
        <ul class="space-y-3">
          <li>
            <a href="https://github.com/OrionOS-Project/android_manifest" target="_blank" rel="noopener noreferrer"
               class="group inline-flex items-center text-gray-300 hover:text-purple-400 transition-all duration-300">
              <svg class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              Source Code
            </a>
          </li>
          <li>
            <a href="/developer" class="group inline-flex items-center text-gray-300 hover:text-purple-400 transition-all duration-300">
              <svg class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Developers
            </a>
          </li>
          <li>
            <a href="https://github.com/OrionOS-Project/android_manifest/blob/main/README.md" target="_blank" rel="noopener noreferrer"
               class="group inline-flex items-center text-gray-300 hover:text-purple-400 transition-all duration-300">
              <svg class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              Documentation
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Divider -->
    <div class="relative mb-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
      <div class="relative flex justify-center">
        <div class="bg-gradient-to-r from-gray-900 via-black to-gray-900 px-6">
          <div class="w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <!-- Copyright and Credits -->
      <div class="text-center md:text-left">
        <div class="text-gray-400 text-sm mb-2 md:mb-0">
          <span>&copy; 2025 OrionOS Project.</span>
        </div>
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-1 text-gray-400 text-sm">
          <span>Made with</span>
          <svg class="w-4 h-4 text-red-500 animate-pulse mx-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span>by</span>
          <span class="font-semibold text-cyan-400">RyuDev</span>
          <span>and</span>
          <span class="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            SvelteKit
          </span>
        </div>
      </div>

      <!-- Links -->
      <div class="flex flex-wrap items-center justify-center gap-3 text-sm">
        <a href="/privacy" class="text-gray-400 hover:text-white transition-colors duration-300 whitespace-nowrap">Privacy Policy</a>
        <span class="text-gray-600 hidden sm:inline">•</span>
        <a href="/terms" class="text-gray-400 hover:text-white transition-colors duration-300 whitespace-nowrap">Terms of Service</a>
        <span class="text-gray-600 hidden sm:inline">•</span>
        <a href="mailto:contact@orionos.org" class="text-gray-400 hover:text-cyan-400 transition-colors duration-300 whitespace-nowrap">Contact</a>
      </div>
    </div>
  </div>
</footer>