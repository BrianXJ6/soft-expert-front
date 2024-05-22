<template>
  <div>
    <b-table hover :items="productTypes" :fields="fields" />
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    productTypes: [],
    fields: [
      {
        key: 'id',
        label: 'ID',
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
    this.getProductTypes()
  },

  methods: {
    async getProductTypes () {
      const resp = await this.$axios.get('api/tipos')
      this.productTypes = resp.data.data
    }
  }
}
</script>
