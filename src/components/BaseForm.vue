<template>
  <Form class="myForm" @submit="onSubmit(e)" :validation-schema="schema">
    <h3>{{ title }}商品表單</h3>

    <!-- 表單輸入框 -->
    <div class="row">
      <label for="id" class="myLabel align-self-start" required>商品代號</label>
      <Field name="id" v-slot="{ field, errorMessage }" v-model="formData.id">
        <div class="d-flex flex-column w-100">
          <input
            v-bind="field"
            :class="{ error: errorMessage }"
            id="id"
            type="text"
            placeholder="請輸入商品代號"
            :disabled="props.mode === 'view' || props.mode === 'edit'"
          />
          <span class="error">{{ errorMessage }}</span>
        </div>
      </Field>
    </div>

    <div class="row">
      <label for="name" class="myLabel align-self-start" required
        >商品名稱</label
      >
      <Field
        name="name"
        v-slot="{ field, errorMessage }"
        v-model="formData.name"
      >
        <div class="d-flex flex-column w-100">
          <input
            v-bind="field"
            :class="{ error: errorMessage }"
            id="name"
            type="text"
            placeholder="請輸入商品名稱"
            :disabled="props.mode === 'view'"
          />
          <span class="error">{{ errorMessage }}</span>
        </div>
      </Field>
    </div>
    <div class="row">
      <label for="quantity" class="myLabel align-self-start" required
        >數量</label
      >
      <Field
        name="quantity"
        v-slot="{ field, errorMessage }"
        v-model="formData.quantity"
      >
        <div class="d-flex flex-column w-100">
          <input
            v-bind="field"
            :class="{ error: errorMessage }"
            id="quantity"
            type="number"
            placeholder="請輸入數量"
            :disabled="props.mode === 'view'"
          />
          <span class="error">{{ errorMessage }}</span>
        </div>
      </Field>
    </div>
    <div class="row">
      <label for="price" class="myLabel align-self-start" required>售價</label>
      <Field
        name="price"
        v-slot="{ field, errorMessage }"
        v-model="formData.price"
      >
        <div class="d-flex flex-column w-100">
          <input
            v-bind="field"
            :class="{ error: errorMessage }"
            id="price"
            type="text"
            placeholder="請輸入售價"
            :disabled="props.mode === 'view'"
          />
          <span class="error">{{ errorMessage }}</span>
        </div>
      </Field>
    </div>

    <div class="row">
      <label for="price">特價標籤</label>
      <Field name="promotion" v-slot="{ field }" v-model="formData.promotion">
        <MySwitch v-bind="field" :disabled="props.mode === 'view'" />
      </Field>
    </div>

    <div class="line"></div>

    <!-- 表單按鈕區 -->
    <div class="button-area">
      <slot name="buttons"></slot>
    </div>

    <slot name="another"></slot>
    <pre>formData {{ formData }}</pre>
  </Form>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { Field, Form, useForm } from "vee-validate";
import MySwitch from "./MySwitch.vue";
import * as yup from "yup";

const { handleSubmit, values } = useForm({
  initialValues: {
    id: "",
    name: "",
    quantity: 0,
    price: "",
    promotion: "1",
  },
});

const props = defineProps({
  // 表單類型
  mode: {
    type: String,
    required: true,
  },

  // 定義初始資料
  initData: {
    type: Object,
    required: false,
    default: () => {
      return { id: "", name: "", quantity: 0, price: "", promotion: "1" };
    },
  },
});

const emit = defineEmits(["submit"]);

// 表單定義的資料
const formData = ref({ ...props.initData });

// 表單顯示的標題
const title = computed(() => {
  const map = {
    create: "新增",
    edit: "編輯",
    view: "查看",
  };

  if (!props.mode) {
    return "";
  }

  return map[props.mode];
});

// 表單送出事件
const onSubmit = handleSubmit((values, actions) => {
  console.log(values, actions);
  // emit("submit", value);
});

// watch(
//   formData,
//   () => {
//     // console.log({ formData });
//   },
//   {
//     deep: true,
//   },
// );

// 驗證邏輯：
const schema = yup.object().shape({
  id: yup.string().required("商品代號為必填"),
  name: yup.string().required("商品名稱為必填"),
  quantity: yup.number().required("商品數量為必填").positive().integer(),
  price: yup.string().required("商品價格為必填"),
  promotion: yup.string(),
});
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
      content: "*";
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

  &.error {
    border: 1px solid red;
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
  color: red;
}
</style>
