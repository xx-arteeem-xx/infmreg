<template>
  <div class="hello">
    <h1>User:</h1>
    <hr>
    <h2 v-if="name">{{ name }}</h2>
    <p v-if="desc">{{ desc }}</p>
    <hr>
    <button @click="fetchData">Click Me!</button>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      name: "",
      desc: "",
    };
  },
  methods: {
    fetchData() {
      fetch('http://localhost:3000/api/getusers', {
        method: "GET",
        headers: {
          
        },
      })
        .then((response) => {
          response.json().then((data) => {
            this.name = data[0].name;
            this.desc = data[0].desc;
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
  button {
    padding: 12px 32px;
    font-size: 16px;
    border-radius: 8px;
    margin: 10px 0;
  }
</style>