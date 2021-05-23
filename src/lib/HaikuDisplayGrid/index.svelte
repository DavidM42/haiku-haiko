<script lang="ts">
	import { reloadFirstInGrid } from '$lib/stores';

	import type { Haiku } from 'src/models/haiku';
	import { onMount } from 'svelte';

	let haikus: Haiku[] = [];
	let noMoreExist = false;

	const loadFirstFew = async () => {
		try {
			const response = await fetch('/api/list?limit=15');
			const newHaikus = await response.json();
			// here append them at the front
            const combinedHaikus = newHaikus.concat(haikus);
            const onlyUniqueHaikus = combinedHaikus.filter(
                (v, i, a) => a.findIndex((t) => t.id === v.id) === i
            );
            haikus = onlyUniqueHaikus;
		} catch (e) {
			console.error(e);
		}
	};

	const loadMore = async () => {
		const previousCount = haikus.length;
		try {
			// TODO need to implement older than or something like that
			const response = await fetch('/api/list?limit=50');
			const moreHaikus = await response.json();
			// here append them at the end of existing list
			const combinedHaikus = haikus.concat(moreHaikus);
			// from https://stackoverflow.com/a/64940630
			const onlyUniqueHaikus = combinedHaikus.filter(
				(v, i, a) => a.findIndex((t) => t.id === v.id) === i
			);
			haikus = onlyUniqueHaikus;
			if (haikus.length === previousCount) {
				alert('Keine weiteren verfügbar');
				noMoreExist = true;
			}
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * Converts datestamp into wanted date format
	 * @param dateIn Given date object
	 */
	const getDate = (dateIn: string) => {
		return new Date(dateIn).toLocaleDateString('de-DE');
	};

	/**
	 * Converts datestamp into wanted time format
	 * @param dateIn Given date object
	 */
	const getTime = (dateIn: string) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        // TODO fix typing at some point
        // @ts-ignore
		return new Date(dateIn).toLocaleTimeString('de-DE', options);
	};

	/**
	 * Converts datestamp into combined date and time format
	 * @param dateIn Given date object
	 */
    const getDateTime = (dateIn: string) => {
		return `${getDate(dateIn)}, ${getTime(dateIn)}`;
	};

	onMount(async () => {
		loadFirstFew();
	});

	const unsubscribe = reloadFirstInGrid.subscribe((value) => {
		if (value) {
			loadFirstFew();
			reloadFirstInGrid.set(false);
		}
	});
</script>

<div id="grid">
	{#each haikus as haiku}
    <!-- TODO every few haiku places ad space implementation with gads when domain bought -->
		<div class="haiku">
			<span class="line lineOne">{haiku.lineOne}</span>
			<span class="line lineTwo">{haiku.lineTwo}</span>
			<span class="line lineThree">{haiku.lineThree}</span>
			<span class="creationDate">{getDateTime(String(haiku.createdOn))}</span>
			<!-- <span class="creationDate">{getDate(String(haiku.createdOn))}</span> -->
			<!-- <span class="creationTime">{getTime(String(haiku.createdOn))}</span> -->
			<!-- TODO report button using id in obj to report -->
		</div>
	{/each}
	<button on:click={loadMore} disabled={noMoreExist}>Mehr</button>
</div>

<style lang="scss">
	@import '../../globalStyles/colors.scss';

	#grid {
		display: flex;
		flex-wrap: wrap;
		flex-basis: 20%;
		flex-grow: 1;
		// min-width: 700px;
		width: 100%;
	}

	.haiku {
		background-color: $haiku-card-bg-color;

		max-width: 350px;
		min-width: 250;
		width: 30%;

		margin: 20px;
		padding: 20px;

        @media only screen and (max-width: 768px) {
            width: 100%;
        }

		& > span {
			display: block;

            &.line {
                // bigger space between haiku lines
                line-height: 1.5em;
            }

			&.creationDate {
				margin-top: 20px;
                font-size: 0.75em;
			}
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
		width: 100%;

		&:disabled {
			color: rgb(197, 196, 196);
			border: 1px solid rgb(197, 196, 196);
		}

		&:hover:not(:disabled) {
			background-color: darken($color-accent-text-bg, 10);
		}
	}
</style>
