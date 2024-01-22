<template>
  <q-page padding>
    <q-card flat bordered class="my-card">
      <q-card-actions class="bg-primary text-white header" align="between">
        <div class="text-h6">Cadastro de Contratos</div>
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
        <ContratoTable :filter="text" />
      </q-card-section>
    </q-card>

    <q-dialog v-model="cadastro" persistent>
      <ContratoCadastro />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ContratoTable from './contrato/ContratoTable.vue';
import ContratoCadastro from './contrato/ContratoCadastro.vue';

export default defineComponent({
  name: 'ContratosPage',
  components: { ContratoTable, ContratoCadastro },
  setup() {
    return {
      cadastro: ref(false),
      text: ref(''),
    };
  },
});
</script>
