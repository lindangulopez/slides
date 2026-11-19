<!-- "See it for yourself" box: a label, a link, and a screenshot that links to the same page. -->
<script setup lang="ts">
const props = defineProps<{ href: string; img: string; label?: string }>()
const src = import.meta.env.BASE_URL + props.img.replace(/^\//, '')
const shown = props.href.replace(/^https?:\/\//, '').replace(/\/$/, '')
</script>

<template>
  <a class="seeit" :href="href" target="_blank" rel="noopener">
    <div class="seeit-head">
      <span class="seeit-label">{{ label || 'See it for yourself' }}</span>
      <span class="seeit-url">{{ shown }}</span>
    </div>
    <img :src="src" alt="" />
  </a>
</template>

<style scoped>
.seeit { display: block; border: 1px solid var(--c-line); border-radius: 8px; overflow: hidden; text-decoration: none !important; color: inherit; background: #fff; }
.seeit:hover { border-color: var(--c-accent); }
.seeit-head { background: var(--c-accent-soft); padding: .35rem .7rem; display: flex; flex-direction: column; }
.seeit-label { font-size: .62rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--c-accent); }
.seeit-url { font-size: .7rem; color: var(--c-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.seeit img { display: block; width: 100%; border-top: 1px solid var(--c-line); }
</style>
