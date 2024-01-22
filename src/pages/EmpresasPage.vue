<template>
  <q-page padding>
    <q-card flat bordered class="my-card">
      <q-card-actions class="bg-primary text-white header" align="between">
        <div class="text-h6">Cadastro de Empresas</div>
        <q-btn
          color="white"
          text-color="indigo"
          label="Novo Cadastro"
          @click="cadastro = true"
          no-caps
        />
      </q-card-actions>
      <q-card-section>
        <q-input color="info" outlined v-model="text" label="Filtrar" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <EmpresaTable :filter="text" />
      </q-card-section>
    </q-card>

    <q-dialog v-model="cadastro" persistent>
      <CadastroEmpresa />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EmpresaTable from 'pages/empresa/EmpresasTable.vue';
import CadastroEmpresa from './empresa/CadastroEmpresa.vue';

export default defineComponent({
  name: 'EmpresasPage',
  components: { EmpresaTable, CadastroEmpresa },
  setup() {
    return {
      cadastro: ref(false),
      text: ref(''),
    };
  },
});
</script>
