<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Contrato</div>
      <q-separator />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-select
          v-model="empresa"
          :options="empresas"
          aria-placeholder="Selecione"
          option-value="id"
          option-label="nome"
          label="Empresa"
        />
        <q-select
          v-model="funcionario"
          :options="funcionarios"
          aria-placeholder="Selecione"
          option-value="id"
          option-label="nome"
          label="Funcionário"
        />
        <q-input
          filled
          v-model="occupation"
          label="Cargo*"
          hint="Cargo do Funcionario"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          filled
          v-model="login"
          label="Login*"
          hint="Login do Funcionario"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          filled
          type="password"
          v-model="password"
          label="Senha*"
          hint="Senha do Funcionario"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-toggle v-model="ativo" label="Ativo" />

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" type="reset" v-close-popup />
          <q-btn flat label="Salvar" type="submit" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useFuncionarioStore } from 'src/stores/funcionario-store';
import { useContratoStore } from 'src/stores/contrato-store';
import { useEmpresaStore } from 'src/stores/empresa-store';
import { useQuasar } from 'quasar';
import { Acesso, Contrato, Empresa, Funcionario } from 'src/components/models';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CadastroContrato',
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const $q = useQuasar();

    const store = useContratoStore();

    const empresas = useEmpresaStore().list;
    const funcionarios = useFuncionarioStore().list;

    const contrato = ref<Contrato>();
    const empresa = ref<Empresa>();
    const funcionario = ref<Funcionario>();

    if (props.id) {
      contrato.value = store.list.find((i) => i.id == props.id);

      empresa.value = empresas.find(
        (i) => i.id == contrato.value?.codigoEmpresa
      );
      funcionario.value = funcionarios.find(
        (i) => i.id == contrato.value?.codigoFuncionario
      );
    } else {
      contrato.value = {} as Contrato;
      contrato.value.acesso = {} as Acesso;
    }

    const occupation = ref(contrato.value?.cargo ?? '');
    const login = ref(contrato.value?.acesso?.login ?? '');
    const password = ref(contrato.value?.acesso?.senha ?? '');
    const ativo = ref(contrato.value?.acesso?.isAtivo);

    return {
      occupation,
      login,
      password,
      ativo,
      empresas,
      empresa,
      funcionarios,
      funcionario,
      onSubmit() {
        contrato.value.cargo = occupation.value ?? '';
        contrato.value.acesso.login = login.value;
        contrato.value.acesso.senha = password.value;
        contrato.value.acesso.isAtivo = ativo.value;
        contrato.value.codigoEmpresa = empresa.value?.id;
        contrato.value.codigoFuncionario = funcionario.value?.id;

        store
          .update(contrato.value)
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
        occupation.value = '';
        login.value = '';
        password.value = '';
      },
    };
  },
});
</script>
