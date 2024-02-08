<template>
  <div>
    <BaseForm @submit-form="handleEdit" mode="edit">
      <template #buttons>
        <MyButton type="button" class="info" @click="handleCancel">
          <template #content> 取消 </template>
        </MyButton>

        <MyButton type="submit">
          <template #content> 送出 </template>
        </MyButton>
      </template>
    </BaseForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseForm from "../../components/BaseForm.vue";
import MyButton from "../../components/MyButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleEdit = () => {
  console.log("edit");
};

const handleCancel = () => {
  router.push({ name: "home" });
};
</script>

<style scoped></style>
