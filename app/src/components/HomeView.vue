<script>

  export default {
    props: {
          building: String,
          room: String,
          problemtypeid: String
    },

    data() {
      return {
        problemSelected: 0,

        problem_type: "",
        workers: [],
        problems: [],
        problem: []
      }
    },

    methods: {
      needReg() {
        this.problemSelected = 1000
      },

      getProblemType() {
          fetch(`http://85.209.9.166:3000/api/get/problem_type/${this.problemtypeid}`, {
            method: "GET",
            headers: {
              
            },
          })
            .then((response) => {
              response.json().then((data) => {
                this.problem_type = data[0].name
              });
            })
            .catch((err) => {
              console.error(err);
            });
      },

      getWorkers() {
          fetch(`http://85.209.9.166:3000/api/get/workers`, {
            method: "GET",
            headers: {
              
            },
          })
            .then((response) => {
              response.json().then((data) => {
                this.workers = data
              });
            })
            .catch((err) => {
              console.error(err);
            });
      },

      getProblems() {
          fetch(`http://85.209.9.166:3000/api/get/problems/${this.problemtypeid}`, {
            method: "GET",
            headers: {
              
            },
          })
            .then((response) => {
              response.json().then((data) => {
                this.problems = data
              });
            })
            .catch((err) => {
              console.error(err);
            });
      },

      getProblem() {
          fetch(`http://85.209.9.166:3000/api/get/problem/${this.problemSelected}`, {
            method: "GET",
            headers: {
              
            },
          })
            .then((response) => {
              response.json().then((data) => {
                this.problem = data[0]
              });
            })
            .catch((err) => {
              console.error(err);
            });
      },

    },

    mounted() {
      this.getProblemType();
      this.getWorkers();
      this.getProblems();
    }
  }
  
</script>

<template>
  <div class="container my-5">
    <img src="../assets/logo.png" class="mb-3">
    <h1>Регистрация обращения</h1>
    <p class="lead mb-3">Текущая аудитория: {{ building }}-{{ room }}
      <br>Вид проблемы: {{ problem_type }}</p>
    <form :action="$route.fullPath">

      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect02">
          <i class="fa-solid fa-land-mine-on"></i>
        </label>
        <select class="form-select" id="inputGroupSelect02" v-model="problemSelected" @change="getProblem()">
          <option value="0">Выберите проблему</option>
          <option v-for="problem in problems" :value="problem.id">{{ problem.name }}</option>
          <option value="1000">Другое</option>
        </select>
      </div>

      <div class="problemSolution" v-if="(problemSelected > 0) && (problemSelected < 1000)">
        <h3>Попробуйте выполнить следующие шаги:</h3>
        <ol>
          <li v-for="solution in problem.solutions">
            {{ solution }}
          </li>
        </ol>

        <button class="btn btn-outline-secondary" @click="needReg">
          Не помогает!
        </button>
      </div>

      <div class="ifNeedReg" v-if="problemSelected == 1000">
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01">
            <i class="fa-solid fa-user"></i>
          </label>
          <select class="form-select" id="inputGroupSelect01">
            <option selected>ФИО</option>
            <option v-for="(worker, id) in workers" :value="id+1">{{ worker.name }}</option>
          </select>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            <i class="fa-solid fa-phone"></i>
          </span>
          <input type="text" class="form-control" placeholder="Номер телефона" maxlength="12" minlength="12" value="+7">
        </div>

        <div class="input-group" >
          <span class="input-group-text">
            <i class="fa-solid fa-land-mine-on"></i>
          </span>
          <textarea class="form-control" placeholder="Опишите свою проблему"></textarea>
        </div>

        <button type="submit" class="btn btn-outline-secondary my-3">Отправить</button>
      </div>

    </form>
  </div>
</template>

<style>
  textarea{
    height: 40vh;
  }
  img{
    width: 50vw;
  }
</style>