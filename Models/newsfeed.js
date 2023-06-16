const mongoose = require('mongoose');

//News Feeds schema
const newsFeedSchema = mongoose.Schema({
    name: {
        type: String,
        default: "allNews"
    },
    business: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true,
        },
        data: {
            type: Array
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    entertainment: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true,
        },
        data: {
            type: Array
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    general: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true,
        },
        data: {
            type: Array
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },

    health: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true,
        },
        data: {
            type: Array
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    science: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true,
        },
        data: {
            type: Array
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    sports: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true,
        },
        data: {
            type: Array
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    technology: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true,
        },
        data: {
            type: Array
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
});
// News Feeds Model
module.exports = mongoose.model('newsFeeds', newsFeedSchema);
