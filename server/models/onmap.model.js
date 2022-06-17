const { model, Schema } = require('mongoose');

const onmapSchema = new Schema(
  {
    title: {
      type: String,
      trim: true
    },
    target: {
      type: String,
      trim: true,
      required: 'Target must is required'
    },
    flags: {
      type: Array,
      default: null
    },
    userID: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: 'user'
    }
  },
  {
    strict: false
  }
);

module.exports = model('onmap', onmapSchema);
