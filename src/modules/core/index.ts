import {defineStore} from "pinia";
import { CoreState } from "./type";
export const storeName = "Core";

export const useCoreStore = defineStore(storeName, {
    state: (): CoreState => {
        return {
            isInited: false
        }
    },
    getters: {

    },
    actions: {
        async init () {
            // TODO: loading initial data from server
            this.isInited = true;
        },
    }
})
