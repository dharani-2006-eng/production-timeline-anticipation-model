import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface PredictionInput {
  machineId: string;
  operationType: string;
  materialUsed: number;
  energyConsumption: number;
  machineAvailability: number;
  plannedTime: number;
}

export interface PredictionResult {
  processingTime: number;
  delayRisk: "Low Risk" | "High Risk";
  delayReason: string;
  optimizationCategory: "Optimal Efficiency" | "High Efficiency" | "Moderate Efficiency" | "Low Efficiency";
  confidence: number;
}

export async function predictProductionOutcome(input: PredictionInput): Promise<PredictionResult> {
  const systemPrompt = `
    You are a professional manufacturing production timeline anticipation model.
    Based on the specific dataset seen in the production logs:
    - Machines: M01, M02, M03, M04, M05
    - Operations: Grinding, Additive, Lathe, Milling, Drilling
    - Features: Material (kg), Energy, Availability (%), Planned Time (mins)

    Logic Rules:
    1. Processing time in the dataset ranges from 20 to 120 minutes typically.
    2. 'Additive' and 'Milling' usually consume more energy.
    3. Availability < 85% is the primary cause for 'Delayed' or 'Failed' status.
    4. Optimization Categories: 
       - Optimal Efficiency (Time <= Planned, High Availability)
       - High Efficiency (Small delay, High Availability)
       - Moderate Efficiency (Mid-range stats)
       - Low Efficiency (High Delay, Low Availability)

    Return JSON:
    {
      "processingTime": number,
      "delayRisk": "Low Risk" | "High Risk",
      "delayReason": "string",
      "optimizationCategory": "Optimal Efficiency" | "High Efficiency" | "Moderate Efficiency" | "Low Efficiency",
      "confidence": number
    }
  `;

  const userPrompt = `
    Machine: ${input.machineId}
    Operation: ${input.operationType}
    Material: ${input.materialUsed} kg
    Energy: ${input.energyConsumption}
    Availability: ${input.machineAvailability}%
    Planned Time: ${input.plannedTime} mins
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      processingTime: result.processingTime || input.plannedTime,
      delayRisk: result.delayRisk || "Low Risk",
      delayReason: result.delayReason || "Production on schedule",
      optimizationCategory: result.optimizationCategory || "High Efficiency",
      confidence: result.confidence || 0.8
    };
  } catch (error) {
    console.error("AI Prediction Error:", error);
    // Fallback heuristic logic
    const isHighRisk = input.machineAvailability < 75 || (input.energyConsumption / input.plannedTime) > 2;
    return {
      processingTime: Math.round(input.plannedTime * (isHighRisk ? 1.2 : 1.05)),
      delayRisk: isHighRisk ? "High Risk" : "Low Risk",
      delayReason: isHighRisk ? "Low machine availability or high energy strain detected." : "Normal operating conditions.",
      optimizationCategory: isHighRisk ? "Low Efficiency" : "High Efficiency",
      confidence: 0.5
    };
  }
}
