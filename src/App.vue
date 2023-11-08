<script setup lang="ts">
</script>

<template>
  <header>
    <h1 class="title">Vue 3 TodoList</h1>
  </header>
  <main>
    <router-view></router-view>
  </main>

  <footer>
    <p>
      <RouterLink to="about">A propos de cette app</RouterLink>
    </p>
  </footer>
</template>

<!--
    Le style du composant est encapsulé (scoped), 
    c'est-à-dire que chaque règle définie ici ne s'applique que sur ce composant
    Dans les faits, Vue.js va créer un hash unique à chaque composant 
    et suffixer nos règles de style avec ce hash 
 -->
<style scoped>
header {
  line-height: 1.5;
}

.title {
  text-align: center;
}

.main {
  flex: 1 0
}

.card {
  width: calc(100% - 1rem);
  border-radius: 12px;
  background-color: rgb(242, 188, 87);
  padding: 0.5rem;
  margin-bottom: 1rem;
}

footer {
  background-color: goldenrod;
  text-align: center;
  font-weight: bolder;
}
</style>
