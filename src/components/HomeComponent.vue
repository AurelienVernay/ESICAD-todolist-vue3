<!-- 
  Le composant App représente l'application en elle-même : c'est le composant racine,
   il est parent de tous les autres. (voir main.ts)

  la balise <script setup> définit le code typescript à exécuter 
  on précise lang="ts" pour que Vue compile le code en JavaScript
  
  Plus d'infos : https://vuejs.org/api/sfc-script-setup.html#script-setup 
-->
<script setup lang="ts">
// on importe de depuis vue les fonctions qui nous intéresse (il y en a bien plus que ça)
/**
 * `ref` est la fonction qui permet de créer des références dynamiques
 * (lien vers la doc vue sur les refs : https://vuejs.org/api/reactivity-core.html#ref ).
 * Utiliser des refs permet de rendre les valeurs _réactives_,
 * c'est-à-dire de les faire réagir à des évènements et de les mettre à jour dynamiquement
 * `computed` permet de créer des valeurs calculées, c'est-à-dire une référence
 * vers une valeur qui se base sur une ou plusieurs refs
 * Doc : https://vuejs.org/api/reactivity-core.html#computed
 */
import { computed, onMounted, ref, watch } from 'vue';
/**
 *  on importe les composants que l'on veut utiliser dans notre composant
 *  (par convention, Vue suggère que les éléments répétables soit suffixés du mot `Item`)
 *  on utilise @ pour désigner le dossier `src` (voir ./tsconfig.app.json)
 * */
import TodoItem from '@/components/TodoItem.vue';
import type { Todo } from '@/models/Todo.model';

// on déclare une variable mesTodos qui est une ref sur un tableau de Todo

const mesTodos = ref<Todo[]>([]);

onMounted(async () => {
    const response = await fetch('api/todos');
    const monTableau = await response.json();
    mesTodos.value = monTableau.map((unTodo: Todo & { todoId: number }) => ({
        ...unTodo,
        id: unTodo.todoId,
        displayDone: true,
    }));
});

watch(mesTodos, (newMesTodos, oldMesTodos) => {
    console.log(JSON.stringify(newMesTodos), JSON.stringify(oldMesTodos));
})
/** 
  je définis une ref computed newTodoId qui calcule le prochain id à saisir
  de cette manière je n'ai pas à me soucier de le recalculer à chaque fois 
  que j'ajoute un élément dans mon tableau mesTodos
*/
let newTodoId = computed(() => mesTodos.value.length + 1);
/**
  je définis une ref newTodo qui représente le Todo que l'on a ajouter
*/
const newTodo = ref<Todo>({
    done: false,
    displayDone: false,
    text: '',
    id: newTodoId.value,
});

/**
 * Cette fonction permet de gérer la mise à jour d'un todo
 * @param {Todo} totoNewValue la nouvelle valeur de todo à stocker
 * fournie par le déclenchement de l'évènement `update:todo`.
 * @param index la position dans le tableau du todo à mettre à jour
 */
const handleUpdateTodo = (totoNewValue: Todo, index: number) => {
    /*  Vue 3 supporte l'utilisation des méthodes de mutation des array (push, slice, splice, etc...) 
          il les surcharge en ajoutant du code qui lui permet de mettre à jour la vue HTML
          on a donc le droit de les utiliser
          
          par exemple : mesTodos.value.splice(index, 1, $event);
    
          Ca n'est pas le cas de tous les frameworks JS, qui demandent 
          de changer la référence de la variable pour détecter les différences.
          On peut donc aussi utiliser l'object spreading sur les éléments d'un tableau pour 
          créer un nouveau tableau contenant nos éléments mis à jour
      */
    mesTodos.value = [
        ...mesTodos.value.slice(0, index),
        totoNewValue,
        ...mesTodos.value.slice(index + 1),
    ];


};
/**
 * fonction appelée pour ajouter le nouveau todo à la collection des todos
 */
const addTodo = () => {
    // si le texte n'est pas vide
    if (newTodo.value.text.length) {
        // on mute l'état de mesTodos.value, ce qui est détecté par Vue
        mesTodos.value.push(
            /* on récupère la valeur de newTodo, et on set les propriétés displayDone et id
                     (sinon on ne verrait pas la case à cocher et l'id ne serait pas à jour)
                  */
            { ...newTodo.value, displayDone: true, id: newTodoId.value },
        );
        // alternativement, on aurait pu écrire : mesTodos.value = [...mesTodos.value, {[nouvel objet]}]
        mesTodos.value = [
            ...mesTodos.value,
            { ...newTodo.value, displayDone: true, id: newTodoId.value },
        ];
        // on reset le texte du newTodo
        newTodo.value.text = '';
    }
};
/**
 * on set une ref computed qui se met à jour dès que mesTodos est complètement done
 */
const allDone = computed(() => mesTodos.value.filter((t) => !t.done).length === 0);
</script>

<template>
    <main>
        <div class="card">
            <h2 class="title">Mes Todos</h2>
            <template v-for="(monTodo, index) in mesTodos" :key="monTodo.id">
                <TodoItem :todo="monTodo" @update:todo="($event: Todo) => handleUpdateTodo($event, index)" />
                <hr v-if="index !== mesTodos.length - 1" />
            </template>
        </div>
        <div class="card">
            <h2 class="title">Ajouter un Todo</h2>
            <TodoItem :todo="newTodo" @enter="addTodo" @update:todo="$event => newTodo = $event" />
        </div>
    </main>
    <!-- Si tous les todos sont done, on ajoute des confettis parce que c'est la fête -->
    <img v-if="allDone" src="src/assets/confetti.svg" class="all-done" />
</template>

<!--
    Le style du composant est encapsulé (scoped), 
    c'est-à-dire que chaque règle définie ici ne s'applique que sur ce composant
    Dans les faits, Vue.js va créer un hash unique à chaque composant 
    et suffixer nos règles de style avec ce hash 
 -->
<style scoped>
@keyframes appear {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

header {
    line-height: 1.5;
}

main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.card {
    width: calc(100% - 1rem);
    border-radius: 12px;
    background-color: rgb(242, 188, 87);
    padding: 0.5rem;
    margin-bottom: 1rem;
}

@media screen and ((min-width: 768px)) {
    main {
        flex-direction: row;
        align-items: start;
    }

    .card {
        width: calc(50% - 1rem);
    }
}

.new-todo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.new-todo button {
    margin-top: 0.5rem;
}

.all-done {
    user-select: none;
    animation: appear 1s;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(250, 250, 177, 0.659);
}

.title {
    text-align: center;
}

hr {
    color: goldenrod;
}
</style>
