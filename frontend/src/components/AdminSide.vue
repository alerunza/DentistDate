<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2 class="text-center">Lista delle Prenotazioni</h2>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="6" class="elevation-4 rounded">
                <v-row class="d-flex justify-center my-2">
                    <v-btn to="/" density="compact" color="blue-grey-darken-1">home</v-btn>
                </v-row>
                <v-card-title class="text-center">Elenco delle Prenotazioni</v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item-group>
                            <v-list-item v-for="prenotazione in prenotazioni" :key="prenotazione.id">
                                <v-list-item-title>
                                    {{ prenotazione.id }} | {{ prenotazione.nome }} {{ prenotazione.cognome }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ prenotazione.email }}
                                </v-list-item-subtitle>
                                <v-list-item-subtitle class="grey--text">
                                    {{ prenotazione.data }}
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            prenotazioni: [],
        };
    },
    created() {
        axios.get('http://192.168.1.23:3000/api/prenotazioni')
            .then(response => {
                this.prenotazioni = response.data;
                console.log(this.prenotazioni);
            })
            .catch(error => {
                console.error('Errore nel recupero delle prenotazioni:', error);
            });
    },
};
</script>