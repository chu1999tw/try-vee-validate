<template>
  <div>
    <BaseForm @submit="handleEdit" mode="edit" :initData="formData">
      <template #buttons="{valid}">
        <MyButton type="button" class="info" @click="handleCancel">
          <template #content> 取消 </template>
        </MyButton>

        <MyButton type="submit" :disabled="!valid">
          <template #content> 送出 </template>
        </MyButton>
      </template>
    </BaseForm>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import BaseForm from '../../components/BaseForm.vue'
import MyButton from '../../components/MyButton.vue'
import {useRouter, useRoute} from 'vue-router'
import {useFormStore} from '../../store/useFormStore'

const route = useRoute()
const router = useRouter()
const formStore = useFormStore()

const formData = ref({})

const handleEdit = (formData) => {
  // 撰寫邏輯：欲編輯的表單資料
  alert(JSON.stringify(formData, null, 2))
}

const handleCancel = () => {
  router.push({name: 'home'})
}

onMounted(async () => {
  const id = route.query.id

  // 模擬取得商品資料
  const data = await formStore.getProductData(id)

  formData.value = {...data}
})
</script>

<style scoped></style>
