<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Empresa</div>
      <q-separator />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Nome*"
          hint="Nome da Empresa"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          filled
          v-model="url"
          label="Site*"
          hint="Site da Empresa"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          filled
          mask="(##) # ####-####"
          v-model="phone"
          label="Telefone*"
          hint="Telefone da Empresa"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" type="reset" v-close-popup />
          <q-btn flat label="Salvar" type="submit" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useEmpresaStore } from 'src/stores/empresa-store';
import { useQuasar } from 'quasar';
import { Empresa } from 'src/components/models';

export default defineComponent({
  name: 'CadastroEmpresas',
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const $q = useQuasar();

    const store = useEmpresaStore();

    const empresa = ref<Empresa>();

    if (props.id) {
      empresa.value = store.list.find((i) => i.id == props.id);
    } else {
      empresa.value = {} as Empresa;
    }

    const name = ref(empresa.value?.nome ?? '');
    const url = ref(empresa.value?.url ?? '');
    const phone = ref(empresa.value?.telefone ?? '');

    return {
      name,
      url,
      phone,
      onSubmit() {
        empresa.value.id = props.id;
        empresa.value.nome = name.value ?? '';
        empresa.value.url = url.value ?? '';
        empresa.value.telefone = phone.value
          .replace('(', '')
          .replace(')', '')
          .replace('-', '')
          .replaceAll(' ', '');
        store
          .update(empresa.value)
          .then(() => {
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'check',
              position: 'top',
              message: 'Salvo com sucesso!',
            });
            store.getAll();
          })
          .catch(() => {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              position: 'top',
              message: 'Falha ao salvar',
            });
          });
      },
      onReset() {
        name.value = null;
        url.value = null;
        phone.value = '';
      },
    };
  },
});
</script>
