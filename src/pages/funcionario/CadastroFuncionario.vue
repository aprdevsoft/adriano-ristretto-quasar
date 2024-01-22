<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Funcionário</div>
      <q-separator />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Nome*"
          hint="Nome do Funcionario"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          filled
          mask="##/##/####"
          v-model="birthDate"
          label="Data Nascimento*"
          hint="Data de Nascimento"
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
import { useFuncionarioStore } from 'src/stores/funcionario-store';
import { useQuasar } from 'quasar';
import { dateFormatNumber, stringToDateFormat } from 'src/utils';
import { Funcionario } from 'src/components/models';

export default defineComponent({
  name: 'CadastroFuncionario',
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const $q = useQuasar();

    const store = useFuncionarioStore();

    const funcionario = ref<Funcionario>();

    if (props.id) {
      funcionario.value = store.list.find((i) => i.id == props.id);
    } else {
      funcionario.value = {} as Funcionario;
    }

    const name = ref(funcionario.value?.nome ?? '');
    const birthDate = ref(
      dateFormatNumber(funcionario.value?.dataNascimento ?? '')
    );

    return {
      name,
      birthDate,
      onSubmit() {
        funcionario.value.nome = name.value ?? '';
        funcionario.value.dataNascimento = stringToDateFormat(
          birthDate.value ?? ''
        );

        console.log(birthDate.value);
        console.log(stringToDateFormat(birthDate.value ?? ''));
        console.log(funcionario.value?.dataNascimento);
        store
          .update(funcionario.value)
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
        name.value = '';
        birthDate.value = '';
      },
    };
  },
});
</script>
