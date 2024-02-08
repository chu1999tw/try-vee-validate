<template>
  <div>
    <MyButton @click="handleCreate">
      <template #content> create </template>
    </MyButton>
    <MyButton @click="handleEdit">
      <template #content> edit </template>
    </MyButton>
    <MyButton @click="handleView">
      <template #content> view </template>
    </MyButton>
  </div>
</template>

<script setup>
import MyButton from "../components/MyButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 新增表單
const handleCreate = () => {
  router.push({ name: "create" });
};

// 編輯表單
const handleEdit = () => {
  router.push({ name: "edit", query: { id: 1 } });
};

// 唯讀表單
const handleView = () => {
  router.push({ name: "view", query: { id: 1 } });
};
</script>

<style scoped>
div {
  display: flex;
  gap: 8px;
}
</style>
