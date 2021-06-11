<template>
  <div class="main">
    <div class="header">
      <h1 class="withh11">Take Quick Note</h1>
      <div class="with">
        <h1 class="withh12">With</h1>
        <h3>Note Taker</h3>
      </div>
      <router-link class="router-link" to="/createnote">
        <el-button class="createBtn" type="danger">Create new note</el-button>
      </router-link>
    </div>
    <!-- note List -->
    <div class="note-list" v-if="notes" ref="scrl">
      <el-card v-for="note in formatNotes" :key="note.id" class="box-note">
        <div class="note-title">
          <div @click="openNote(note.id)" style="cursor: pointer">
            <h3>{{ note.title }}</h3>
            <p>{{ note.createdAt }}</p>
          </div>
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-danger p-button-text"
            @click="deleteNotes(note.id)"
          />
        </div>
        <!-- details note -->
        <Dialog
          v-if="openId === note.id"
          :header="note.title"
          v-model:visible="displayBasic"
          :style="{ width: '380px' }"
        >
          <p>
            {{ note.note }}
          </p>
          <template #footer>
            <Button
              class="p-button-outlined p-button-help"
              label="Okay"
              icon="pi pi-check"
              @click="closeBasic"
              autofocus
            />
          </template>
        </Dialog>
      </el-card>
      <!-- end details note -->
    </div>
    <div v-else style="margin: auto">
      <ProgressSpinner />
    </div>
    <!-- show more -->
    <el-button
      :disabled="showMoreBtn"
      @click="showMore"
      class="show-more"
      type="warning"
      >Show more...</el-button
    >
  </div>
</template>

<script>
// @ is an alias to /src
// import { getCollection } from "@/composable/getCollection.js";
import { getCollection } from "@/composable/getCollection.js";
import { deleteNote } from "@/composable/deleteNote.js";
import { ref } from "@vue/reactivity";
import { computed, onUpdated } from "@vue/runtime-core";
import { format } from "date-fns";

export default {
  setup() {
    const { notes, moreNote, showMoreBtn } = getCollection();
    const { remove } = deleteNote();

    const displayBasic = ref(false);
    const openId = ref(null);
    const openNote = (id) => {
      displayBasic.value = true;
      openId.value = id;
    };
    const closeBasic = () => {
      displayBasic.value = false;
    };

    const deleteNotes = (id) => {
      remove(id);
      console.log(id);
    };

    const showMore = async () => {
      await moreNote();
    };

    const formatNotes = computed(() => {
      if (notes.value) {
        return notes.value.map((doc) => {
          let time = format(doc.createdAt.toDate(), "PPp");
          return {
            ...doc,
            createdAt: time,
          };
        });
      }
    });

    let i = 0;
    onUpdated(() => {
      if (i !== 0) {
        var scrollingElement = document.scrollingElement || document.body;
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
      }
      i++;
    });

    return {
      notes,
      openNote,
      displayBasic,
      closeBasic,
      openId,
      deleteNotes,
      formatNotes,
      showMore,
      showMoreBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  .withh11 {
    color: #72147e;
    margin: 5px;
    font-size: 28px;
  }
  .withh12 {
    color: #72147e;
    display: inline;
    font-size: 50px;
    padding: 0;
    margin: 0;
  }
  h3 {
    display: inline;
    clear: none;
    margin-left: 10px;
    font-weight: bold;
    border: 1px solid;
    padding: 5px;
    color: #0a1d37;
    font-size: 15px;
  }
}
.with {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.createBtn {
  background-color: #f21170;
  border-color: #f81775;
}

.createBtn:hover {
  background-color: #fd9bc4;
  border-color: #f81775;
}

.note-list {
  margin: 20px auto;
  max-width: 500px;
}

.note-list p {
  color: rgb(156, 156, 156);
  font-size: 15px;
  margin-left: 10px;
}

@media (max-width: 475px) {
  .note-list {
    max-width: 350px;
  }
}
</style>
