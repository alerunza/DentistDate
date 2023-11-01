<template>
    <div>
        <h1>Lista delle Prenotazioni</h1>
        <ul>
            <li v-for="prenotazione in prenotazioni" :key="prenotazione.id">
                {{ prenotazione.nome }} {{ prenotazione.cognome }} - {{ prenotazione.data }}
            </li>
        </ul>
    </div>
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
        axios.get('http://localhost:3000/api/prenotazioni')
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