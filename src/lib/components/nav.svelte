<script lang="ts">
	import Icon from '@iconify/svelte';
	type character = {
		id: string;
		name: string;
		owner: string;
		level: number | null;
		desc: string | null;
		timestamp: Date;
	}[];
	type user = {
		icon: string;
		username: string;
		role: string;
		display: string;
	};
	import Links from './links.svelte';
	export let characterData: any[];
	export let userData: user;
	let show = false;
	type Link = { icon: string; text: string; dest: string };
	const playerLinks: Link[] = [
		{ icon: 'home', text: 'Dashboard', dest: '/kit/home' },
		{ icon: 'calendar', text: 'Calender', dest: '/kit/games' },
		{ icon: 'chat-bubble-left-right', text: 'Posts', dest: '/kit/posts' }
	];
</script>

<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
-->
<div>
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	{#if show}
		<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
			<!--
      Off-canvas menu backdrop, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
			<div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>

			<div class="fixed inset-0 flex">
				<!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      -->
				<div class="relative mr-16 flex w-full max-w-xs flex-1">
					<!--
          Close button, show/hide based on off-canvas menu state.

          Entering: "ease-in-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
					<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
						<button on:click={() => (show = false)} type="button" class="-m-2.5 p-2.5">
							<span class="sr-only">Close sidebar</span>
							<svg
								class="h-6 w-6 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<!-- Sidebar component, swap this element with another sidebar if you like -->
					<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
						<div class="flex h-16 shrink-0 items-center">
							<img
								class="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt="Your Company"
							/>
						</div>
						<nav class="flex flex-1 flex-col">
							<ul role="list" class="flex flex-1 flex-col gap-y-7">
								<li>
									<ul role="list" class="-mx-2 space-y-1">
										{#each playerLinks as link}
											<Links {link} />
										{/each}
									</ul>
								</li>
								<li>
									<div class="">
										<div class="text-xs font-semibold leading-6 text-gray-400">Your Characters</div>
										<a href="/"><span class="new character">new character</span></a>
									</div>
									<ul role="list" class="-mx-2 mt-2 space-y-1">
										{#each characterData as character}
											<li>
												<!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
												<a
													href={`/kit/characters/view/${character.id}`}
													class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
												>
													<span
														class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600"
														>{Array.from(character.name)[0]}</span
													>
													<span class="truncate">{character.name}</span>
												</a>
											</li>
										{/each}
									</ul>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Static sidebar for desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
			<div class="flex h-16 shrink-0 items-center">
				<img
					class="h-8 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
			</div>
			<nav class="flex flex-1 flex-col">
				<ul role="list" class="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" class="-mx-2 space-y-1">
							{#each playerLinks as link}
								<Links {link} />
							{/each}
						</ul>
					</li>
					<li>
						<div class="flex justify-between items-center text-gray-400">
							<div class="text-xs font-semibold leading-6">Your Characters</div>
							<a href="/kit/characters/new" class="hover:text-indigo-600"
								><span class="sr-only">new character</span>
								<Icon icon="heroicons:user-plus" class="text-2xl " />
							</a>
						</div>
						<ul role="list" class="-mx-2 mt-2 space-y-1">
							{#each characterData as character}
								<li>
									<!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
									<a
										href={`/kit/characters/view/${character.id}`}
										class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
									>
										<span
											class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600"
											>{Array.from(character.name)[0]}</span
										>
										<span class="truncate">{character.name}</span>
									</a>
								</li>
							{/each}
						</ul>
					</li>
					<li class="-mx-6 mt-auto flex">
						<a
							href="/kit/profile"
							class=" flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 flex-1"
						>
							<Icon icon={`game-icons:${userData.icon}`} class="text-5xl" />
							<!-- <img
								class="h-8 w-8 rounded-full bg-gray-50"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/> -->
							<span class="sr-only">Your profile</span>
							<span aria-hidden="true" class="">{userData.display}</span>
						</a>
						<a
							href="/auth/signout"
							class=" flex items-center gap-x-4 px-3 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
						>
							<Icon icon={`heroicons:arrow-right-end-on-rectangle`} class="text-4xl" />
							<!-- <img
								class="h-8 w-8 rounded-full bg-gray-50"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/> -->
							<span class="sr-only">Sign Out</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	<div
		class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden"
	>
		<button
			type="button"
			on:click={() => (show = true)}
			class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
		>
			<span class="sr-only">Open sidebar</span>
			<svg
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</button>
		<div class="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
		<a href="/kit/home">
			<span class="sr-only">Your profile</span>
			<img
				class="h-8 w-8 rounded-full bg-gray-50"
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				alt=""
			/>
		</a>
	</div>

	<main class="py-10 lg:pl-72">
		<div class="px-4 sm:px-6 lg:px-8">
			<slot />
		</div>
	</main>
</div>
