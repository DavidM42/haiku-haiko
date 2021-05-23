<script lang="ts">
	import { fade } from 'svelte/transition';

	import { countSyllables } from './../../logic/hyphenation';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let lineOne: string;
	let lineTwo: string;
	let lineThree: string;

	let countLineOne: number = 0;
	let countLineTwo: number = 0;
	let countLineThree: number = 0;

	export let alertMessage: string;

	const zeroAll = () => {
		lineOne = '';
		lineTwo = '';
		lineThree = '';
		countLineOne = 0;
		countLineTwo = 0;
		countLineThree = 0;
	};

	const lineChange = async (event) => {
		alertMessage = '';
		const count = await countSyllables(event.target.value);
		switch (event.target.id) {
			case 'lineOne':
				countLineOne = count;
				break;
			case 'lineTwo':
				countLineTwo = count;
				break;
			case 'lineThree':
				countLineThree = count;
				break;
		}
	};

	const verifySyllableCount = async () => {
		const countOne = await countSyllables(lineOne);
		const countTwo = await countSyllables(lineTwo);
		const countThree = await countSyllables(lineThree);
		return countOne && countTwo & countThree;
	};

	const submit = async () => {
		const isAllowed = await verifySyllableCount();

		if (!isAllowed) {
			alertMessage = 'Silbenanzahl ist inkorrekt. Prüfe sie vor dem absenden!';
			return;
		} else {
			alertMessage = '';
		}

		dispatch('submit', {
			lineOne: lineOne,
			lineTwo: lineTwo,
			lineThree: lineThree
		});
		zeroAll();
	};
</script>

<div id="form">
	{#if !!alertMessage}
		<div class="alert" in:fade out:fade>
			{alertMessage}
		</div>
	{/if}
	<div class="five">
		<span class="syllable-nr wanted">5</span>
		<span class="syllable-nr is count-{countLineOne}">{countLineOne}</span>
		<input id="lineOne" bind:value={lineOne} on:input={lineChange} />
	</div>
	<div class="seven">
		<span class="syllable-nr wanted">7</span>
		<span class="syllable-nr is count-{countLineTwo}">{countLineTwo}</span>
		<input id="lineTwo" bind:value={lineTwo} on:input={lineChange} />
	</div>
	<div class="five">
		<span class="syllable-nr wanted">5</span>
		<span class="syllable-nr is count-{countLineThree}">{countLineThree}</span>
		<input id="lineThree" bind:value={lineThree} on:input={lineChange} />
	</div>
	<button on:click={submit}>Absenden</button>
</div>

<style lang="scss">
	@import '../../globalStyles/colors.scss';

	#form {
		display: flex;
		flex-direction: column;
		// only works on desktop
		// min-width: 700px;
		min-width: 60vw;
	}

	.alert {
		width: 100%;
		font-size: 1.2em;
		background-color: $color-accent-text-bg;
		color: $color-accent-text;
		margin-bottom: 20px;
		padding: 20px;
	}

	.syllable-nr {
		&.wanted {
			color: $color-accent-text;
			// background-color: $color-accent-text-bg;
		}

		&.is {
			background-color: $color-accent-text-bg;
		}

		font-size: 1.5em;
		margin-right: 10px;
		padding: 7px;
		border-radius: 10px;
	}

	.five {
		& > input {
			@media only screen and (min-width: 768px) {
				// on desktop
				width: 100%;
				max-width: 250px;
			}
			@media only screen and (max-width: 768px) {
				// on mobile
				width: 45%;
			}
		}
		& > .syllable-nr.is {
			color: $wrong-text-color;

			&.count-5 {
				color: $correct-text-color;
			}
		}
	}

	.seven {
		& > input {
			@media only screen and (min-width: 768px) {
				// on desktop
				width: 100%;
				max-width: 459px;
			}
			@media only screen and (max-width: 768px) {
				// on mobile
				width: 60%;
			}
		}

		& > .syllable-nr.is {
			color: $wrong-text-color;

			&.count-7 {
				color: $correct-text-color;
			}
		}
	}

	input {
		@media only screen and (min-width: 768px) {
			// bigger font on desktop
			font-size: 1.15em;
		}

		background-color: $color-accent-text-bg;
		color: $color-accent-text;

		border-radius: 0px;
		border: none;
		margin: 5px 0px;
		padding: 10px;

		&:hover {
			background-color: darken($color-accent-text-bg, 10);
		}

		&:focus-visible {
			// firefox you suck sometimes
			-moz-outline-radius: 0px;
			outline-style: solid;
		}
	}

	button {
		margin-top: 15px;
		border: none;
		padding: 5px 0px;
		font-size: 1.5em;
		color: $color-accent-text;
		background-color: $color-accent-text-bg;
		border: 2px solid $color-accent-text;

		&:hover {
			background-color: darken($color-accent-text-bg, 10);
		}
	}
</style>
