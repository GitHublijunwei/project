<template>
    <div class="load_main">
      <p>
        <span :style="'width:'+data+'px'"></span>
      </p>
    </div>
</template>

<script>
  export default {
    name: 'load',
    data () {
      return {
        data: 0
      }
    },
    mounted: function () {
      this.hand()
    },
    methods: {
      hand () {
        this.data = 100
      }
    }
  }
</script>

<style scoped>

</style>
