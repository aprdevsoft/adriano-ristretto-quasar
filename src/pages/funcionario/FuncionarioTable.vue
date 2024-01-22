<template>
  <q-table title="" :rows="lst" :columns="columns" row-key="id">
    <template v-slot:body-cell-Actions="props">
      <q-td :props="props">
        <q-btn
          round
          title="Alterar"
          color="white"
          text-color="indigo"
          icon="edit"
          size="sm"
          @click="onEdit(props.row.id)"
        />
        &nbsp;&nbsp;
        <q-btn
          round
          title="Excluir"
          color="negative"
          icon="delete"
          size="sm"
          @click="onDelete(props.row.id)"
        />
      </q-td>
    </template>
  </q-table>

  <q-dialog v-model="edit" persistent>
    <CadastroFuncionario :id="id" />
  </q-dialog>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Confirmação</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Deseja realmente excluir este registro?
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="black" v-close-popup />
        <q-btn flat label="Confirmar" color="primary" @click="excluir" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useFuncionarioStore } from 'src/stores/funcionario-store';
import { computed, defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import CadastroFuncionario from './CadastroFuncionario.vue';
import { dateFormat } from 'src/utils';

export default defineComponent({
  name: 'FuncionariosTable',
  components: { CadastroFuncionario },
  props: {
    filter: {
      type: String,
    },
  },
  setup(props) {
    const store = useFuncionarioStore();
    const confirm = ref(false);
    const edit = ref(false);
    const $q = useQuasar();
    const id = ref('');

    store.getAll();

    const lst = computed(() =>
      store.list.filter(
        (n) =>
          !props.filter ||
          n.nome.toString().toLowerCase().includes(props.filter.toLowerCase())
      )
    );

    const onDelete = (val: string) => {
      confirm.value = true;
      id.value = val;
      console.log(val);
    };

    const onEdit = (val: string) => {
      edit.value = true;
      id.value = val;
      console.log(val);
    };

    const excluir = () => {
      store
        .delete(id.value)
        .then(() => {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check',
            position: 'top',
            message: 'Excluído com sucesso!',
          });
        })
        .catch(() => {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            position: 'top',
            message: 'Falha ao excluir',
          });
        })
        .finally(() => {
          confirm.value = false;
          store.getAll();
        });
    };
    const columns = [
      {
        name: 'nome',
        field: 'nome',
        label: 'Nome',
        sortable: true,
        align: 'left',
      },
      {
        name: 'dataNascimento',
        field: 'dataNascimento',
        label: 'Data Nascimento',
        sortable: true,
        align: 'left',
        format: (val) => dateFormat(val),
      },
      {
        name: 'Actions',
        field: 'Actions',
        label: '',
      },
    ];
    return { columns, lst, id, confirm, edit, onEdit, onDelete, excluir };
  },
});
</script>
