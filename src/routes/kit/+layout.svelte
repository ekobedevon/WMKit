<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	export let data: any;
	let userData;
	$: userData = data ? data.userData : undefined;
	let characterData;
	$: characterData = data ? data.characterData : undefined;
</script>

<Nav {userData} {characterData}>
	<slot />
</Nav>
