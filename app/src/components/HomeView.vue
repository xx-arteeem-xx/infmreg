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

            workerid: 0,
            workerphone: "+7",
            description: "",

            problem_type: "",
            workers: [],
            problems: [],
            problem: [],

            errors: [],
            successes: [],

            apiHost: import.meta.env.VITE_API_HOST,
            apiPort: import.meta.env.VITE_API_PORT
        }
    },

    methods: {
        needReg() {
            this.problemSelected = 1000
        },

        getProblemType() {
            fetch(`http://${this.apiHost}:${this.apiPort}/api/get/problem_type/${this.problemtypeid}`, {
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
            fetch(`http://${this.apiHost}:${this.apiPort}/api/get/workers`, {
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
            fetch(`http://${this.apiHost}:${this.apiPort}/api/get/problems/${this.problemtypeid}`, {
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
            fetch(`http://${this.apiHost}:${this.apiPort}/api/get/problem/${this.problemSelected}`, {
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

        async setRequests() {
            if ((this.building < 1) || (this.building > 5)) {
                this.errors.push("Ошибка! Корпус указан неверно.")
            }

            if ((this.problemtypeid < 1) || (this.problemtypeid > 3)) {
                this.errors.push("Ошибка! Не существует такого вида проблемы.")
            }

            if (this.workerid < 1) {
                this.errors.push("Внимание! Необходимо указать ваше ФИО.")
            }

            if (this.workerphone.length != 12) {
                this.errors.push("Внимание! Неверно указан номер телефона.")
            }

            if (this.description.length < 15) {
                this.errors.push("Внимание! Описание слишком короткое.")
            }

            if (this.errors.length > 0) {
                return
            }

            const url = `http://${this.apiHost}:${this.apiPort}/api/set/request/`;
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        building: this.building,
                        room: this.room,
                        problemtypeid: this.problemtypeid,
                        workerid: this.workerid,
                        workerphone: this.workerphone,
                        description: this.description,
                    })
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                };

                const json = await response.json();

                if (json.message == "success") {
                    this.successes.push("По вашему обращению была создана заявка. Благодарим за обращение!");
                } else {
                    this.errors.push("Внутренняя ошибка сервера... Обратитесь в техническую поддержку.")
                }
                setTimeout(() => {
                    location.reload()
                }, 1500);
            } catch (error) {
                console.error(error.message);
            }
        }
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
        <p class="lead mb-3">
            Текущая аудитория: {{ building }}-{{ room }}
            <br>Вид проблемы: {{ problem_type }}
        </p>
        <div class="alert alert-danger alert-dismissible fade show" role="alert" v-for="error in errors">
            {{ error }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <div class="alert alert-success alert-dismissible fade show" role="alert" v-for="success in successes">
            {{ success }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <form @submit.prevent="setRequests">
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
                    <select class="form-select" id="inputGroupSelect01" v-model="workerid" required>
                        <option value="0" disabled>ФИО</option>
                        <option v-for="(worker, id) in workers" :value="id + 1">{{ worker.name }}</option>
                    </select>
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                        <i class="fa-solid fa-phone"></i>
                    </span>
                    <input type="text" class="form-control" placeholder="Номер телефона" v-model="workerphone">
                </div>

                <div class="input-group">
                    <span class="input-group-text">
                        <i class="fa-solid fa-land-mine-on"></i>
                    </span>
                    <textarea class="form-control" placeholder="Опишите свою проблему" v-model="description"></textarea>
                </div>

                <button type="submit" class="btn btn-outline-secondary my-3">Отправить</button>
            </div>
        </form>

    </div>
</template>

<style>
textarea {
    height: 40vh;
}

img {
    width: 50vw;
}
</style>