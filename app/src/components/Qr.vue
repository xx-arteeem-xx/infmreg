<script>
    import { useQRCode } from '@vueuse/integrations/useQRCode'

    export default {
        data() {
            return {
                building: 5,
                room: 501,
                problemtypeid: 1,

                apiHost: import.meta.env.VITE_API_HOST,
                apiPort: import.meta.env.VITE_API_PORT,

                link: `http://${this.apiHost}:${this.apiPort}/${this.building}/${this.room}/${this.problemtypeid}/`,
                qrcode: useQRCode(this.link)
            }
        },
        
        methods: {
            generate() {
                this.link = `http://${this.apiHost}:${this.apiPort}/${this.building}/${this.room}/${this.problemtypeid}/`
                this.qrcode = useQRCode(this.link)
            }
        },

        mounted() {
            this.generate()
        }
    }




</script>

<template>
    <div class="container my-5">


        <div class="container my-5">
            <h1 class="my-3">
                QR Генератор
            </h1>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                    <i class="fa-solid fa-building"></i>
                </span>
                <input type="text" class="form-control" placeholder="Корпус" v-model="building">
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                    <i class="fa-solid fa-house"></i>
                </span>
                <input type="text" class="form-control" placeholder="Кабинет" v-model="room">
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                    <i class="fa-solid fa-circle-exclamation"></i>
                </span>
                <input type="text" class="form-control" placeholder="Тип поломки" v-model="problemtypeid">
            </div>
            <hr>
            <button class="btn btn-outline-secondary" @click="generate">Сгенирировать!</button>
            <hr>
            <img :src="qrcode" class=""/>
        </div>

        
    </div>
</template>

<style>
    img{
        width: 300px;
    }
</style>