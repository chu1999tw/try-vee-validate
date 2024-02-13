<template>
  <div>
    <BaseForm @submit="handleCreate" mode="create">
      <!--
        使用 meta.valid判斷 表單是否通過驗證 
        通過 => 送出按鈕才會啟用 
      -->
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
import {ref} from 'vue'
import BaseForm from '../../components/BaseForm.vue'
import MyButton from '../../components/MyButton.vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const handleCreate = (formData) => {
  // 撰寫邏輯：欲新增的表單資料
  alert(JSON.stringify(formData, null, 2))
}

const handleCancel = () => {
  router.push({name: 'home'})
}
</script>

<style scoped></style>
