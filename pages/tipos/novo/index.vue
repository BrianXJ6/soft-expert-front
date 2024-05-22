<template>
  <b-form @submit.prevent="store">
    <b-form-group id="input-group-1" label="Tipo:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="form.type"
        required
      />
    </b-form-group>
    <b-form-group id="input-group-2" label="Imposto:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="form.tax"
        type="number"
        step=".01"
        required
      />
    </b-form-group>
    <b-button type="submit" variant="primary">
      Enviar
    </b-button>
  </b-form>
</template>

<script lang="ts">
export default {
  data: () => ({
    form: { type: '', tax: '' }
  }),

  methods: {
    async store () {
      await this.$axios.post('api/tipos', this.form)
      alert('Tipo de produto criado com sucesso!')
      this.$router.push('/tipos/listagem')
    }
  }
}
</script>
