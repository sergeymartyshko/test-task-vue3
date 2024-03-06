import {defineStore} from "pinia";
import {CoreState, SearchResult} from "./type";
import axios from "axios";
export const storeName = "Core";

export const useCoreStore = defineStore(storeName, {
    state: (): CoreState => {
        return {
            entities: [],
            currentEntity: null,
            total: 0,
            perPage: 10,
            page: 1,
        }
    },
    getters: {
        getEntities: (state): SearchResult => {
            return state.entities;
        },
        getTotalPages: (state: number) => {
            return Math.ceil(state.total / state.perPage);
        },
        getFrom: (state: number) => {
            return (state.page - 1) * state.perPage;
        }
    },
    actions: {
        setPage(page: number) {
            this.page = page;
        },
        async fetchList(searchQuery: string) {
            let response = await axios
                .get(`https://registry.npmjs.com/-/v1/search?text=${searchQuery}&size=${this.perPage}&from=${this.getFrom}`)
            this.total = response.data.total;
            this.entities = response.data.objects;
        }
    }
})
