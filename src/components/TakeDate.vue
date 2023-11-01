<template>
    <v-sheet width="400" class="mx-auto pa-16 elevation-4 rounded-shaped my-5">
        <v-row class="d-flex justify-center my-3">
            <v-btn size="x-small" color="blue-lighten-2">admin</v-btn>
        </v-row>
        <p class="text-center font-weight-bold text-h4 my-3">
            Prenotazione appuntamento dentista
        </p>
        <v-form fast-fail ref="form">
            <v-text-field class="pa-1" v-model="firstName" label="Nome" :rules="firstNameRules"></v-text-field>
            <v-text-field class="pa-1" v-model="lastName" label="Cognome" :rules="lastNameRules"></v-text-field>
            <v-text-field class="pa-1" v-model="email" label="Email" :rules="emailRules"></v-text-field>
            <VueDatePicker class="pa-4" v-model="date" locale="it" disable-month-year-select :enable-time-picker="false"
                cancelText="Annulla" selectText="Seleziona" placeholder="Seleziona una data e un orario">
            </VueDatePicker>
            <v-btn type="submit" color="success" block class="mt-2" @click="submitForm">Prenota</v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { isValid } from 'date-fns';
//import { it } from 'date-fns/locale';
// import { ref } from 'vue';

export default {
    data() {
        return {
            firstName: '',
            firstNameRules: [
                value => {
                    if (value?.length > 3 && /[^0-9]/.test(value)) {
                        return true
                    } else {
                        return 'Il nome non è valido'
                    }
                },
            ],
            lastName: '',
            lastNameRules: [
                value => {
                    if (value?.length > 3 && /[^0-9]/.test(value)) {
                        return true
                    } else {
                        return 'Il cognome non è valido'
                    }
                },
            ],
            email: '',
            emailRules: [
                value => {
                    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

                    if (value?.length > 3 && value.match(validRegex)) {
                        return true
                    } else {
                        return 'La tua mail non è valida'
                    }
                },
            ],
            selectedDate: null,
            menu: false,
            date: ''
        };
    },
    components: {
        VueDatePicker,
    },
    methods: {
        submitForm() {
            if (this.$refs.form.validate() && this.date) {
                alert('Prenotazione effettuata con successo: ' + this.date);
            } else {
                alert('Per favore, compila tutti i campi obbligatori e seleziona una data.');
            }
        },
        isValidDate(dateString) {
            return isValid(new Date(dateString, 'dd/MM/yyyy', new Date()));
        },
    },
};
</script>