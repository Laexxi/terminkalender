import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";

const state = reactive({
  calendarWeekData,
  activeView: "CalendarWeek",
});

const getters = {
  activeDay: () => state.calendarWeekData.find((day) => day.active),
  activeView: () => state.activeView,
};

const mutations = {
  deleteEvent(dayId, eventTitle) {
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventIndex = dayObj.events.findIndex(
      (event) => event.title === eventTitle
    );
    dayObj.events.splice(eventIndex, 1);
  },
  editEvent(dayId, eventTitle) {
    // Alle edit Attr auf False setzen, damit nur ein Event bearbeitet werden kann
    state.calendarWeekData.map((dayObj) => {
      dayObj.events.map((event) => (event.edit = false));
    });
    // Setze das entsprechende edit-Attr auf true
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find((event) => event.title === eventTitle);
    eventObj.edit = true;
  },

  updateEvent(dayId, oldEventTitle, newEvent) {
    newEvent.title = newEvent.title !== "" ? newEvent.title : oldEventTitle;
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find(
      (event) => event.title === oldEventTitle
    );
    eventObj.title = newEvent.title;
    eventObj.priority = Number(newEvent.priority);
    eventObj.edit = false;
  },
  setActiveDay(dayId) {
    state.calendarWeekData.map((dayObj) => {
      dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false);
    });
  },
  storeEvent(eventDO) {
    /*   const strTitle = String(eventDO.title);
  eventDO.title = strTitle.trim() !== "" ? eventDO.title : "Achtung, kein Titel gesetzt!";
   eventDO.title = eventDO.title !== "" ? eventDO.title : "Achtung, kein Titel gesetzt!"; */
    const activeDay = getters.activeDay();
    activeDay.events.push({
      title: eventDO.title,
      edit: false,
      color: eventDO.color,
      priority: Number(eventDO.priority),
    });
  },
  setActiveView(view) {
    state.activeView = view;
  },
};

export default {
  state: readonly(state),
  getters,
  mutations,
};
