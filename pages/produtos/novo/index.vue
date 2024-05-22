<template>
  <b-form @submit.prevent="store">
    <b-form-group id="input-group-1" label="Tipo:" label-for="input-1">
      <b-form-select
        id="input-1"
        v-model="form.product_type_id"
        :options="productTypes"
        required
      />
    </b-form-group>
    <b-form-group id="input-group-2" label="Nome do produto:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="form.name"
        required
      />
    </b-form-group>
    <b-form-group id="input-group-3" label="Valor do produto:" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="form.value"
        type="number"
        step=".01"
        required />
    </b-form-group>
    <b-button type="submit" variant="primary">
      Enviar
    </b-button>
  </b-form>
</template>

<script lang="ts">
export default {
  data: () => ({
    form: {
      product_type_id: '',
      name: '',
      value: ''
    },
    productTypes: [{ text: 'Selecione', value: '' }]
  }),

  created () {
    this.getProductTypes()
  },

  methods: {
    async getProductTypes () {
      const resp = await this.$axios.get('api/tipos')
      this.productTypes = [
        ...this.productTypes,
        ...resp.data.data.map((item: { type: string; id: number }) => ({ text: item.type, value: item.id }))

      ]
    },
    async store () {
      await this.$axios.post('api/produtos', this.form)
      alert('Produto criado com sucesso!')
      this.$router.push('/produtos/listagem')
    }
  }
}
</script>
