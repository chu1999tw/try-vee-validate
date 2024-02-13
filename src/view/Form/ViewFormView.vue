<template>
  <div>
    <BaseForm mode="view" :initData="formData">
      <template #buttons>
        <MyButton type="button" class="info" @click="handleCancel">
          <template #content> 返回 </template>
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

const formStore = useFormStore()
const route = useRoute()
const router = useRouter()

const formData = ref({})

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
