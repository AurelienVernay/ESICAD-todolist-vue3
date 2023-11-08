/* on importe une feuille de style "globale" (qui s'applique sur toute la page)
(on aurait pu également l'injecter dans le HTML avec la balise <link rel="stylesheet">)
*/
import './assets/main.css';

// on importe la fonction createApp de
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// on importe le composant App qui représente l'application
import App from './App.vue';

/*  on utilise la méthode createApp de Vue pour créer une application Vue 
    et on "monte" l'application sur une balise HTML (ce qui va la remplir
    du contenu de notre application)
*/
import HomeComponent from '@/components/HomeComponent.vue';
import AboutComponent from '@/components/AboutComponent.vue';
import PageNotFoundComponent from '@/components/PageNotFoundComponent.vue';
const routes = [
  { path: '/', component: HomeComponent },
  { path: '/home', redirect: '/' },
  { path: '/about', component: AboutComponent },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent },
];

const router = createRouter({
  history: createWebHistory(),
  // https://router.vuejs.org/guide/essentials/history-mode.html pour plus d'infos sur les différents modes de routing
  routes, // short for `routes: routes`
});

const app = createApp(App);
// on injecte le router dans l'application créée en appelant app.use(router)
app.use(router);
app.mount('#app');
/*
    createApp va parser le composant App et charger tous les sous-composants nécessaires à App,
     puis monter le composant App.
     Monter un composant revient à exécuter son script setup, puis render son template
     Si le template contient des composants, ils seront également montés
     App n'a pas de prop injectée de manière générale (puisque c'est le composant racine)
*/
