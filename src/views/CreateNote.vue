<template>
  <el-page-header style="margin: 10px; font-weight: bold; color: #0a1d37;" icon="el-icon-arrow-left" content="Home" @click="goBack"></el-page-header>
  <div class="createnote">
    <h1 style="color: #0a1d37">Take new note</h1>
    <el-card class="box-card">
      <form @submit="createNote">
        <h4 style="text-align: start">Title:</h4>
        <el-input
          type="text"
          placeholder="Please input"
          v-model="noteTitle"
          maxlength="35"
          show-word-limit
          class="input"
          required
        >
        </el-input>
        <div style="margin: 20px 0"></div>
        <h4 style="text-align: start">Short Note:</h4>
        <el-input
          class="input"
          type="textarea"
          placeholder="Please input"
          v-model="noteDetail"
          maxlength="100"
          show-word-limit
          required
        >
        </el-input>
        <el-button class="createBtn" native-type="submit" type="danger"
          >Create new note</el-button
        >
      </form>
    </el-card>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useCollection } from "@/composable/useCollection.js";
import { timestamp } from "@/firebase/config.js"
export default {
  setup() {
    const noteTitle = ref(null);
    const noteDetail = ref(null);
    const { addNote } = useCollection();
    const router = useRouter();

    const createNote = () => {
      let newNote = {
        title: noteTitle.value,
        note: noteDetail.value,
        createdAt: timestamp()
      };

      addNote(newNote);

      noteTitle.value = null;
      noteDetail.value = null;

      router.push({ name: "Home" });
    };

    const goBack = () => {
      router.push({ name: "Home" });
    }

    return { noteTitle, noteDetail, createNote, goBack };
  },
};
</script>


<style lang="scss" scoped>
.createBtn {
  background-color: #f21170;
  border-color: #f81775;
  width: 100%;
  margin-top: 20px;
}

.createBtn:hover {
  background-color: #fd9bc4;
  border-color: #f81775;
}

.createBtn:focus {
  background-color: #fd9bc4;
  border-color: #f81775;
}
</style>