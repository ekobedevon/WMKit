<script lang="ts">
	export let data: any;
	import Icon from '@iconify/svelte';
	let current = data.userData.icon;
	import { enhance } from '$app/forms';
	const items = [
		'barbarian',
		'barbute',
		'brutal-helm',
		'cowled',
		'cultist',
		'diablo-skull',
		'vampire-dracula',
		'3d-glasses',
		'dragon-head',
		'dwarf-face',
		'dwarf-helmet',
		'dwarf-king',
		'elf-helmet',
		'executioner-hood',
		'woman-elf-face',
		'fish-monster',
		'goblin-head',
		'golem-head',
		'kenku-head',
		'monk-face',
		'nun-face',
		'ogre',
		'orc-head',
		'overlord-helm',
		'troll',
		'resting-vampire',
		'visored-helm',
		'warlock-hood',
		'wizard-face'
	];
</script>

<form use:enhance method="post">
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">
				This information will be displayed publicly.
			</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-4">
					<label for="display" class="block text-sm font-medium leading-6 text-gray-900"
						>Display</label
					>
					<div class="mt-2">
						<div
							class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
						>
							<input
								type="text"
								name="display"
								id="display"
								class=" block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="joemama"
								bind:value={data.userData.display}
							/>
						</div>
					</div>
					<label for="pronouns" class="mt-2 block text-sm font-medium leading-6 text-gray-900"
						>Pronouns</label
					>
					<div class="mt-2">
						<div
							class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
						>
							<input
								type="text"
								name="pronouns"
								id="pronouns"
								class=" block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="They/Them"
								bind:value={data.userData.pronouns}
							/>
						</div>
					</div>

					<!-- <div class="col-span-full mt-2">
						<div class="flex flex-col gap-0">
							<label for="about" class=" text-sm font-medium leading-6 text-gray-900">About</label>
							<p class=" text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
						</div>
						<div class="mt-2">
							<textarea
								id="about"
								name="about"
								rows="3"
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							></textarea>
						</div>
					</div> -->

					<div class="col-span-full mt-2">
						<label for="icon" class="block text-sm font-medium leading-6 text-gray-900"
							>User Icon</label
						>
						<div class="flex items-center w-1/4 gap-1">
							<Icon icon={`game-icons:${current}`} class="text-7xl " />
							<select
								id="icon"
								name="icon"
								bind:value={current}
								class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
							>
								{#each items as item}
									{#if item !== data.icon}
										<option value={item}>
											{item.replace('-', ' ')}
										</option>
									{:else}
										<option selected value={item}>
											{item.replace('-', ' ')}
										</option>
									{/if}
								{/each}
							</select>
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
				>Save</button
			>
		</div>
	</div>
</form>
