<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Ristretto App </q-toolbar-title>

        <div>Adriano Pereira da Rosa</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <MenuItem
          v-for="item in menuItemList"
          :key="item.title"
          v-bind="item"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MenuItem from 'src/components/MenuItem.vue';

const menuList = [
  {
    title: 'Home',
    caption: 'Página principal',
    icon: 'home',
    route: { name: 'home' },
  },
  {
    title: 'Empresas',
    caption: 'Cadastro de Empresa',
    icon: 'business',
    route: { name: 'empresas' },
  },
  {
    title: 'Funcionários',
    caption: 'Cadastro de Funcionários',
    icon: 'person',
    route: { name: 'funcionarios' },
  },
  {
    title: 'Contratos',
    caption: 'Cadastro de Contratos',
    icon: 'badge',
    route: { name: 'contratos' },
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuItem,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      menuItemList: menuList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
