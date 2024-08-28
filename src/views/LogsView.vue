<script setup lang="ts">
import LogsSection from '@/components/LogsSection.vue';
</script>

<template>
    <section class="w-full flex flex-col gap-10 justify-start items-center px-5 py-10">
        <h1 class="text-4xl font-bold text-primary">Your past logs</h1>
        <LogsSection />
    </section>
</template>
