<script lang='ts'>
	import Nav from "$lib/components/nav.svelte";
	export let data:any
	let userData
	$: userData = data ? data : undefined
</script>

<Nav {userData}>
	<slot />
</Nav>
