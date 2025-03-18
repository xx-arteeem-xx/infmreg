<script>

  export default {
    props: {
          building: String,
          room: String,
          problemtypeid: String
    },

    data() {
      return {
        techProblemSelected: 0,

        problemTypes: [
          "Проблемa с техникой",
          "Проблемa с мебелью",
          "Проблемa с электричеством"
        ],

        dataset: {
          workers: [
            "Воробьёв Казимир Оскарович",
            "Дмитриев Севастьян Викторович",
            "Константинов Эрик Петрович",
            "Цветков Ярослав Ростиславович",
            "Белозёров Ибрагил Робертович",
            "Кулагина Виргиния Львовна",
            "Гурьева Лили Арсеньевна",
            "Дмитриева Юфеза Протасьевна",
            "Дорофеева Силика Николаевна",
            "Тимофеева Валентина Артёмовна"
          ],
          problems: {
            tech: [
              {
                name: "Не работает монитор",
                solutions: ["Проверьте, включен ли монитор", "Второй пункт"]
              },
              {
                name: "Не работает проектор",
                solutions: ["Проверьте, включен ли проектор", "Второй пункт"]
              },
              {
                name: "Не включется ПК",
                solutions: ["Проверьте, включен ли ПК", "Второй пункт"]
              },
              {
                name: "Не работает интернет",
                solutions: ["Проверьте, включен ли интернет", "Второй пункт"]
              }
            ]
          }
        }
      }
    },

    methods: {
      needReg() {
        this.techProblemSelected = 1000
      }
    }
  }
</script>

<template>
  <div class="container my-5">
    <img src="../assets/logo.png" class="mb-3">
    <h1>Регистрация обращения</h1>
    <p class="lead mb-3">Текущая аудитория: {{ building }}-{{ room }}
      <br>Вид проблемы: {{ problemTypes[problemtypeid] }}</p>
    <form :action="$route.fullPath">

      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect02">
          <i class="fa-solid fa-land-mine-on"></i>
        </label>
        <select class="form-select" id="inputGroupSelect02" v-model="techProblemSelected">
          <option value="0">Выберите проблему</option>
          <option v-for="(techProblem, id) in dataset.problems.tech" :value="id+1">{{ techProblem.name }}</option>
          <option value="1000">Другое</option>
        </select>
      </div>

      <div class="problemSolution" v-if="(techProblemSelected > 0) && (techProblemSelected < 1000)">
        <h3>Попробуйте выполнить следующие шаги:</h3>
        <ol>
          <li v-for="(solution, id) in dataset.problems.tech[techProblemSelected-1].solutions">
            {{ solution }}
          </li>
        </ol>

        <button class="btn btn-outline-secondary" @click="needReg">
          Не помогает!
        </button>
      </div>

      <div class="ifNeedReg" v-if="techProblemSelected == 1000">
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01">
            <i class="fa-solid fa-user"></i>
          </label>
          <select class="form-select" id="inputGroupSelect01">
            <option selected>ФИО</option>
            <option v-for="(worker, id) in dataset.workers" :value="id+1">{{ worker }}</option>
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