<template>
    <div id="calendar-entry">
        <div class="card">
            <div class="card-header text-center">
                <h5>Neuer Termin für: <strong>{{ activeDayName }}</strong></h5>
            </div>
            <div class="card-body">
                <input type="text" class="form-control" placeholder="Bitte Titel eintragen" ref="eventTitleInput" v-model="event.title" @keypress.enter="submitEvent()"/>
                <select class="form-select mt-2" v-model="event.priority">
                    <option value="-1">Hoch</option>
                    <option value="0">Mittel</option>
                    <option value="1">Niedrig</option>
                </select>
                <div class="text-center mt-3">
                    <span v-for="color in eventColors" :key="color" class="d-inline-block alert m-0 me-2 square"
                        :class="eventColorClasses(color)" role="button" @click="setEventColor(color)">
                    </span>
                </div>
                <hr />
                <div class="d-grid gap-2">
                    <button class="btn btn-primary" @click="submitEvent" :disabled="isDisabled">Eintragen</button>
                    <button class="btn btn-danger" @click="deleteInput">Inhalt löschen</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Store from "../store";
export default {
    name: "CalendarEntry",
    data() {
        return {
            eventColors: ["primary", "success", "info", "warning", "danger"],
            event: {
                title: "",
                color: "primary",
                priority: 0,
            },
        };
    },

    computed: {
        activeDayName() {
            return Store.getters.activeDay().fullName;
        },
        isDisabled() {
            const strTitle = this.event.title;
            return strTitle.trim() !== "" === false;
        },
    },
    
    mounted() {
        this.$refs.eventTitleInput.focus();
    },

    methods: {
        eventColorClasses(eventColors) {
            return [
                "alert-" + eventColors,
                this.event.color === eventColors
                    ? "border border-" + this.event.color
                    : "",
            ];
        },
        setEventColor(eventColors) {
            this.event.color = eventColors;
        },
        submitEvent() {
            Store.mutations.storeEvent(this.event);
            this.event = {
                title: "",
                color: "primary",
                priority: 0,
            };
        },
        deleteInput() {
            this.event = {
                title: "",
                color: "primary",
                priority: 0,
            };
        },
    },
};

</script>

<style scoped>
</style>