<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { groupProjectsByTags, projects } from '$data/projects';
	import asciiScarecrow from '$lib/assets/ascii/scarecrow.txt?raw';
	import asciiExperiment from '$lib/assets/ascii/experiment.txt?raw';
	import { Ascii } from '$lib/components/ascii';
	import { Breadcrumbs, defineCrumbs } from '$lib/components/breadcrumbs';
	import { PageMetadata } from '$lib/components/page-metadata';

	import ogImage from './og.jpg?url';

	const crumbs = defineCrumbs([
		{ name: 'vnphanquang.com', label: 'quang', path: '/' },
		{ name: 'Projects', label: 'projects', path: page.url.pathname },
	]);

	const projectGroups = groupProjectsByTags(projects, ['svelte', 'unified', 'css']);
</script>

<PageMetadata
	breadcrumbs={crumbs}
	metadata={{
		title: 'Latest Experiments | vnphanquang',
		description: 'test tube number 1, 2, 3, and boom!',
		og: {
			title: 'Latest Experiments',
			image: {
				src: ogImage,
				alt: '',
			},
		},
	}}
/>

{#snippet listing(projects: Project[])}
	<ul class="desktop:grid-cols-2 grid gap-3">
		{#each projects as project (project.name)}
			{const tags = project.tags}
			<li>
				<article class="border-fill-200 bg-fill-50 relative flex h-full flex-col gap-3 border p-4">
					<h3>
						<a class="c-link-preserved relative text-xl font-bold" href={project.url} data-external>
							{project.name}
						</a>
					</h3>
					<p class={['text-sm', !tags.length && 'mbe-auto']}>{project.description}</p>
					{#if tags.length}
						<ul class="mbs-auto flex flex-wrap gap-2">
							{#each tags as tag (tag)}
								<li>
									<!-- implement category filter pages based on these tags -->
									<p class="border-stroke-200 rounded-full border px-3 py-1 text-sm leading-none">
										{tag}
									</p>
								</li>
							{/each}
						</ul>
					{/if}
					<div
						class="border-bs-fill-200 flex flex-wrap items-center justify-between gap-2 border-bs pbs-2"
					>
						{#if project.blog}
							<a class="c-link-lazy flex items-center gap-1" href={project.blog}>
								<i class="i i-[ph--newspaper-clipping]"></i>
								Read more
							</a>
						{/if}
						<a class="c-link-lazy ms-auto" href={project.url} data-external>
							See project
							<i class="i i-[ph--arrow-right]"></i>
						</a>
					</div>
				</article>
			</li>
		{/each}
	</ul>
{/snippet}

<main class="max-w-pad mobile:flex-col flex flex-1 gap-20 py-10">
	<div class="tablet:space-y-16 w-full flex-1 space-y-10">
		<div>
			<h1 class="tablet:text-4xl font-quang border-b text-3xl font-bold">latest experiments</h1>
			<p class="text-right text-sm leading-relaxed italic">
				some stuff i am involved in, created, or maintained
			</p>
		</div>

		{#if projectGroups.svelte.length}
			<section class="space-y-4">
				<div class="text-stroke-200 flex items-center gap-4">
					<h2 class="tablet:text-5xl text-3xl font-bold tracking-wider uppercase">
						<a class="text-svelte" href="https://svelte.dev">Svelte</a>
						Ecosystem
					</h2>
				</div>
				{@render listing(projectGroups.svelte)}
				<p>
					Read more about experiments with Svelte in the
					<a class="c-link" href="https://www.sveltevietnam.dev/en/people/vnphanquang">
						Svelte Vietnam Blog
					</a>.
				</p>
			</section>
		{/if}

		{#if projectGroups.unified.length}
			<section class="space-y-4">
				<div class="text-stroke-200 flex items-center gap-4">
					<h2 class="tablet:text-4xl desktop:text-5xl text-3xl font-bold tracking-wider uppercase">
						<a class="text-[#3aa4ff]" href="https://unifiedjs.com/">Unified</a> Ecosystem
					</h2>
				</div>
				{@render listing(projectGroups.unified)}
			</section>
		{/if}

		{#if projectGroups.css.length}
			<section class="space-y-4">
				<div class="text-stroke-200 flex items-center gap-4">
					<h2 class="tablet:text-4xl desktop:text-5xl text-3xl font-bold tracking-wider uppercase">
						CSS
					</h2>
				</div>
				{@render listing(projectGroups.css)}
			</section>
		{/if}

		{#if projectGroups.misc.length}
			<section class="space-y-4">
				<div class="text-stroke-200 flex items-center gap-4">
					<h2 class="tablet:text-4xl desktop:text-5xl text-3xl font-bold tracking-wider uppercase">
						Miscellaneous
					</h2>
				</div>
				{@render listing(projectGroups.misc)}
			</section>
		{/if}

		<div class="flex items-end justify-between">
			<Breadcrumbs.List class="mbs-10" {crumbs} />
			<a class="c-link-lazy" href="https://youtu.be/Y5EQTkwMByg?si=CZI0QrumQEGLNLUW">
				<Ascii class="text-[0.05rem] opacity-75">{asciiExperiment}</Ascii>
				<span class="sr-only">The iodine clock reaction</span>
			</a>
		</div>
	</div>

	<div class="tablet:sticky inset-bs-10 mbs-10 flex h-fit flex-col items-center">
		<Ascii class="text-[0.4rem] tracking-wide">{asciiScarecrow}</Ascii>
		<p class="text-center text-sm">sometimes, i crow; sometimes, i'm scared</p>
	</div>
</main>
