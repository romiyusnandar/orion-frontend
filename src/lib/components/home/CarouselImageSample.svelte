<script lang="ts">
  import { onMount } from 'svelte';

  type UiSample = {
    id: string | number;
    name: string;
    url: string;
    description?: string;
    category?: string;
  };

  type ApiResponse = {
    success: boolean;
    data: UiSample[];
    message?: string;
  };

  let samples = $state<UiSample[]>([]);
  let currentIndex = $state(0);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let autoPlayTimer: number;

  const AUTO_PLAY_INTERVAL = 5000; // 5 seconds

  const hasMultipleSlides = $derived(samples.length > 1);

  async function loadSamples() {
    try {
      isLoading = true;
      error = null;

      const response = await fetch('https://orionos-api.onrender.com/api/v1/ui-samples');

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const result: ApiResponse = await response.json();

      if (result.success && result.data) {
        samples = result.data.filter(item =>
          item.url &&
          (item.url.startsWith('http://') || item.url.startsWith('https://'))
        );
      } else {
        throw new Error(result.message || 'Failed to load UI samples');
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load UI samples';
      console.error('Error loading UI samples:', err);
    } finally {
      isLoading = false;
    }
  }

  function goToSlide(index: number) {
    if (index >= 0 && index < samples.length) {
      currentIndex = index;
      resetAutoPlay();
    }
  }

  function nextSlide() {
    if (hasMultipleSlides) {
      currentIndex = (currentIndex + 1) % samples.length;
      resetAutoPlay();
    }
  }

  function prevSlide() {
    if (hasMultipleSlides) {
      currentIndex = currentIndex === 0 ? samples.length - 1 : currentIndex - 1;
      resetAutoPlay();
    }
  }

  function startAutoPlay() {
    if (hasMultipleSlides) {
      autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_INTERVAL) as unknown as number;
    }
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  function handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/src/lib/assets/orion-fw.png'; // Fallback image
  }

  // Lifecycle
  onMount(() => {
    loadSamples();

    return () => {
      stopAutoPlay();
    };
  });

  $effect(() => {
    if (samples.length > 0) {
      startAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  });
</script>

<!-- Carousel Container -->
<div class="w-full h-full">
  {#if isLoading}
    <!-- Loading State -->
    <div class="w-full h-full flex items-center justify-center">
      <div class="flex flex-col items-center space-y-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        <p class="text-gray-600 dark:text-gray-300 text-sm">Loading preview UI...</p>
      </div>
    </div>
  {:else if error}
    <!-- Error State -->
    <div class="w-full h-full flex items-center justify-center">
      <div class="text-center">
        <div class="text-red-500 mb-2">
          <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <p class="text-red-600 dark:text-red-400 text-sm mb-2">Failed to load</p>
        <button
          onclick={loadSamples}
          class="text-xs px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    </div>
  {:else if samples.length === 0}
    <!-- Empty State -->
    <div class="w-full h-full flex items-center justify-center">
      <div class="text-center">
        <div class="text-gray-400 mb-2">
          <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">No preview available</p>
      </div>
    </div>
  {:else}
    <!-- Carousel -->
    <div
      class="relative w-full h-full overflow-hidden"
      onmouseenter={stopAutoPlay}
      onmouseleave={startAutoPlay}
      role="region"
      aria-label="UI Samples Carousel"
    >
      <!-- Main Carousel Container -->
      <div class="relative w-full h-full">
        <!-- Slides Container -->
        <div class="relative w-full h-full overflow-hidden">
          <div
            class="flex w-full h-full transition-transform duration-500 ease-in-out"
            style="transform: translateX(-{currentIndex * 100}%)"
          >
            {#each samples as sample, index (sample.id)}
              <div class="flex-shrink-0 w-full h-full">
                <div class="w-full h-full flex items-center justify-center">
                  <img
                    src={sample.url}
                    alt={sample.name}
                    class="max-w-full max-h-full object-contain"
                    loading="lazy"
                    onerror={handleImageError}
                  />

                  <!-- Glass overlay with sample info - positioned at bottom -->
                  {#if sample.name}
                    <div class="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-2">
                      <div class="text-center">
                        <h3 class="text-white text-xs font-medium truncate">
                          {sample.name}
                        </h3>
                        {#if sample.category}
                          <span class="inline-block mt-1 px-2 py-0.5 bg-cyan-500/30 text-cyan-100 rounded-full text-xs">
                            {sample.category}
                          </span>
                        {/if}
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Navigation Arrows -->
        {#if hasMultipleSlides}
          <button
            onclick={prevSlide}
            class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-600 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Previous slide"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            onclick={nextSlide}
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-600 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Next slide"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>