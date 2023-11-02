/* on importe une feuille de style "globale" (qui s'applique sur toute la page)
(on aurait pu également l'injecter dans le HTML avec la balise <link rel="stylesheet">)
*/
import './assets/main.css'

// on importe la fonction createApp de
import { createApp } from 'vue'
// on importe le composant App qui représente l'application
import App from './App.vue'

/*  on utilise la méthode createApp de Vue pour créer une application Vue 
    et on "monte" l'application sur une balise HTML (ce qui va la remplir
    du contenu de notre application)
*/
createApp(App).mount('#app')
/*
    createApp va parser le composant App et charger tous les sous-composants nécessaires à App,
     puis monter le composant App.
     Monter un composant revient à exécuter son script setup, puis render son template
     Si le template contient des composants, ils seront également montés
     App n'a pas de prop injectée de manière générale (puisque c'est le composant racine)
*/
