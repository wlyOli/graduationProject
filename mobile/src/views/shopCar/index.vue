<template>
<div>  
van-sku
    <!-- 基础用法 --> 
      <div>
        <van-sku
          v-model="showBase"
          :sku="skuData.sku"
          :goods="skuData.goods_info"
          :goods-id="skuData.goods_id"
          :hide-stock="skuData.sku.hide_stock"
          :quota="skuData.quota"
          :quota-used="skuData.quota_used"
          :initial-sku="initialSku"
          reset-stepper-on-hide
          reset-selected-sku-on-hide
          disable-stepper-input
          :close-on-click-overlay="closeOnClickOverlay" 
          :custom-sku-validator="customSkuValidator" 
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked" 
		/>
		
        <van-button
          type="primary"
          @click="showBase = true"
        >
          商品规格
        </van-button>
		
      </div>
 
</div>
</template>

<script> 
import skuData from '../../../public/data.js'; 
export default {  
  data() {
    return {
      skuData:skuData,
      showBase: true,
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true,
      initialSku: { //默认选中
        s1: '30349',
        s2: '1193',
        selectedNum: 3
      },
      customSkuValidator: () => '请选择xxx!', 
    };
  },
  methods: {
	onAddCartClicked(data) { //加入购物车
	    this.$toast('add cart:' + JSON.stringify(data));
	},
    onBuyClicked(data) { //立即购买
      this.$toast('buy:' + JSON.stringify(data));
      console.log(JSON.stringify(data))
    }
	
  }
};
</script>

<style scoped="scoped">
	
</style>


