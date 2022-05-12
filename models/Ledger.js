const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
    },

    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

module.exports = Ledger = mongoose.model("ledger", ledgerSchema);
