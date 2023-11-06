<script lang="ts">
  import { PUBLIC_MODE } from '$env/static/public';
  import { setColorSchemeContext } from '$lib/contexts/colorScheme';

  import '../lib/styles/app.css';

  import type { LayoutData } from './$types';

  export let data: LayoutData;

  $: title = 'vnphanquang';
  $: description = 'A nonsensical personal website and digital playground';
  $: keywords = ['personal', 'website', 'playground'];
  $: canonical = 'https://vnphanquang.com';

  $: ogTitle = title;
  $: ogDescription = description;
  $: ogType = 'profile';
  $: ogUrl = canonical;
  $: ogImage = 'FIXME: to be filled';
  $: ogImageAlt = '';

  $: twitterTitle = title;
  $: twitterDescription = description;
  $: twitterImage = ogImage;
  $: twitterImageAlt = ogImageAlt;
  $: twitterCard = 'summary_large_image';
  $: twitterSite = '@vnphanquang';
  $: twitterCreator = '@vnphanquang';

  setColorSchemeContext(data.colorScheme);
</script>

<svelte:head>
  <!-- SEO meta tags -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords.join(', ')} />

  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={ogDescription} />
  <meta property="og:type" content={ogType} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:alt" content={ogImageAlt} />
  <meta property="og:url" content={ogUrl} />

  <meta name="twitter:title" content={twitterTitle} />
  <meta name="twitter:description" content={twitterDescription} />
  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:image" content={twitterImage} />
  <meta name="twitter:image:alt" content={twitterImageAlt} />
  <meta name="twitter:site" content={twitterSite} />
  <meta name="twitter:creator" content={twitterCreator} />

  <link href={canonical} rel="canonical" />

  <meta name="mode" content={PUBLIC_MODE} />
</svelte:head>

<slot />
