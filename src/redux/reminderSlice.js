import { createSlice } from "@reduxjs/toolkit";

const savedReminder = localStorage.getItem("expense-manager-reminders");

const initialState = {
  reminders: savedReminder ? JSON.parse(savedReminder) : [],
};

const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      const reminder = {
        id: crypto.randomUUID(),
        ...action.payload,
      };

      state.reminders.push(reminder);
    },
    updateReminder: (state, action) => {
      const { id, updatedReminder } = action.payload;
      const reminder = state.reminders.find((reminder) => reminder.id === id);

      if (reminder) {
        Object.assign(reminder, updatedReminder);
      }
    },
    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(
        (reminder) => reminder.id !== action.payload,
      );
    },
    markAsPaid: (state, action) => {
      const reminder = state.reminders.find(
        (reminder) => reminder.id === action.payload,
      );

      if (!reminder) return;

      const currentDate = new Date(reminder.nextPaymentDate);

      if (reminder.frequency === "weekly") {
        currentDate.setDate(currentDate.getDate() + 7);
      }

      if (reminder.frequency === "monthly") {
        currentDate.setMonth(currentDate.getDate() + 1);
      }

      reminder.nextPaymentDate = currentDate.toISOString().split("T")[0];
    },
  },
});

export const reminderActions = reminderSlice.actions;

export default reminderSlice.reducer;
