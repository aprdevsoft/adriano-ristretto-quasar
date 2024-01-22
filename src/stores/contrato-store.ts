// Pinia Store
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Contrato } from 'src/components/models';

interface State {
  contratos: [];
}

const service = 'contrato';

export const useContratoStore = defineStore(service, {
  // convert to a function
  state: (): State => ({
    contratos: [],
  }),
  getters: {
    // firstName getter removed, no longer needed
    list: (state) => state.contratos,
  },
  actions: {
    // no context as first argument, use `this` instead
    async getAll() {
      return new Promise((resolve, reject) => {
        api
          .get(service)
          .then((response) => {
            this.set(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async get(id: string) {
      return new Promise((resolve, reject) => {
        api
          .get(`${service}/${id}`)
          .then((response) => {
            this.set(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async post(request: Contrato) {
      return new Promise((resolve, reject) => {
        api
          .post(service, request)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async put(request: Contrato) {
      return new Promise((resolve, reject) => {
        api
          .put(`${service}/${request.id}`, request)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async delete(id: string) {
      return new Promise((resolve, reject) => {
        api
          .delete(`${service}/${id}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async update(request: Contrato) {
      if (request.id) return this.put(request);

      return this.post(request);
    },

    // mutations can now become actions, instead of `state` as first argument use `this`
    set(payload) {
      this.contratos = payload.data;
    },
    // easily reset state using `$reset`
    clear() {
      this.$reset();
    },
  },
});
