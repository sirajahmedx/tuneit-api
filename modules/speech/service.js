// const vosk = require("vosk");
// const fs = require("fs");
// const path = require("path");

// const MODEL_PATH = path.join(__dirname, "../../models/vosk-model-en"); // Adjust path

// let model = null;

// const loadModel = () => {
//   if (!model) {
//     if (!fs.existsSync(MODEL_PATH)) {
//       throw new Error(
//         "Vosk model not found. Download from https://alphacephei.com/vosk/models"
//       );
//     }
//     vosk.setLogLevel(0);
//     model = new vosk.Model(MODEL_PATH);
//   }
//   return model;
// };

// const transcribe = async (audioBuffer, sampleRate = 16000) => {
//   const mod = loadModel();
//   const rec = new vosk.Recognizer({ model: mod, sampleRate });
//   rec.setMaxAlternatives(1);
//   rec.setWords(true);

//   const result = rec.acceptWaveform(audioBuffer);
//   const final = rec.finalResult();
//   rec.free();

//   return {
//     text: final.text,
//     words: final.result || [],
//   };
// };

// module.exports = { transcribe };
