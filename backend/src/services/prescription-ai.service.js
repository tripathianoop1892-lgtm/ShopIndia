import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const prescriptionSchema = {
  type: "object",
  properties: {
    doctorName: {
      type: "string",
      description:
        "Doctor name exactly as readable from the prescription. Return empty string if not readable.",
    },

    medicines: {
      type: "array",
      description: "Medicines clearly written on the prescription.",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "Medicine brand/generic name exactly as written or confidently readable.",
          },

          salt: {
            type: "string",
            description:
              "Salt/composition/formula only if clearly present or confidently readable. Do not invent it.",
          },

          strength: {
            type: "string",
            description:
              "Medicine strength such as 500 mg, 5 mg/ml, etc. Empty if unclear.",
          },

          dosageForm: {
            type: "string",
            description:
              "Dosage form such as tablet, capsule, syrup, injection, cream, drops, etc. Empty if unclear.",
          },

          dosage: {
            type: "string",
            description:
              "Amount/dose instructed by doctor, such as 1 tablet or 5 ml.",
          },

          frequency: {
            type: "string",
            description:
              "How often to take it, such as once daily, twice daily, morning/night, etc.",
          },

          duration: {
  type: "string",
  description:
    "Extract the exact treatment duration written by the doctor on the prescription, such as 3 days, 5 days, 7 days, 1 week, or 2 weeks. Do not calculate, assume, or guess the duration. If the duration is not clearly written or cannot be read, return 'Not mentioned'.",
},

          instructions: {
            type: "string",
            description:
              "Additional instructions such as after food, before food, at bedtime, etc.",
          },

          confidence: {
            type: "string",
            enum: ["high", "medium", "low"],
            description:
              "Confidence in reading this medicine from the prescription.",
          },
        },

        required: [
          "name",
          "salt",
          "strength",
          "dosageForm",
          "dosage",
          "frequency",
          "duration",
          "instructions",
          "confidence",
        ],
      },
    },

    notes: {
      type: "string",
      description:
        "Important uncertainty or readability notes. Do not provide medical advice.",
    },

    readable: {
      type: "boolean",
      description:
        "True if the prescription contains enough readable information to extract at least one medicine.",
    },
  },

  required: ["doctorName", "medicines", "notes", "readable"],
};

export const readPrescriptionWithAI = async ({
  filePath,
  mimeType,
}) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  if (!filePath || !fs.existsSync(filePath)) {
    throw new Error("Prescription file not found.");
  }

  if (!mimeType) {
    throw new Error("Prescription file type is missing.");
  }

  const uploadedFile = await ai.files.upload({
    file: filePath,
    config: {
      mimeType,
    },
  });

  const response = await ai.models.generateContent({
   model: "gemini-3.6-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
You are a prescription document reading assistant.

Your ONLY job is to READ and EXTRACT information that is visibly present
in the uploaded prescription.

IMPORTANT SAFETY RULES:

1. Do NOT prescribe any medicine.
2. Do NOT diagnose the patient.
3. Do NOT recommend additional medicines.
4. Do NOT invent a medicine, salt, strength, dosage, frequency or duration.
5. If something is unclear, return an empty string.
6. Preserve the medicine name as written when possible.
7. Do not automatically substitute one brand for another.
8. Do not decide whether a medicine should be approved.
9. The shopkeeper/qualified professional must perform the final verification.
10. If handwriting is unclear, mark confidence as low and explain the uncertainty.
11. Extract only what can reasonably be read from this prescription.
12. Return JSON only according to the provided schema.

Read the prescription carefully and extract:
- Doctor name
- Medicine name
- Salt/formula if clearly readable
- Strength
- Dosage form
- Dosage
- Frequency
- Duration
- Instructions

This is an extraction task, NOT a medical advice task.
            `,
          },
          {
            fileData: {
              fileUri: uploadedFile.uri,
              mimeType: uploadedFile.mimeType,
            },
          },
        ],
      },
    ],

    config: {
      responseMimeType: "application/json",
      responseSchema: prescriptionSchema,
    },
  });

  if (!response?.text) {
    throw new Error("AI returned an empty response.");
  }

  let extracted;

  try {
    extracted = JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini JSON parse error:", error);
    throw new Error("AI returned an invalid prescription response.");
  }

  return extracted;
};