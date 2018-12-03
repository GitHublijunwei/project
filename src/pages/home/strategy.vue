<template>
  <div class="strategy">
    <div class="lists">
      <div class="list" v-for="(list,i) in lists" :key="i" @click="jumpTo({name:'detail',query:{id:list.id}})">
        <p>{{list.title}}</p>
        <p>{{list.created_at}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'strategy',
    data () {
      return {
        lists: []
      }
    },
    ready () {},
    mounted () {
      this.getLists()
    },
    methods: {
      getLists () {
        this.$http.post('/m1/index/notice-list').then((res) => {
          if (res.code === 0) {
            console.log(res)
            this.lists = res.data
          } else {
            this.$vux.toast.text(res.msg)
          }
        }).catch((res) => {
          console.log(res)
        })
      }
    }
  }
</script>


