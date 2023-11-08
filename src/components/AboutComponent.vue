<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>
<template>
    <div class="card">
        <h2 class="title">About this app</h2>
        <p>Created with 💖 Using Vue 3 and Vue-Router</p>
        <p>Copyleft 2023 ESICAD Toulouse</p>
        <RouterLink to="/home">Retour</RouterLink>
    </div>
</template>