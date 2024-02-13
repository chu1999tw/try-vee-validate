<script setup>
import {ref} from 'vue'
import DynamicForm from '../../components/DynamicForm.vue'
import * as yup from 'yup'

const formSchema = {
  fields: [
    {
      label: 'Your Name',
      name: 'name',
      as: 'input',
      rules: yup.string().required('Name is required'),
    },
    {
      label: 'Your Email',
      name: 'email',
      as: 'input',
      autocomplete: 'username',
      rules: yup.string().email('Invalid email').required('Email is required'),
    },
    {
      label: 'Your Password',
      name: 'password',
      as: 'input',
      type: 'password',
      autocomplete: 'current-password',
      yup: yup
        .string()
        .required('Password is required')
        .min(6, '密码长度不能小于6位') // min 验证失败时的错误消息
        .max(12, '密码长度不能超过12位'), // max 验证失败时的错误消息
    },
    {
      label: 'Favorite Drink',
      name: 'drink',
      as: 'select',
      children: [
        {
          tag: 'option',
          value: '',
          text: '',
          disabled: true,
        },
        {
          tag: 'option',
          value: 'coffee',
          text: 'Coffeee',
        },
        {
          tag: 'option',
          value: 'tea',
          text: 'Tea',
        },
        {
          tag: 'option',
          value: 'coke',
          text: 'Coke',
        },
      ],
    },
  ],
}

const submit = (values) => {
  console.log(values)
}
</script>

<template>
  <DynamicForm :schema="formSchema" @submit="submit" />
</template>

<style lang="scss" scoped></style>
