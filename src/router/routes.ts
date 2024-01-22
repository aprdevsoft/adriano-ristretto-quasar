import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '',
        name: 'empresas',
        component: () => import('pages/EmpresasPage.vue'),
      },
      {
        path: '',
        name: 'funcionarios',
        component: () => import('pages/FuncionariosPage.vue'),
      },
      {
        path: '',
        name: 'contratos',
        component: () => import('pages/ContratosPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
