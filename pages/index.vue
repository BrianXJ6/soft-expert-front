<template>
  <div>
    <h3>Ultimos pedidos:</h3>
    <b-table responsive hover :items="orders" :fields="fields">
      <template #cell(products)="data">
        <b-button v-b-modal="`modal-${data.index}`" size="sm">
          Ver produtos ({{ data.value.length }})
        </b-button>
        <b-modal :id="`modal-${data.index}`" :title="`Produtos do pedido: ${data.item.id}`">
          <div class="accordion">
            <b-card v-for="(product, i) in data.value" :key="i" no-body>
              <b-card-header class="p-1">
                <b-button v-b-toggle="`accordion-${i}`" block>
                  {{ product.name }}
                </b-button>
              </b-card-header>
              <b-collapse :id="`accordion-${i}`" accordion="my-accordion">
                <b-card-body>
                  <b-card-text>Tipo: {{ product.type }}</b-card-text>
                  <b-card-text>Quantidade: {{ product.qtd }}</b-card-text>
                  <b-card-text>Valor do produto (un): {{ product.unitary_value }}</b-card-text>
                  <b-card-text>Imposto %: {{ product.tax }}</b-card-text>
                  <b-card-text>Valor s/ imposto: {{ product.total_without_tax }}</b-card-text>
                  <b-card-text>Valor do imposto: {{ product.total_percentage }}</b-card-text>
                  <b-card-text>Valor total: {{ product.total_with_tax }}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-modal>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AxiosResponse } from 'axios'
import { ApiResponse } from '~/interfaces/api'

export default Vue.extend({
  data: () => ({
    orders: [] as Object[],
    fields: [
      { key: 'id', label: 'Nº do pedido', sortable: true },
      { key: 'total_without_tax', label: 'Valor total produtos', sortable: true },
      { key: 'total_percentage', label: 'Valor total impostos', sortable: true },
      { key: 'total_with_tax', label: 'Valor total pedido', sortable: true },
      { key: 'products', label: 'Produtos' }
    ]
  }),

  created () {
    this.getOrders()
  },

  methods: {
    async getOrders () {
      const res: AxiosResponse<ApiResponse<Object[]>> = await this.$axios.get('api/pedidos')
      this.orders = Object.entries(res.data.data).map(([, v]) => v)
    }
  }
})
</script>
