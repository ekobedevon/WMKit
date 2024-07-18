<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	export let data: any;
	let userData;
	$: userData = data ? data.userData : undefined;
	const characterData = data.characterData;
	console.log(characterData)
</script>

<Nav {userData} {characterData}>
	<slot />
</Nav>
