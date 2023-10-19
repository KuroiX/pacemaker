<script setup lang="ts">
import {ref} from "vue";
import {useContentsStore} from "@/store/contents";
import {storeToRefs} from "pinia";
import BeatContentHolder from "@/components/BeatContentHolder.vue";
import {BeatContentManager} from "@/assets/BeatContentManager";

const props = defineProps<{
  dialog: boolean
}>()

const emit = defineEmits(['onSave', 'onExit', 'onCreate'])

const manager = BeatContentManager.getInstance()

const { contents } = storeToRefs(useContentsStore())

const id = ref(-1)

function onSave() {
  emit('onSave', id.value)
  onSelect(id.value)
}

function onExit() {
  emit('onExit')
}

function onCreate() {
  emit('onCreate')
}

function onSelect(selectedId: number) {
  id.value = id.value == selectedId ? -1 : selectedId
}

function onDelete(selectedId: number) {
  manager.deleteContent(selectedId)
}

</script>

<template>
  <v-dialog v-model="props.dialog" width="500px">
    <v-card>
      <v-item-group selected-class="bg-primary">
        <v-container>
          <v-row>
            <v-col
                v-for="content in contents"
                cols="12"
                md="6"
            >
              <v-item>
                <v-card @click="() => {onSelect(content.id);}">
                  <BeatContentHolder :color="id == content.id ? 'primary' : ''" :content-id="content.id" :is-in-beat="false" @on-delete="onDelete"/>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>

      <v-card-actions>
        <v-btn color="secondary" @click="onExit">Exit</v-btn>
        <v-btn color="tertiary" @click="onCreate">Create</v-btn>
        <v-btn color="primary" @click="onSave">Save</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<style scoped>

</style>