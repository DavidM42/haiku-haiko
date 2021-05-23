<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import HaikuInputForm from '$lib/HaikuInputForm/index.svelte';

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		Haiku-Haiko
	</h1>

	<HaikuInputForm on:click="{() => alert('submitted')}"/>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
