<template>
  <div>
    <BaseForm @submit="handleCreate" mode="create" :initData="data">
      <template #buttons>
        <MyButton type="button" class="info" @click="handleCancel">
          <template #content> 取消 </template>
        </MyButton>

        <MyButton type="submit">
          <template #content> 送出 </template>
        </MyButton>
      </template>

      <template #another>
        <p>{{ data }}</p>
      </template>
    </BaseForm>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import BaseForm from "../../components/BaseForm.vue";
import MyButton from "../../components/MyButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const data = ref({
  id: "",
  name: "",
  quantity: 0,
  price: "",
  promotion: "0",
});

const handleCreate = (value) => {
  // data.value = formData;
  console.log({ value });
};

watch(data, () => console.log(data.value), { deep: true });

const handleCancel = () => {
  router.push({ name: "home" });
};
</script>

<style scoped></style>
