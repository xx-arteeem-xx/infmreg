<script>
    export default {
        data () {
            return {
                requests: [],

                alerts: [],

                apiHost: import.meta.env.VITE_API_HOST,
                apiPort: import.meta.env.VITE_API_PORT
            }
        },

        methods: {
            getRequests(){
                fetch(`http://${this.apiHost}:${this.apiPort}/api/get/requests`, {
                    method: "GET",
                    headers: {
                    
                    },
                })
                    .then((response) => {
                        response.json().then((data) => {
                            this.requests = data
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            },

            deleteRequest(){
                this.alerts.push("Данная функция в разработке...")
            },

            editRequest(){
                this.alerts.push("Данная функция в разработке...")
            },
        },

        mounted() {
            this.getRequests()
        }
    }
</script>

<template>
    <div class="container my-5">
        <div class="alert alert-warning alert-dismissible fade show" role="alert" v-for="alert in alerts">
            {{ alert }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Корпус</th>
                <th scope="col">Кабинет</th>
                <th scope="col">ID проблемы</th>
                <th scope="col">ID сотрудника</th>
                <th scope="col">Номер телефона сотрудника</th>
                <th scope="col">Описание</th>
                <th scope="col">Действия</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="request in requests">
                <th scope="row">{{ request.id }}</th>
                <td>{{ request.building }}</td>
                <td>{{ request.room }}</td>
                <td>{{ request.problemtypeid }}</td>
                <td>{{ request.workerid }}</td>
                <td>{{ request.workerphone }}</td>
                <td>{{ request.description }}</td>
                <td class="row gap-2">
                    <button class="btn btn-sm btn-danger" @click="deleteRequest">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" @click="editRequest">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                </td>
            </tr>
        </tbody>
        </table>

        <a href="/5/501/1" class="btn btn-outline-secondary">На главную</a>
    </div>
</template>

<style>

</style>