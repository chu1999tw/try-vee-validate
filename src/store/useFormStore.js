import {defineStore} from 'pinia'

export const useFormStore = defineStore('useFormStore', () => {
  const getProductData = async (id) => {
    // 模擬api請求
    return await new Promise((resolve) => {
      const randomPrice = Math.floor(Math.random() * 10000)
      const randomQuantity = Math.floor(Math.random() * 100)
      const randomPromotion = Math.random() * 2 > 1 ? '1' : '0'

      setTimeout(() => {
        resolve({
          id: id,
          name: 'Product ' + id,
          quantity: randomQuantity,
          price: randomPrice,
          promotion: randomPromotion,
        })
      }, 1000)
    })
  }

  const resetProductData = () => {
    return {
      id: '',
      name: '',
      quantity: 0,
      price: '',
      promotion: '0',
    }
  }

  return {
    getProductData,
    resetProductData,
  }
})
