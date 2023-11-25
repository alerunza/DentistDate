<template>
    <v-sheet width="400" class="mx-auto pa-16 elevation-4 rounded-shaped my-5">
        <v-row class="d-flex justify-center my-3">
            <v-btn to="/admin" size="x-small" color="blue-lighten-2">admin</v-btn>
        </v-row>
        <p class="text-center font-weight-bold text-h4 my-3">
            Prenotazione appuntamento dentista
        </p>
        <v-form fast-fail ref="form">
            <v-text-field class="pa-1" v-model="firstName" label="Nome" :rules="firstNameRules"></v-text-field>
            <v-text-field class="pa-1" v-model="lastName" label="Cognome" :rules="lastNameRules"></v-text-field>
            <v-text-field class="pa-1" v-model="email" label="Email" :rules="emailRules"></v-text-field>
            <VueDatePicker class="pa-4" v-model="date" locale="it" hide-offset-dates disable-month-year-select
                :enable-time-picker="false" :format="formatDate" :disabled-dates="disabledDates" cancelText="Annulla"
                selectText="Seleziona" placeholder="Seleziona una data">
            </VueDatePicker>
            <v-btn type="submit" color="success" block class="mt-2" @click="inviaDati">Prenota</v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { isValid } from 'date-fns';
import axios from 'axios'
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
            date: '',
        };
    },
    components: {
        VueDatePicker,
    },
    methods: {
        isValidDate(dateString) {
            return isValid(new Date(dateString, 'dd/MM/yyyy', new Date()));
        },
        formatDate(dateString) {
            const data = new Date(dateString);
            const giorno = data.getDate().toString().padStart(2, '0');
            const mese = (data.getMonth() + 1).toString().padStart(2, '0');
            const anno = data.getFullYear();
            return `${giorno}/${mese}/${anno}`;
        },
        inviaDati() {
            if (!this.firstName || !this.lastName || !this.email || !this.date) {
                alert('Per favore, compila tutti i campi obbligatori');
                return;
            }
            if (!this.firstNameRules[0](this.firstName) || !this.lastNameRules[0](this.lastName) || !this.emailRules[0](this.email) || !this.date) {
                alert('Per favore, verifica i dati inseriti');
                return;
            }
            const dataFormattata = this.formatDate(this.date);
            axios({
                method: 'post',
                url: 'http://192.168.1.23:3000/api/prenotazioni',
                data: {
                    nome: this.firstName,
                    cognome: this.lastName,
                    email: this.email,
                    data: dataFormattata,
                },
            }).then(response => {
                console.log('Prenotazione inserita con successo:', response.data);
            }).catch(error => {
                console.error('Errore nell\'invio della prenotazione:', error);
            });
        },
    },
};
</script>