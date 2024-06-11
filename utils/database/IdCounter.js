const counter = require("../../models/counter.model");

const getNextSequence = async (sequenceName) => {
  const counterValue = await counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );

  return counterValue.sequenceValue;
};

module.exports = { getNextSequence };
