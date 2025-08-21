<script lang="ts">
	import '../app.css';
    import '@fontsource/poppins';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
    import MoleculeBackground from '$lib/components/MoleculeBackground.svelte';
    import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

<main class="relative min-h-screen">
    <MoleculeBackground />
    <div class="relative z-10 mx-auto max-w-7xl px-1 py-4 md:px-4 md:py-6">
        {@render children?.()}
    </div>
</main>

<Footer />
