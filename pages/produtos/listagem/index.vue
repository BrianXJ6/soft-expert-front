<template>
  <div>
    <b-table hover :items="products" :fields="fields" />
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    products: [],
    fields: [
      {
        key: 'id',
        label: 'ID',
        sortable: true
      },
      {
        key: 'name',
        label: 'Produto',
        sortable: true
      },
      {
        key: 'value',
        label: 'Valor',
        sortable: true
      },
      {
        key: 'type',
        label: 'Tipo',
        sortable: true
      },
      {
        key: 'tax',
        label: 'Imposto %',
        sortable: true
      }
    ]
  }),

  created () {
    this.getProducts()
  },

  methods: {
    async getProducts () {
      const resp = await this.$axios.get('api/produtos')
      this.products = resp.data.data
    }
  }
}
</script>
