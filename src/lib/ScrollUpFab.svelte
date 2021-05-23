<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte';
    import { faChevronUp }  from '@fortawesome/free-solid-svg-icons';
</script>

<button on:click="{() => window.scrollTo({ top: 0, behavior: 'smooth' })}">
    <Fa icon={faChevronUp}/>
</button>

<style lang="scss">
	@import '../globalStyles/colors.scss';

    button {
        position: fixed !important;
        right: 15px;
        bottom: 15px;

        width: 50px;
        height: 50px;

        border-radius: 50%;
        border: none;
        background-color: $fab-button-color;

        box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);

        &:hover {
            background-color: lighten($fab-button-color, 10)
        }
    }
</style>



