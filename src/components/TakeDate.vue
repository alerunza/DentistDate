<!-- <template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="6" md="4">
                <v-form ref="form" @submit.prevent>
                    <v-text-field v-model="firstName" label="Nome" required></v-text-field>
                    <v-text-field v-model="lastName" label="Cognome" required></v-text-field>
                    <v-text-field v-model="email" label="Email" required type="email"></v-text-field>
                    <VueDatePicker class="pa-4" v-model="date" locale="it" disable-month-year-select
                        :enable-time-picker="false" cancelText="Annulla" selectText="Seleziona"
                        placeholder="Seleziona una data e un orario">
                    </VueDatePicker>
                    <v-btn color="success" type="submit">Prenota</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template> -->

<template>
    <v-sheet width="500" class="mx-auto pa-16">
        <v-form fast-fail @submit.prevent>
            <v-text-field v-model="firstName" label="Nome" :rules="firstNameRules"></v-text-field>

            <v-text-field v-model="lastName" label="Cognome" :rules="lastNameRules"></v-text-field>
            <VueDatePicker class="pa-4" v-model="date" locale="it" disable-month-year-select :enable-time-picker="false"
                cancelText="Annulla" selectText="Seleziona" placeholder="Seleziona una data e un orario">
            </VueDatePicker>
            <v-btn type="submit" color="success" block class="mt-2">Prenota</v-btn>
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
            if (this.$refs.form.validate() && this.isValidDate(this.date)) {
                alert('Prenotazione effettuata con successo');
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