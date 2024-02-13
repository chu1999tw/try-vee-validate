<template>
  <form class="myForm" @submit.prevent="onSubmit">
    <h3>{{ title }}商品表單</h3>

    <!-- 表單輸入框 -->
    <div class="row">
      <label for="id" class="myLabel align-self-start" required>商品代號</label>

      <div class="d-flex flex-column w-100">
        <input
          id="id"
          v-model="id"
          v-bind="idAttrs"
          :class="{error: errors.id}"
          type="text"
          placeholder="請輸入商品代號"
          :disabled="props.mode === 'view' || props.mode === 'edit'"
        />
        <span class="errorText">{{ errors.id }}</span>
      </div>
    </div>

    <div class="row">
      <label for="name" class="myLabel align-self-start" required>商品名稱</label>

      <div class="d-flex flex-column w-100">
        <input
          id="name"
          v-model="name"
          v-bind="nameAttrs"
          :class="{error: errors.name}"
          type="text"
          placeholder="請輸入商品名稱"
          :disabled="props.mode === 'view'"
        />
        <span class="errorText">{{ errors.name }}</span>
      </div>
    </div>
    <div class="row">
      <label for="quantity" class="myLabel align-self-start" required>數量</label>

      <div class="d-flex flex-column w-100">
        <input
          id="quantity"
          v-model="quantity"
          v-bind="quantityAttrs"
          :class="{error: errors.quantity}"
          type="number"
          placeholder="請輸入數量"
          :disabled="props.mode === 'view'"
        />
        <span class="errorText">{{ errors.quantity }}</span>
      </div>
    </div>
    <div class="row">
      <label for="price" class="myLabel align-self-start" required>售價</label>

      <div class="d-flex flex-column w-100">
        <input
          id="price"
          v-model="price"
          v-bind="priceAttrs"
          :class="{error: errors.price}"
          type="text"
          placeholder="請輸入售價"
          :disabled="props.mode === 'view'"
        />
        <span class="errorText">{{ errors.price }}</span>
      </div>
    </div>

    <div class="row">
      <label for="price">特價標籤</label>

      <MySwitch v-model="promotion" v-bind="promotionAttrs" :disabled="props.mode === 'view'" />
    </div>

    <div class="line"></div>

    <!-- 表單按鈕區 -->
    <div class="button-area">
      <slot name="buttons" v-bind="meta"> </slot>
    </div>
  </form>
</template>

<script setup>
import {computed, watch} from 'vue'
import {useForm} from 'vee-validate'
import MySwitch from './MySwitch.vue'
import * as yup from 'yup'

// 驗證邏輯：
const schema = yup.object({
  id: yup.string().required('商品代號為必填'),
  name: yup.string().required('商品名稱為必填'),
  quantity: yup.number().required('商品數量為必填').positive('必須為正整數').integer(),
  price: yup.string().required('商品價格為必填'),
  promotion: yup.string(),
})

// 表單模式 新增 || 編輯 || 查看
const props = defineProps({
  // 表單類型
  mode: {
    type: String,
    required: true,
  },
  initData: {
    type: Object,
    required: false,
  },
})

const {defineField, errors, meta, handleSubmit, setValues} = useForm({
  validationSchema: schema,
  initialValues: {
    id: '',
    name: '',
    quantity: 0,
    price: '',
    promotion: '0',
  },
})

const [id, idAttrs] = defineField('id')
const [name, nameAttrs] = defineField('name')
const [quantity, quantityAttrs] = defineField('quantity')
const [price, priceAttrs] = defineField('price')
const [promotion, promotionAttrs] = defineField('promotion')

const emit = defineEmits(['submit', 'get-form-info'])

// 表單顯示的標題
const title = computed(() => {
  const map = {
    create: '新增',
    edit: '編輯',
    view: '查看',
  }

  if (!props.mode) {
    return ''
  }

  return map[props.mode]
})

// 監聽父層組件資料變化
watch(
  () => props.initData,
  (newFormData) => {
    setValues(newFormData)
  },
  {deep: true}
)

// 表單送出事件
const onSubmit = handleSubmit((values) => {
  // 按下送出按鈕時，將表單資料帶給父組件
  emit('submit', values)
})
</script>

<style scoped>
.myForm {
  width: 600px;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  background-color: #fff;
}

h3 {
  text-align: center;
}

.row {
  display: flex;
  align-items: center;
  gap: 16px;
}

label {
  min-width: 80px;
  display: flex;
  gap: 4px;

  &[required] {
    &:after {
      content: '*';
      color: red;
      font-size: 12px;
    }
  }
}

.myLabel {
  line-height: 40px;
}

input {
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #7799cc;
  border-radius: 4px;
  height: 40px;

  &:focus {
    border: 2px solid #7799cc;
  }
  &.error {
    border: 1px solid red !important;
  }

  &[disabled] {
    background-color: #f0f0f0;
    border: 1px solid #999;
    cursor: not-allowed;
  }
}

.line {
  border-top: 2px dashed #ccc;
}

.button-area {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.align-self-start {
  align-self: flex-start;
}

.w-100 {
  width: 100%;
}

.error {
  font-size: 12px;
}

.errorText {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
