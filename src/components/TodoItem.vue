<script setup lang="ts">
// on importe notre modèle Todo pour pouvoir l'utiliser dans le composant
import type { Todo } from '@/models/Todo.model'

/**
 * On définit les propriétés en entrée de notre composant
 * - On peut en mettre plusieurs, et les typer comme on veut
 * - Dans notre exemple, on définit une propriété `todo`
 *   qui est un Todo (notre modèle de données)
 */
const props = defineProps<{ todo: Todo }>()
/**
 * On définit nos évènements que notre composant peut émettre.
 * Cela permet de notifier le composant parent que quelque chose se passe
 * (et l'y faire réagir)
 */
const emits = defineEmits(['update:todo', 'enter'])

/**
 * Fonction appelée lorsque le texte dans l'input change.
 * On va utiliser cette fonction pour émettre un évènement
 * et notifier que l'on veut mettre à jour le Todo
 * @param {Event} $event un évènement qui se déclenche dans le DOM (voir le [MDN](https://developer.mozilla.org/fr/docs/Web/API/Event))
 */
const handleTextChange = ($event: Event) => {
  /* on récupère la cible de l'évènement et on la caste en un élément HTML input 
       (on sait que la cible de l'évènement sera toujours l'input texte) 
       puis on récupère sa valeur
    */

  const newValue = ($event.target as HTMLInputElement).value
  /*  on émet un évenement `update:todo` qui va pouvoir être capté par le composant parent
        on donne en paramètre la nouvelle valeur du todo à stocker
        j'utilise une notation dite `d'object spreading` : je définis un nouvel objet
        qui contient toutes les propriétés de l'ancienne valeur, 
        puis je définis la nouvelle valeur de `text`
    */
  emits('update:todo', { ...props.todo, text: newValue })
}

/**
 * Fonction appelée lorsque la valeur de la case à cocher change.
 * On va utiliser cette fonction pour émettre un évènement
 * et notifier que l'on veut mettre à jour le Todo
 * @param {Event} $event un évènement qui se déclenche dans le DOM (voir le [MDN](https://developer.mozilla.org/fr/docs/Web/API/Event))
 */
const handleCheckboxChange = ($event: Event) => {
  /* on récupère la cible de l'évènement et on la caste en un élément HTML input 
       (on sait que la cible de l'évènement sera toujours l'input texte) 
       puis on récupère sa valeur 
       (pour une checkbox, la propriété qui porte la valeur est `checked`, pas `value`)
    */
  const newValue = ($event.target as HTMLInputElement).checked
  /*  on émet un évenement `update:todo` qui va pouvoir être capté par le composant parent
      on donne en paramètre la nouvelle valeur du todo à stocker
      j'utilise une notation dite `d'object spreading` : je définis un nouvel objet
      qui contient toutes les propriétés de l'ancienne valeur, 
      puis je définis la nouvelle valeur de `done`
  */
  emits('update:todo', { ...props.todo, done: newValue })
}
</script>

<template>
  <div class="todo">
    <!-- on bind la valeur de l'input à la propriété todo.text à l'aide de :value
            (binding descendant => la valeur sera réinjectée dès que la prop todo.text change)
            https://vuejs.org/guide/essentials/template-syntax.html 
            https://vuejs.org/guide/essentials/forms.html  
            on bind l'évènement de saisie input à la fonction `handleTextChange` (@input)
            (binding ascendant => on réagit à l'évènement en 
            https://vuejs.org/guide/essentials/event-handling.html#method-handlers
            on bind également l'évènement keyup.enter (lorqu'on a fini d'appuyer sur entrée) 
            pour émettre un évènement (utile pour ajouter un todo en appuyant sur entrée)
        -->
    <input class="text-box" :disabled="todo.done" :class="{
      done: todo.done,
    }" type="text" :value="todo.text" @input="handleTextChange" @keyup.enter="emits('enter')" />
    <!--    on conditionne l'affichage de la case à cocher si la propriété displayDone est à vrai 
                https://vuejs.org/guide/essentials/conditional.html
                Pour une checkbox, l'évènement qui envoie la valeur est change, on s'attache donc dessus
                pour réagir au changement
        -->
    <input v-if="todo.displayDone" type="checkbox" :checked="todo.done"
      :title="`Click to set ${todo.done ? 'not done' : 'done'}`" @change="handleCheckboxChange" />
  </div>
</template>

<!--
    Le style du composant est encapsulé (scoped), 
    c'est-à-dire que chaque règle définie ici ne s'applique que sur ce composant
    Dans les faits, Vue.js va créer un hash unique à chaque composant 
    et suffixer nos règles de style avec ce hash 
 -->
<style scoped>
input.text-box {
  border: 1px solid black;
  padding: 0.3rem;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  flex: 1 0;
}

.todo {
  min-width: 15rem;
  width: 100%;
  border-radius: 12px;
  padding: 0.5rem;
  background-color: #dba113;
  display: flex;
  align-items: baseline;
}

.done {
  text-decoration: line-through;
  background-color: rgb(202, 202, 202);
}
</style>
