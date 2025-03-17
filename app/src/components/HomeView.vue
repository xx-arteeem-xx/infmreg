<script setup>
  const props = defineProps({
    building: String,
    room: String,
    problemtypeid: String
  });

  const problemTypes = [
    "Проблемa с техникой",
    "Проблемa с мебелью",
    "Проблемa с электричеством"
  ]

  const dataset = {
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
    ]
  }
</script>

<template>
  <div class="container my-5">
    <img src="../assets/logo.png" class="mb-3">
    <h1>Регистрация обращения</h1>
    <p class="lead mb-3">Текущая аудитория: {{ building }}-{{ room }}
      <br>Вид проблемы: {{ problemTypes[props.problemtypeid] }}</p>
    <form :action="$route.fullPath">
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
        <input type="text" class="form-control" placeholder="Номер телефона" maxlength="10" minlength="10" value="+7">
      </div>
      <div class="input-group">
        <span class="input-group-text">
          <i class="fa-solid fa-land-mine-on"></i>
        </span>
        <textarea class="form-control" placeholder="Опишите свою проблему"></textarea>
      </div>
      <button type="submit" class="btn btn-outline-secondary my-3">Отправить</button>
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