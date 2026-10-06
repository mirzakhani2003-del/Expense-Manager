import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";

const initialState = {
  reminders: storage.getReminders(),
};

const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      state.reminders.push(action.payload);
    },
    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(
        (reminder) => reminder.id !== action.payload,
      );
    },
    updateReminder: (state, action) => {
      const index = state.reminders.findIndex(
        (reminder) => reminder.id === action.payload.id,
      );

      console.log(index);

      if (index !== -1) {
        state.reminders[index] = action.payload;
      }
    },
    markAsPaid: (state, action) => {
      const reminder = state.reminders.find(
        (reminder) => reminder.id === action.payload,
      );

      if (!reminder) {
        return;
      }

      const currentDate = new Date(reminder.nextPaymentDate);

      if (reminder.frequency === "weekly") {
        currentDate.setDate(currentDate.getDate() + 7);
      }

      if (reminder.frequency === "monthly") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      reminder.nextPaymentDate = currentDate.toISOString().split("T")[0];
    },
  },
});

export const reminderAction = reminderSlice.actions;
export default reminderSlice.reducer;
