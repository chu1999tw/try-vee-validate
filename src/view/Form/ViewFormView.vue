<template>
  <div>
    <BaseForm mode="view">
      <template #buttons>
        <MyButton type="button" class="info" @click="handleCancel">
          <template #content> 返回 </template>
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

const handleCancel = () => {
  router.push({ name: "home" });
};
</script>

<style scoped></style>
