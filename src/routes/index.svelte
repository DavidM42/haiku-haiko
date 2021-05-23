<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import HaikuInputForm from '$lib/HaikuInputForm/index.svelte';
	import HaikuDisplayGrid from '$lib/HaikuDisplayGrid/index.svelte';
	import ScrollUpFab from '$lib/ScrollUpFab.svelte';
	import { reloadFirstInGrid } from '$lib/stores';

	let writeAlertMessage: string = '';

	const submitHaiku = async (ev) => {
		// post to backend
		try {
			const response = await fetch('/api/create', {
				method: 'POST',
				body: JSON.stringify(ev.detail)
			});
			if (response.ok) {
				writeAlertMessage = 'Haiku gespeichert';
				reloadFirstInGrid.set(true);
			}
			console.log(response);
		} catch (e) {
			console.error(e);
			writeAlertMessage = 'Fehler beim speichern aufgetreten';
		}
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>Haiku-Haiko</h1>

	<HaikuInputForm
		bind:alertMessage={writeAlertMessage}
		on:submit={submitHaiku}
	/>
</section>

<section id="grid-section">
	<HaikuDisplayGrid/>
</section>

<ScrollUpFab/>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	#grid-section {
		margin-top: 15vh;
	}

	h1 {
		width: 100%;
	}
</style>
