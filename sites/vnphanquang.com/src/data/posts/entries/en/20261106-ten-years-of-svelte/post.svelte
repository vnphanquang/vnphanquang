<script lang="ts" module>
	import { markdown } from '@vnphanquang/markdown/svelte';

	import { defineBlogPostMetadata } from '#data/posts/definition';
	import { Ascii } from '#lib/components/ascii';

	import banhMi from './includes/ascii/banh-mi.txt?raw';

	export const metadata = defineBlogPostMetadata({
		title: 'Svelte, Web, Community, and AI',
		description:
			'Celebrating ten years of Svelte - looking back at my personal journey with Svelte and contemplating about my place in its community',
		keywords: 'svelte, web, community, ai, javascript, oss',
		publishedAt: new Date('2026-11-06'),
		tags: ['svelte', 'community'],
		codeless: true,
		numWords: 2450,
		readMinutes: 10,
		standardSite: 'at://did:plc:vdzlwjjqp5kpce2kxqyoa467/site.standard.document/3mznagy6iksae',
		// blueskyPost: {
		// 	accountId: 'did:plc:vdzlwjjqp5kpce2kxqyoa467',
		// 	postId: '...',
		// },
	});
</script>

{markdown`
[Svelte Summit] 2026 is happening on Nov 19th in Ljubljana. People are gathering to celebrate the
10th anniversary and to talk about all things Svelte. Stop by and say hi if you can. As with
any previous Summit, however, i will not be joining the event in person. The ticket and travel cost
is likely more than _a year worth of rent_; that alone is too much for me to justify the trip.

Let me instead take this celebratory moment to reflect on what Svelte has been from my personal
lens, and to share my hopes for the future of Svelte and its community.

## TL;DR

The web is good. Build software in collaboration, by and for people. Keep the community alive.
And as always, let's be bold. Please and thank you!

## Svelte & a Better Web

Ten years of anything is a long time for a human lifespan. It feels even longer in software, where
time can perhaps be measured in frameworks and runtimes:
`}

<iframe
	class="border-onehalf aspect-video h-auto w-full"
	src="https://dayssincelastframework.js.org/"
	title="Days Since Last JS Framework"
></iframe>

{markdown`
i have been along for the Svelte ride since late 2020. A lot of things in the ecosystem have changed
since then. For once, frontend frameworks have converged on a common set of primitives, e.g. using [Vite]
as the build tool or [signal](https://svelte.dev/blog/runes) as a fine-grained reactivity
model. The web continues to evolve: more native APIs are hitting baseline across
browsers, improving consistency and accessibility, sometimes even making an entire library or
framework feature redundant. Since the advent of Generative AI, some people have also cared less
about the how - syntax, flavor, design principles, etc. - and more about the end result. All of
these beg the question: why care about Svelte at all in 2026?

For me, the answer has always been this: the web would not be what it is today without Svelte.
Remember this [bearded dude][rich] introducing [Svelte
3](https://svelte.dev/blog/svelte-3-rethinking-reactivity)?

![The famous talk by Rich Harris titled "Rethinking Reactivity"](https://youtube.com/embed/AdNJ3fydeao?si=6Rqu68Dmt5y_8g7u)

Svelte has continuously pushed forward not only novel ideas, but also real material improvements to
the web.

## Daring to Be More

i could recall a time when it would quickly turn into a heated debate if someone dared to bring up
the discussion of whether React was a framework or just a library. i would not observe the same
particular (and peculiar) level of _passion_ around Svelte. On the contrary really, Svelte does not
shy away from **being more**:

> I want us to dream bigger [...]. Even if it turns out to be unachievable, I find it valuable to
> ask the question 'what would it take for SvelteKit to be the best framework for any app?'
>
> -- Rich Harris, [Tenets]

Svelte has consistently offered me a better alternative to build softwares. For the
first time ever, i didn't feel like i was fighting my tools to get things done. Svelte compiler
and its [preprocessor API](https://svelte.dev/docs/svelte/svelte-compiler#preprocess) allow me to
adapt to my own needs. The builtin accessibility warnings remind me to not be lazy at the cost of
usability. Runtime abstraction via [actions][svelte.action] or [attachments][svelte.attach] allows
good encapsulation with familiar Web APIs and resuable patterns for progressive enhancement.
First-party support for Typescript, fine-grained reactivity, and utilities for motion and state
management together save so so much time. And, of course, SvelteKit connects the dots and provides
a solid foundation for building fullstack applications with a unified experience.

Svelte and the community around it have helped the web feel like a more welcoming place for users.
And who are the first users to any system if not the developers that build it.

Perhaps most importantly, it does not seem like all these Svelte's bells and whistles were implemented
just to piss off the competition: they are built in collaboration. The same level of flexibility in
Svelte would not be possible without [Vite], for example. It has been a joy to witness the open
source community across the framework boundary come together and build towards consensus and
interopability. Since forever, Svelte maintainers have come from Vite, Vue, Astro, etc. For what
it's worth, many of the praise i give Svelte here may as well be given to other frameworks nowadays;
it may just be that i came across Svelte at the right time and right place, and have stuck around
ever since.

So, call Svelte whatever you like - a framework, a compiler, a language, a
[banh mi](https://en.wikipedia.org/wiki/B%C3%A1nh_m%C3%AC) of deliciously fresh ideas and balanced
flavors - and chances are it would be correct. What matters is, Svelte is an experiment worth doing
because we all want the web to succeed. And i am glad that this Svelte experiment is still being
conducted with care and enthusiasm.
`}

<Ascii class="tablet:text-[0.3cqi] mx-auto my-10 w-fit text-[0.5cqi]">{banhMi}</Ascii>

{markdown`
## Community at Heart

At first, Svelte was something to dream out of. Noone around me knew about it; nobody was hiring for
Svelte. Not many jobs are available today either; one of the most popular dedicated job board,
[SvelteJobs], has closed down due to recent development in the industry that further limited the demand
for a Svelte-focused role. From experiments to side projects to real professional gigs, however, i
have been lucky enough to use Svelte in my actual work. It would not be possible had i not stuck
around for a little while. At times, Svelte was hyped up a lot, mostly in comparison with React. But
i didn't stay because of the hype. It was because of the community.

"What's this, a UI framework built from the lab of a newsroom?" was probably my first reaction to
Svelte. It was a breadth of fresh air to encounter a new framework in the form of a practical tool
and not as an engineering marvel of sophisticated paradigms. Lurking around this relatively new Svelte
space, i saw people from all sorts of backgrounds; they celebrated Svelte not necessarily because it
was the best technical achievement but because it allowed building things with an unprecedented level
of comfort. As someone that didn't come from a computer science background, i felt a sense of belonging.

Whether intended or not by the core team, community building seemed to be one of the major focuses
early on. [Svelte Society][svelte.society] has been around for as long as i remember, organising
[Svelte Summit][svelte.summit] and [Svelte Hackathon][svelte.hackathon]. [Svelte Sirens][svelte.sirens]
supports voices from women, non-binary people, and allies. The same people behind those groups also
hosted [Svelte Radio][svelte.radio] and helped maintain the official [Svelte Discord][svelte.discord]
that branches out to local communities all around the world. Community-built sites such as
[Made of Svelte] or [Best of Svelte] showcase usage of Svelte and help boost visibility for less
popular projects.

> People of Svelte - a mosaic of diverse voices
>
> -- [Thuyet (Tia)](https://bsky.app/profile/tia-nguyen.bsky.social), from the
> [People of Svelte](https://www.sveltevietnam.dev/en/blog/series/people-of-svelte) community initative

Perhaps thanks to the inherently high tolerance level of the community, and much to the moderation
efforts by volunteering members, Svelte forums seem much healthier than some other digital spaces.
It's impossible to avoid trolling and non-constructive bickering, but in general
people are genuine and happy to be there for the good vibes.

Perhaps it is also a matter of popularity and if given enough time, things will turn 💩.
i do not know; i certainly hope not. My impression was instead one of appreciation, and an
encouragement to replicate the same community model in what eventually became the [Svelte Vietnam]
project - my attempt to build an inclusive community that helps bridge the gap between industry,
community, and universities at the local level.

If anything, my ultimate wish for the future would be for the Svelte community to continue thriving.
From Svelte as a common ground, we take the conversation into web, software, open source, humanity,
and beyond. That is heavy, and maybe i shouldn't be placing my trust and hope in a group of people
surrounding a piece of technology. Perhaps i should just chill out and move on to whatever is popular
instead of hanging onto nostalgia. Nevertheless, reminded of the friends i made and opportunities
i have been granted thanks to Svelte, maybe i deserve to feel hopeful.

## A Machine Takeover

Up until now, i have avoided an elephant in the room - AI. In fact, the perspective discussed so far
has deliberately either been pre-AI or left out the AI factor. So, let's talk about that. In particular,
there are two questions: in the world of AI, what will become of my relationship with Svelte? And
what of its community? Although i very much hate to be that pessimistic person in
the room, unfortunately, i do have much concern...

> [!INFO]
> When AI is referred to here, i mean specifically Generative AI such as LLM and its _harness_.

### Learn to Be

i am a mediocre developer; i do want to build software and deliver impact. But more than anything
else, i want to learn. The tech industry has always been moving so fast that in order to be
proficient, there are a myriad of tools to learn, and then to immediately unlearn for the next shiny
thing. But at least, that fact was acknowledged, and resources were allocated accordingly. For the past
two years, it felt somewhat different; something was lost. Today, to learn is to waste time; to
invest time in learning is to forever ~~falling behind~~ neglecting the state-of-the-art where the
art itself may no longer be created by or for humans.

Meanwhile, despite promises of the singularity, software still breaks while I need it the most.
Software honestly does not need stress-testing, because I already have stress using it!

i picked up Svelte not only because of its good vibes, but very importantly because it was also so
efficient that i forget it was even there. Instead, my focus could be towards building and learning
more about the web in breadth and depth, to gain more awareness and knowledge all for the hope of
building better software. Without a doubt, i can say that AI builds better software than
i do right now. But there have forever been people who can do that as well. It should not be the
reason to tell me to stop; because if the same principle applies, i shouldn't really being doing
anything in life, or being born for that matter.

"Learning to use AI or through AI is still learning", i can hear some say. No! i want
to learn and experiment with accessibility, read more about design principles, deep-dive into software
testing methodologies, etc. i don't want the _feeling of learning_. i want that friction of failing
and retrying, to struggle and to be grateful.
`}

<p class="text-center text-lg font-semibold">i do NOT want to sit and talk to a chatbot all day.</p>

{markdown`
Maybe it is not the case for some people in specific sectors that are slow enough or still value
human work and the necessity of manual review. But for me and for many others who work in literal
software factories, we are not paid to learn. The moment i am hired, i am expected to deliver. The
software lifecycle outlives me, and i am just a replaceable deteriorating gear in its machinery.

So maybe i really should treat my job as a means to survive rather than a learning opportunity, stop
dreaming about getting better, conform to the system, and leave the _higher-purpose_ job for some
white dude that eats the same bowl of phở and happens to make 100x per hour than i do.

In such a world, Svelte no longer matters.

### Bots, not People

On the grounds i have established, what is left of the community? One reason for gathering is to
connect and talk about Svelte, to grow together. Now that learning is less valued, chatbots
can perhaps answer questions better than community members, why bother?

Sadly, i have seen exactly this. Our local Svelte forum has become quieter. It was already
difficult to encourage sharing or time investment in community building then, it is now even more
fruitless. As Svelte stops being the common ground (AI can write whatever now, why does it matter?),
people might be better off joining an AI-focused community.

Velocity and productivity. Output and throughput. It is so easy to justify those. The most
cost-effective solution to implement a production is simply to not implement at all but to delegate -
less hassle, less worry, just gotta give them some money. And if you already have a lot of money, money
will make money. Look at the lost local expertise and the development of China as a centralised factory
of the world for example. Humans have perhaps been inefficient always. So is it not only logical that
the most productive system is one without human?

### Beyond Technology

i apologise that the tone of this text has suddenly become very negative. i don't know what else to
say when AI is all people talk about. Nothing about this situation is ordinary to me, and i refuse
to normalise it. It's not that Svelte is responsible the situation we are in; Svelte could arguably
have taken a more opinionated stance against AI (just like it has taken bold decision in technical
design before, or when the official website decided to ditch X), but that too would risk alienating
real working people. All in all, it is a tough position that grows beyond any individual. i dare not
tell others what to do or to believe in. i just want to share my experience and thoughts in hope
that they resonate with someone out there.

It is easy to give praise when Svelte's efficiency can help build applications with lesser hardware
or in a network-limited environment. It is a little bit harder to reason about prompting away one Svelte
app after another as the demand for data and power eats away people and their lands. Or when access to
an event celebrating ten years of Svelte as an inclusive community costs as much as it feeds a whole
family for a year. To be clear, i do not mean to suggest any guilt or blame. But when someone
tells me "brother, relax, it's just some technology, why bring politics into it", i can't help but say
that, my friend, it has everything to do with politics.

## Outlook

i am glad, however, the Svelte community has stayed open-minded through the event of AI. You can
see that the team has spent effort making it easier to use Svelte with LLM by introducing
[first party support for AI tooling](https://svelte.dev/docs/ai/overview). At the same time, there
is no shortage of progress: the framework is still getting better everyday.
[SvelteKit 3](https://svelte.dev/blog/sveltekit-3-is-here) was announced in October.
[Async Svelte](https://svelte.dev/docs/svelte/await-expressions) and
[Remote Functions](https://svelte.dev/docs/kit/remote-functions) are enroute to stable release.
[Cusom renderer](https://github.com/sveltejs/svelte/issues/15470) support is a possibility (try out
[gpuix-svelte](https://github.com/khromov/gpuix-svelte)). Community experimentation, libraries,
learning materials, or blog posts keep on improving the quality and diversity of the Svelte
ecosystem.

My hope is that the Svelte experiment continues forward. For the Svelte community to persevere
through this uncertain time, be more vocal and representative, be open-minded about the legitimate
and responsible use of AI but also skeptical about what is being up for auction - whether it is
worth the environmental cost and human connection at the center of our craft.

Because technology is ultimately for people.

Together, we build. Together, we are heard.

[Svelte Summit]: https://sveltesummit.com/
[svelte.attach]: https://svelte.dev/docs/svelte/@attach
[svelte.action]: https://svelte.dev/docs/svelte/use
[svelte.society]: https://sveltesociety.dev
[svelte.summit]: https://www.sveltesummit.com/
[svelte.sirens]: https://sveltesirens.dev/
[svelte.radio]: https://www.svelteradio.com/
[svelte.discord]: https://discord.com/invite/svelte
[svelte.hackathon]: https://hack.sveltesociety.dev/
[sveltejobs]: https://sveltejobs.com/
[Made of Svelte]: https://madewithsvelte.com/
[Best of Svelte]: https://bestofsvelte.com/
[Svelte Vietnam]: https://www.sveltevietnam.dev
[vite]: https://vite.dev/
[rich]: https://bsky.app/profile/rich-harris.dev
[tenets]: https://github.com/sveltejs/svelte/discussions/10085
`}
