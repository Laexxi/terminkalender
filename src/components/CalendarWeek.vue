<template>
    <div id="calendar-week">
        <div class="card-group">
            <!-- Anfang: Template für die Calendar-Day-Component -->
            <CalendarDay v-for="days in calendarWeekData" :key="days.id" :day="days" />
        </div>
    </div>
    <!-- Ende: Template für die Calendar-Day-Component -->
</template>

<script>
import store from '@/store';
import CalendarDay from './CalendarDay.vue';
export default {
    name: "CalendarWeek",
    components: {
        //Langschreibweise
        //Kurzschreibweise
        CalendarDay,
    },
    data() {
        return {
           calendarWeekData: store.state.calendarWeekData, 
        };
    },
};
</script>

<style scoped>
</style>