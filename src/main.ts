/* on importe une feuille de style "globale" (qui s'applique sur toute la page)
(on aurait pu également l'injecter dans le HTML avec la balise <link rel="stylesheet">)
*/
import './assets/main.css';

// on importe la fonction createApp de
import { createApp } from 'vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
// on importe le composant App qui représente l'application
import App from './App.vue';

/*  on utilise la méthode createApp de Vue pour créer une application Vue 
    et on "monte" l'application sur une balise HTML (ce qui va la remplir
    du contenu de notre application)
*/
import HomeComponent from '@/components/HomeComponent.vue';
import AboutComponent from '@/components/AboutComponent.vue';
import PageNotFoundComponent from '@/components/PageNotFoundComponent.vue';

// On définit un tableau de routes qui pointent vers des composants à render
const routes: RouteRecordRaw[] = [
  // route par défaut, render le HomeComponent
  { path: '/', component: HomeComponent },
  // on redirige les liens vers /home sur /
  { path: '/home', redirect: '/' },
  // une autre route /about render le AboutComponent
  { path: '/about', component: AboutComponent },
  /*
   *   si aucune route n'a matché le path, on peut créer une route "wildcard"
   *   qui redirige vers un composant not found
   *   (vous pouvez tester en mettant n'importe quel chemin dans l'URL après le domaine)
   */
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent },
];

/*
 * On peut faire des routeurs plus évolués
 * (avec des sous-routeurs et des paramètres d'URL),
 * voir la doc de vue-router pour plus d'infos
 */

const router = createRouter({
  history: createWebHistory(),
  /**
   * Pour plus d'infos sur les différents modes de gestion de l'historique de routing :
   * https://router.vuejs.org/guide/essentials/history-mode.html
   **/
  routes, // short for `routes: routes`
});
// createApp va parser le composant App et charger tous les sous-composants nécessaires à App,
const app = createApp(App);
// on injecte le router dans l'application créée en appelant app.use(router)
app.use(router);
// on monte le composant App dans la <div id="app"/>.
app.mount('#app');
/*
     Monter un composant revient à exécuter son script setup, puis render son template
     Si le template contient des composants, ils seront également montés
     App n'a pas de prop injectée de manière générale (puisque c'est le composant racine)
*/
