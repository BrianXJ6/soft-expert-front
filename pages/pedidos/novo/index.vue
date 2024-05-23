<template>
  <div>
    <h3>Venda</h3>
    <p class="lead">
      Abaixo escolha o produto que deseja adicionar ao pedido.
    </p>
    <b-form-group id="input-group-1" label="Produto:" label-for="input-1">
      <b-form-select
        id="input-1"
        v-model="productSelected"
        :options="optionProducts"
        required
      />
    </b-form-group>
    <b-button @click="addToOrder(productSelected)">
      Adicionar
    </b-button>
    <hr>
    <div class="row">
      <div v-for="(prod, i) in products" :key="i" class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title" v-text="prod.name" />
            <p>Valor: {{ prod.value }}</p>
            <b-form-group :id="`input-group-${prod.id}`" class="m-0" label="Quantidade:" :label-for="`input-${prod.id}`">
              <b-form-input
                :id="`input-${prod.id}`"
                v-model="prod.qtd"
                type="number"
                step="1"
                min="1"
                required
              />
            </b-form-group>
          </div>
          <div class="card-footer p-1">
            <button class="btn btn-danger btn-block" @click="products.splice(i, 1)" v-text="'Remover'" />
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-primary mt-3" :disabled="!products.length" @click="storeOrder">
      Enviar pedido
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Product } from '~/interfaces/products'
import apiProducts from '~/plugins/products'

export default Vue.extend({
  data: () => ({
    products: [] as any,
    productSelected: '' as (string | Product),

    optionProducts: [
      { text: 'Selectione', value: '' }
    ] as Array<Object>,

    fields: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Produto' },
      { key: 'value', label: 'Valor' },
      { key: 'type', label: 'Tipo' },
      { key: 'tax', label: 'Imposto %' },
      { key: 'qtd', label: 'Qtd' }
    ]
  }),

  created () {
    this.getProducts()
  },

  methods: {
    async getProducts () {
      const res = await apiProducts.getProducts()

      this.optionProducts = [
        ...this.optionProducts,
        ...res.map(item => ({ text: item.name, value: item }))
      ]
    },

    addToOrder (product: any) {
      if (typeof product !== 'object') {
        alert('Selecione um produto!')
        return
      }

      if (this.products.findIndex((item: any) => item.id === product.id) >= 0) {
        alert(`Produto: ${product.name} já foi adicionado!`)
        return
      }

      const newPdt = Object.assign({}, product)
      newPdt.qtd = 1

      this.products.push(newPdt)
      alert(`Produto: ${product.name} adicionado ao pedido!`)
      this.productSelected = ''
    },

    async storeOrder () {
      if (!this.products.length) {
        alert('Nenhum produto adicionado ao pedido!')
        return
      }

      await this.$axios.post('/api/pedidos', this.products)
      alert('Pedido criado com sucesso!')
      this.$router.push('/')
    }
  }
})
</script>
