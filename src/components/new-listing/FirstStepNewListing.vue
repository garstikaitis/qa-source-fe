<template>
	<div class="flex flex-col items-center h-inherit">
    <div class="flex flex-col w-3/5">
      <h1 class="text-3xl font-body text-blue-700">Add new tool</h1>
      <p class="mb-8 text-gray-700 text-lg">Add new tool so it becomes available on the platform</p>
      <div>Give it a name <span class="text-gray-500">(shown in listings page)</span></div>
      <el-input class="mb-4" :value="builder.name" @input="handleBuilderUpdate({ key: 'name', value: $event })" placeholder="Bosch GSR" />
      <el-button @click="handleNext" type="primary">Continue</el-button>
      <img src="../../assets/undraw/process.svg" class="max-w-md m-auto mt-12" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'first-step-new-listing',
  computed: {
    builder() {
      return this.$store.state.builder;
    }
  },
  methods: {
    handleNext() {
      if(!this.builder.name.length) {
        this.$notify({
          title: 'Oops',
          message: 'Name cannot be empty',
          type: 'error',
          position: 'bottom-right'
        });
      } else {
        this.handleBuilderUpdate({ key: 'step', value: 1 })
      }
    },
    handleBuilderUpdate({ key, value }) {
      this.$store.commit('builder/SET_BUILDER', { key, value });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>