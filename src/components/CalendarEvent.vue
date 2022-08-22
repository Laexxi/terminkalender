<template>
    <div id="calendar-event">
        <div class="alert text-center" :class="alertColor">
            <!-- Template für den Fall, dass das Event nicht bearbeitet wird -->
            <template v-if="!event.edit">
                <div>
                    <slot name="eventPriority" v-bind:priorityDisplayName="priorityDisplayName">
                        <strong>{{ priorityDisplayName }}</strong>
                    </slot> <!-- Fallback Content -->
                </div>
                <slot v-bind:event="event.title">{{ event.title }}</slot> <!-- Fallback Content -->
                <div>
                    <button class="btn" v-on:click="editEvent()"><i class="far fa-edit"></i></button>
                    <button class="btn" v-on:click="deleteEvent()"><i class="far fa-trash-can"></i></button>
                </div>
            </template>
            <template v-else>
                <input type="text" class="form-control" ref="inputTitle" :placeholder="event.title" @input="setNewEventTitle($event)" />
                <select class="form-select mt-2" v-model="newEventPriority">
                    <option :value="-1">Hoch</option>
                    <option :value="0">Mittel</option>
                    <option :value="1">Niedrig</option>
                </select>
                <hr />
                <button class="btn" @click="updateEvent()"><i class="fas fa-check"></i></button>
            </template>
            <!-- Ende des Edit-Templates -->
        </div>
    </div>
</template>

<script>
import Store from "../store";
export default {
    name: "CalendarEvent",
    props: {
        event: Object,
        day: Object,
    },
    data() {
        return {
            newEventTitle: "",
            newEventPriority: this.event.priority,
        };
    },
    computed: {
        priorityDisplayName() {
            switch (this.event.priority) {
                case 1:
                    return "Niedrig";
                case 0:
                    return "Mittel";
                case -1:
                    return "Hoch";
            }
            return "Unbekannte Priorität";
        },
        alertColor() {
            return "alert-" + this.event.color;
        },
    },
    methods: {
        deleteEvent: function () {
            Store.mutations.deleteEvent(this.day.id, this.event.title);
        },
        editEvent: function () {
            Store.mutations.editEvent(this.day.id, this.event.title);
            // Auf die Template refs zugreifen
            this.$nextTick(() => {
                this.$refs.inputTitle.focus();
            });
        },
        setNewEventTitle: function (event) {
            this.newEventTitle = event.target.value;
        },
        updateEvent: function () {
            Store.mutations.updateEvent(this.day.id, this.event.title, { title: this.newEventTitle, priority: this.newEventPriority });
        },
    },
};

</script>
<style scoped>
.btn {
    border: none;
}
</style>
