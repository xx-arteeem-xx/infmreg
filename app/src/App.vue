<script>

</script>

<template>
  <div class="container my-5">
    <img src="./components/logo.png" class="mb-3">
    <h1>Регистрация обращений</h1>
    <p class="lead mb-3">Текущая аудитория: 5-305
      <br>Вид проблемы: Техническая неисправность</p>
    <form action="/">
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          <i class="fa-solid fa-user"></i>
        </span>
        <input type="text" class="form-control" placeholder="ФИО">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          <i class="fa-solid fa-phone"></i>
        </span>
        <input type="text" class="form-control" placeholder="Номер телефона">
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