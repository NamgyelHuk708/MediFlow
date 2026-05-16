export const symptomResponses = [
  {
    id: 1,
    chip: "Headache and Fever",
    emoji: "🤒",
    userMessage: "I have a headache and mild fever",
    severity: "Minor Condition",
    severityColor: "green",
    message: "Based on your symptoms this appears to be a common cold or mild viral infection. Rest well, drink plenty of warm water, and take paracetamol if needed. Avoid cold foods and drinks. Monitor your temperature and if fever goes above 39 degrees or lasts more than 3 days please book an appointment.",
    actions: [
      { label: "See Home Remedies", route: "/home-remedy" },
      { label: "Book Appointment Anyway", route: "/book-appointment" }
    ]
  },
  {
    id: 2,
    chip: "Chest Pain and Breathing",
    emoji: "😮‍💨",
    userMessage: "I have chest pain and difficulty breathing",
    severity: "Moderate — See a Doctor",
    severityColor: "yellow",
    message: "Chest pain with breathing difficulty should not be ignored. This could be related to your lungs or heart. We strongly recommend you consult a doctor today either through telemedicine or by visiting the hospital.",
    actions: [
      { label: "Start Video Consultation", route: "/telemedicine" },
      { label: "Book Hospital Appointment", route: "/book-appointment", referred: true }
    ]
  },
  {
    id: 3,
    chip: "Severe Chest Pain",
    emoji: "⚠️",
    userMessage: "I have severe chest pain, sweating, and left arm pain",
    severity: "Emergency — Act Now",
    severityColor: "red",
    message: "These are warning signs of a possible heart attack. Please do not wait. Call emergency services immediately or go to the nearest hospital right now. Your appointment will be marked as high priority automatically.",
    actions: [
      { label: "Call Emergency 112", emergency: true },
      { label: "Book Emergency Slot", route: "/book-appointment", priority: "emergency" }
    ]
  },
  {
    id: 4,
    chip: "Diabetes and Dizziness",
    emoji: "🩺",
    userMessage: "I have diabetes and I feel dizzy",
    severity: "Moderate — Monitor Closely",
    severityColor: "yellow",
    message: "For a diabetic patient dizziness can indicate low blood sugar. Immediately eat something sweet like sugar or juice and rest for 15 minutes. If dizziness continues or you feel confused please seek medical attention right away.",
    actions: [
      { label: "See Dietary Advice", route: "/nutrition" },
      { label: "Book Appointment", route: "/book-appointment", referred: true }
    ]
  }
];
