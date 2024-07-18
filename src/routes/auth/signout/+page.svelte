<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form
	method="post"
	use:enhance
	class=" w-full min-h-full flex flex-col justify-center items-center text-center h-96 gap-8"
>
	<h1 class="font-bold text-4xl">Confirm Signout</h1>
	<div class="flex gap-4">
		<button
			class="w-32 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			>Sign out</button
		>
		<a
			href="/kit"
			class="w-32 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			>Nevermind</a
		>
	</div>
</form>
