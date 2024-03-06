<script setup lang="ts">
import axios from "axios";
import {computed, ref} from "vue";
import {useCoreStore} from "@/modules/core";

const store = useCoreStore();
let dialog = ref<boolean>(false);
let searchQuery = ref<string>('');
let page = computed<number>({
  get() {
    return store.page;
  },
  set(value) {
    store.setPage(value);
  }
});

const isLoading = ref<boolean>(false);

const currentItem = ref<any>(null);

const onRowClick = async (itemPackage) => {
  let responses = await Promise.all([
    axios.get(`https://data.jsdelivr.com/v1/packages/npm/${itemPackage.name}`),
    axios.get(`https://data.jsdelivr.com/v1/stats/packages/npm/${itemPackage.name}?period=month`)
  ])

  currentItem.value = {
    name: itemPackage.name,
    description: itemPackage.description,
    version: responses[0].data.versions,
    tags: responses[0].data.tags,
    hitsTotal: responses[1].data.hits.total,
    bandWidth: formatBytes(responses[1].data.bandwidth.total),
  }

  dialog.value = true
}

const onModalClose = () => {
  dialog.value = false;
  currentItem.value = null;
}

const onPageClick = async (p) => {
  try {
    isLoading.value = true;
    await store.fetchList(searchQuery.value);
  } catch (e) {
    console.warn(e)
  } finally {
    isLoading.value = false;
  }
}

const onSearch = async () => {
  if (isLoading.value) return;
  try {
    isLoading.value = true;
    await store.fetchList(searchQuery.value);
  } catch (e) {
    console.warn(e)
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <div>
    <v-card
        class="mx-auto"
        color="grey-lighten-3"
        max-width="400"
    >
      <v-card-text>
        <v-text-field
            v-model="searchQuery"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Search templates"
            variant="solo"
            hide-details
            single-line
            @click:append-inner="onSearch"

        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-skeleton-loader :loading="isLoading" type="table">
      <v-table
          v-if="store.entities.length"
          width="100%"
          class="fill-width"
      >
        <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Author
          </th>
          <th class="text-left">
            Link
          </th>
          <th class="text-left">
            Description
          </th>
          <th class="text-left">
            Date
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in store.entities"
            :key="item.package.links.npm"
            @click="onRowClick(item.package)"
        >
          <td>{{ item.package.name }}</td>
          <td>{{ item.package.author?.name }} - {{ item.package.author?.email }}</td>
          <td><a :href="item.package.links.npm" @click.stop target="_blank">{{ item.package.links.npm }}</a></td>
          <td v-html="item.package.description"></td>
          <td>{{ item.package.date }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-skeleton-loader>
    <v-pagination
        v-if="store.entities.length"
        v-model="page"
        :length="store.getTotalPages"
        :total-visible="7"
        class="my-4"
        :disabled="isLoading"
        @update:modelValue="onPageClick"
    ></v-pagination>
    <v-dialog
        v-if="currentItem"
        v-model="dialog"
        width="auto"
    >
      <v-card
          min-width="300"
          max-width="700"
      >
        <v-card-item>
          <v-card-title>
            {{ currentItem.name }}
          </v-card-title>
        </v-card-item>

        <v-card-text v-html="currentItem.description"></v-card-text>
        <v-card-text>Total: {{ currentItem.hitsTotal }}</v-card-text>
        <v-card-text>Size: {{ currentItem.bandWidth }}</v-card-text>
        <v-expansion-panels
            multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-title>Versions</v-expansion-panel-title>
            <v-expansion-panel-text v-for="item in currentItem.version">
              Version - {{ item.version }}
              Link - <a :href="item.links.self">Download</a>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <template v-slot:actions>
          <v-btn
              class="ms-auto"
              text="Close"
              @click="onModalClose"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>


