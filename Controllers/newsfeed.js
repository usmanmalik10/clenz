const NewsFeeds = require('../Models/newsfeed');
const NewsApi = require('newsapi');
const newsapi = new NewsApi('7ac6bbf081e3458ba1c1180b232008b8');


// Business News
exports.businessNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.sources({
            category: 'business',
            language: 'en',
            country: 'us'
        })
        if (data1) {
            if (data1.business.data.length >= 1) {
                let createdTime = new Date(data1.business.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                //let createTimeEpoch = createdTime.getTime()
                //let currentTimeEpoch = CurrentTime.getTime()
                //const threehoursDif = currentTimeEpoch - createTimeEpoch
                //if(threehoursDif > (parseFloat(createTimeEpoch) + 180000))
                if (hours >= 3) {

                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "business.data": data, "business.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.business })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "business.data": data } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.sources({
                category: 'business',
                language: 'en',
                country: 'us'
            })
            let savingBuss = new NewsFeeds({
                business: {
                    data: data
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ })
                }).catch((err) => {

                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// Tecnology News
exports.TecnologyNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.sources({
            category: 'technology',
            language: 'en',
            country: 'us'
        })
        if (data1) {
            if (data1.technology.data.length >= 1) {
                let createdTime = new Date(data1.technology.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {
                   
                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "technology.data": data, "technology.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.technology })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "technology.data": data } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.sources({
                category: 'technology',
                language: 'en',
                country: 'us'
            })
            let savingBuss = new NewsFeeds({
                technology: {
                    data: data
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ })
                }).catch((err) => {

                })
        }
    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// General News
exports.generalNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.sources({
            category: 'general',
            language: 'en',
            country: 'us'
        })
        if (data1) {
            if (data1.general.data.length >= 1) {
                let createdTime = new Date(data1.general.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {
                    
                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "general.data": data ,"general.createdAt": Date.now()} },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.general })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "general.data": data } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.sources({
                category: 'general',
                language: 'en',
                country: 'us'
            })
            let savingBuss = new NewsFeeds({
                general: {
                    data: data
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ })
                }).catch((err) => {

                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// Health News
exports.healthNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.sources({
            category: 'health',
            language: 'en',
            country: 'us'
        })
        if (data1) {
            if (data1.health.data.length >= 1) {
                let createdTime = new Date(data1.health.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {
                   
                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "health.data": data ,"health.createdAt": Date.now()} },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.health })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "health.data": data } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.sources({
                category: 'health',
                language: 'en',
                country: 'us'
            })
            let savingBuss = new NewsFeeds({
                business: {
                    data: data
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ })
                }).catch((err) => {

                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// Sports News
exports.sportsNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.sources({
            category: 'sports',
            language: 'en',
            country: 'us'
        })
        if (data1) {
            if (data1.sports.data.length >= 1) {
                let createdTime = new Date(data1.sports.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {
                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "sports.data": data,"sports.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.sports })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "sports.data": data } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.sources({
                category: 'sports',
                language: 'en',
                country: 'us'
            })
            let savingBuss = new NewsFeeds({
                sports: {
                    data: data
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ })
                }).catch((err) => {

                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// Science News
exports.scienceNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.sources({
            category: 'science',
            language: 'en',
            country: 'us'
        })
        if (data1) {
            if (data1.science.data.length >= 1) {
                let createdTime = new Date(data1.science.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {             
                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "science.data": data, "science.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.science })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "science.data": data } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.sources({
                category: 'science',
                language: 'en',
                country: 'us'
            })
            let savingBuss = new NewsFeeds({
                science: {
                    data: data
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ })
                }).catch((err) => {

                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// Entertainment News
exports.entertainmentNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.sources({
            category: 'entertainment',
            language: 'en',
            country: 'us'
        })
        if (data1) {
            if (data1.entertainment.data.length >= 1) {
                let createdTime = new Date(data1.entertainment.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {
                    const data = await newsapi.v2.sources({
                        category: 'entertainment',
                        language: 'en',
                        country: 'us'
                    })
                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "entertainment.data": data, "entertainment.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.entertainment })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "entertainment.data": data } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.sources({
                category: 'entertainment',
                language: 'en',
                country: 'us'
            })
            let savingBuss = new NewsFeeds({
                entertainment: {
                    data: data
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ })
                }).catch((err) => {

                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
}