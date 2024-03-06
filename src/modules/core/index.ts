import {defineStore} from "pinia";
import axios from "axios";
import {formatBytes} from "@/utils";
import {CurrentEntityInterface, PackageInterface, StateInterface} from "@/modules/core/type";

export const storeName = "Core";

export const useCoreStore = defineStore(storeName, {
    state: (): StateInterface => {
        return {
            entities: [],
            currentEntity: null,
            total: 0,
            perPage: 10,
            page: 1,
        }
    },
    getters: {
        getTotalPages: (state: StateInterface): number => {
            return Math.ceil(state.total / state.perPage);
        },
        getFrom: (state: StateInterface): number => {
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
        },
        async fetchDetails(itemPackage: PackageInterface) {
            try {
                let responses = await Promise.all([
                    axios.get(`https://data.jsdelivr.com/v1/packages/npm/${itemPackage.name}`),
                    axios.get(`https://data.jsdelivr.com/v1/stats/packages/npm/${itemPackage.name}?period=month`)
                ])

                this.currentEntity = {
                    name: itemPackage.name,
                    description: itemPackage.description,
                    versions: responses[0].data.versions,
                    tags: responses[0].data.tags,
                    hitsTotal: responses[1].data.hits.total,
                    bandWidth: formatBytes(responses[1].data.bandwidth.total),
                }
            } catch (e) {
                console.warn(e)
                this.currentEntity = null;
            }
        }
    }
})
