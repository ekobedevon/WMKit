<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	export let data: PageData;

</script>

<form use:enhance method="post" class="">
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">
				This information will be displayed publicly so be careful what you share.
			</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-4">
					<label for="name" class="block text-sm font-medium leading-6 text-gray-900"
						>Character name</label
					>
					<div class="mt-2">
						<div
							class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
						>
							<input
								required
								type="text"
								name="name"
								id="name"
								class=" block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="joe mama"
								value=""
							/>
						</div>
					</div>
					<label for="pronouns" class=" mt-2 block text-sm font-medium leading-6 text-gray-900"
						>Pronouns</label
					>
					<div class="mt-2">
						<div
							class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
						>
							<input
								required
								type="text"
								name="pronouns"
								id="pronouns"
								class=" block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="They/Them"
							/>
						</div>
					</div>

					<div class="col-span-full mt-2">
						<div class="flex flex-col gap-0">
							<label for="about" class=" text-sm font-medium leading-6 text-gray-900">About</label>
							<p class=" text-sm leading-6 text-gray-600">Write a few sentences about them.</p>
						</div>
						<div class="mt-2">
							<textarea
								required
								id="about"
								name="about"
								rows="3"
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							></textarea>
						</div>
					</div>

					<div class=" w-1/4">
						<label for="price" class="block text-sm font-medium leading-6 text-gray-900"
							>level</label
						>
						<div class="relative mt-2 rounded-md shadow-sm">
							<input
								required
								type="number"
								min="1"
								max="100"
								name="level"
								id="level"
								class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value="1"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-6">
			<!-- <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>-->
			<button
				type="submit"
				class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>Submit</button
			>
		</div>
	</div>
</form>
