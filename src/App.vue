<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <!-- Anfang: Template für die Calendar-Week-Component -->
        <!--         <CalendarWeekAsList />
        <CalendarWeek /> -->
        <keep-alive>
          <Transition name="fade">
            <component :is="activeView"></component>
          </Transition>
        </keep-alive>
        <!-- Ende: Template für die Calendar-Week-Component -->
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4 offset-4">
        <!-- Anfang: Template für die Calendar-Entry-Component -->
        <CalendarEntry />
        <!-- Ende: Template für die Calendar-Day-Component -->
      </div>
      <div class="col-2 offset-2">
        <div class="float-end">
          <!-- Mit dem Button blenden wir die Calendar-Settings-Component ein bzw. aus. -->
          <button class="btn btn-lg mb-2" :class="buttonSettingsClasses" @click="toggleDisplaySettings()">
            <i class="fas fa-cogs"></i>
          </button>
        </div>
        <!-- Anfang: Template für die Calendar-Settings-Component -->
        <Transition name="fade">
          <CalendarSettings v-if="displaySettings" />
        </Transition>
        <!-- Ende: Template für die Calendar-Day-Component -->
      </div>
    </div>
  </div>
</template>

<script>
/* import { defineAsyncComponent } from 'vue'; */
import Store from './store';
import CalendarWeek from './components/CalendarWeek.vue';
import CalendarEntry from './components/CalendarEntry.vue';
import CalendarWeekAsList from './components/CalendarWeekAsList.vue';
import CalendarSettings from './components/CalendarSettings.vue';
export default {
  name: "App",
  components: {
    //Langschreibweise
    "CalendarWeek": CalendarWeek,
    //Kurzschreibweise
    CalendarEntry,
    CalendarWeekAsList,
    CalendarSettings,

  },
  data() {
    return {
      displaySettings: false,
    };
  },
  computed: {
    buttonSettingsClasses() {
      return this.displaySettings ? ["btn-success"] : ["btn-outline-success"];
    },
    activeView() {
      return Store.getters.activeView();
    }
  },
  methods: {
    toggleDisplaySettings() {
      this.displaySettings = !this.displaySettings;
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";


.square {
  width: 40px;
  height: 40px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
