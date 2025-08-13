<script lang="ts">
  import Hero from '$lib/components/home/Hero.svelte';
  import Features from '$lib/components/home/Features.svelte';
  import Donate from '$lib/components/home/Donate.svelte';
  import Build from '$lib/components/home/Build.svelte';

</script>

<svelte:head>
  <title>OrionOS - Better Your Android</title>
  <meta name="description" content="Experience the future of web development with Orion Vibe - a modern, responsive, and beautiful web application." />
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- OrionOS Features Section -->
<Features />

<!-- Donation Section -->
<Donate />

<!-- Build OrionOS Section -->
<Build />
