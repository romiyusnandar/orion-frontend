<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
	<div class="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
		<a href="/" class="font-semibold">Orion<span class="text-cyan-600">OS<span/>.</a>
		<ThemeToggle />
	</div>
</header>

<main class="mx-auto max-w-5xl px-4 py-6">
	{@render children?.()}

</main>
