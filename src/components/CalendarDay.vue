<template>
    <div class="card border-start" :class="cardClasses">
        <div class="card-header text-center" :class="cardHeaderClasses" role="button" @click="setActiveDay()">
            <strong>{{ day.fullName }}</strong>
        </div>
        <div class="card-body">
            <!-- Anfang: Template für die Calendar-Event-Component -->
            <CalendarEvent v-for="event in day.events" :key="event.title" :event="event" :day="day">
                <template v-slot:eventPriority="slotProps">
                    <!-- Kurzschreibweise: "v-slot:test" = #test -->
                    <div>
                        <strong>{{ slotProps.priorityDisplayName }}</strong>
                    </div>
                </template>
                <template v-slot="slotProps">
                    <div>
                        <i>{{ slotProps.event }}</i>
                    </div>
                </template>
            </CalendarEvent>
            <!-- Ende: Template für die Calendar-Event-Component -->
        </div>
    </div>
</template>

<script>
import CalendarEvent from './CalendarEvent.vue';
import Store from "../store";
export default {
    name: "CalendarDay",
    components: {
        CalendarEvent,
    },
    // Array Schreibweise; Nicht zu empfehlen
    /* props: ["day"], */
    // Object Schreibweise, Mögliche Typen: String, Number, Boolean, Array, Object oder Function
    props: {
        day: {
            type: Object,
            required: true,
            // Bei primitiven Datentypen: default: 100
            // Bei nicht primitiven Datentypen; Funktion welche ein Object liefert
            default: function () {
                return {
                    id: -1,
                    fullName: "Fehlender Wochentag!",
                    events: [],
                };
            },
            validator: function (value) {
                if (Object.keys(value).includes("id")) {
                    return true;
                }
            },
        },
    },
    computed: {
        cardClasses() {
            return this.day.id === Store.getters.activeDay().id
                ? ["border-primary"]
                : [];
        },
        cardHeaderClasses() {
            return this.day.id === Store.getters.activeDay().id
                ? ["bg-primary", "text-white"]
                : [];
        },
    },
    methods: {
        setActiveDay() {
            Store.mutations.setActiveDay(this.day.id)
        }
    },
};

</script>

<style scoped>
</style>