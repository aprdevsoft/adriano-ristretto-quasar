// Pinia Store
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Empresa } from 'src/components/models';

interface State {
  empresas: [];
}

const service = 'empresa';

export const useEmpresaStore = defineStore(service, {
  // convert to a function
  state: (): State => ({
    empresas: [],
  }),
  getters: {
    // firstName getter removed, no longer needed
    list: (state) => state.empresas,
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

    async post(request: Empresa) {
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

    async put(request: Empresa) {
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

    async update(request: Empresa) {
      if (request.id) return this.put(request);

      return this.post(request);
    },

    // mutations can now become actions, instead of `state` as first argument use `this`
    set(payload) {
      this.empresas = payload.data;
    },
    // easily reset state using `$reset`
    clear() {
      this.$reset();
    },
  },
});
