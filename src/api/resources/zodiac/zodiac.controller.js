const ZodiacModel = require('./zodiac.model');


function checkZodiacByDay(ngay, thang) {
    ngay = Number(ngay);
    thang = Number(thang);
    switch (thang) {
        case 1:
            if (ngay <= 19 && ngay > 0) {
                return "Capricorn";
            }
            else if (ngay > 19 && ngay <= 31) {
                return "Aquarius";
            }
            else {
                return 0;
            } break;

        case 2:
            if (ngay <= 18 && ngay > 0) {
                return "Aquarius";
            }
            else if (ngay > 18 && ngay <= 28) {
                return "Pisces";
            }
            else {
                return 0;
            } break;


        case 3:
            if (ngay <= 20 && ngay > 0) {
                return "Pisces";
            }
            else if (ngay > 20 && ngay <= 31) {
                return "Aries";
            }
            else {
                return 0;
            } break;


        case 4:
            if (ngay <= 19 && ngay > 0) {
                return "Aries";
            }
            else if (ngay > 19 && ngay <= 30) {
                return "Taurus";
            }
            else {
                return 0;
            } break;

        case 5:
            if (ngay <= 20 && ngay > 0) {
                return "Taurus";
            }
            else if (ngay > 20 && ngay <= 31) {
                return "Gemini";
            }
            else {
                return 0;
            } break;


        case 6:
            if (ngay <= 21 && ngay > 0) {
                return "Gemini";
            }
            else if (ngay > 21 && ngay <= 30) {
                return "Cancer";
            }
            else {
                return 0;
            } break;


        case 7:
            if (ngay <= 22 && ngay > 0) {
                return "Cancer";
            }
            else if (ngay > 22 && ngay <= 31) {
                return "Leo"
            }
            else {
                return 0;
            } break;


        case 8:
            if (ngay <= 22 && ngay > 0) {
                return "Leo";
            }
            else if (ngay > 22 && ngay <= 31) {
                return "Virgo";
            }
            else {
                return 0;
            } break;


        case 9:
            if (ngay <= 22 && ngay > 0) {
                return "Virgo";
            }
            else if (ngay > 22 && ngay <= 30) {
                return "Libra"
            }
            else {
                return 0;
            } break;


        case 10:
            if (ngay <= 23 && ngay > 0) {
                return "Libra"
            }
            else if (ngay > 23 && ngay <= 31) {
                return "Scorpion";
            }
            else {
                return 0;
            } break;


        case 11:
            if (ngay <= 21 && ngay > 0) {
                return "Scorpion";
            }
            else if (ngay > 21 && ngay <= 30) {
                return "Sagittaurius";
            }
            else {
                return 0;
            } break;


        case 12:
            if (ngay <= 21 && ngay > 0) {
                return "Sagittaurius";
            }
            else if (ngay > 21 && ngay <= 31) {
                return "Capricorn";
            }
            else {
                return 0;
            } break;


        default: return 0;
            break;


    }
}

class zodiacController {

    //[GET] api/zodiacs
    getALLZodiac(req, res, next) {

        try {
            //?name=...
            if (req.query.name) {
                let name = req.query.name;
                ZodiacModel.find({ 'name': { '$regex': name, '$options': 'i' } }).then((result) => {
                    res.status(200).json({
                        "data": result
                    });
                    return true;
                })
            }
            else
                //?day=...
                if (req.query.day) {

                    let day = [];
                    //xet day=today;
                    console.log(req.query.day)
                    if (req.query.day == "today") {

                        var today = new Date();
                        day[0] = today.getDate();
                        day[1] = today.getMonth() + 1;

                    } else {
                        day = req.query.day.split('-');
                    }


                    if (checkZodiacByDay(day[0], day[1]) == 0) {
                        return res.status(400).json({
                            "msg": "Ngay nhap khong chinh xac"
                        });
                    }

                    ZodiacModel.find({ 'name': { '$regex': checkZodiacByDay(day[0], day[1]), '$options': 'i' } }).then((result) => {
                        return res.status(200).json(
                            result
                        );
                    });
                }
                else
                //query/? null
                {
                    // ZodiacModel.find({}).then((result) => {
                    //     return res.status(200).json({
                    //         "data": result
                    //     });
                    // })
                    const { page, perPage } = req.query;
                    const option = {
                        page: Number(page),
                        limit: Number(perPage),
                        populate: [{
                            path: 'createBy',
                            select: 'lastName'
                        }, {
                            path: 'updateBy',
                            select: 'lastName'
                        }]
                    }
                    ZodiacModel.paginate({}, option).then((result) => {
                        return res.status(200).json(result)
                    })
                }

        } catch (error) {
            return res.status(500).json({
                "msg": `failed error:${error}`,
            });
        }

    };

    //[GET] api/zodiacs/:id
    getZodiac(req, res, next) {
        try {
            const id = req.params.id;
            ZodiacModel.findById({ _id: id }).populate('createBy', 'lastName').populate('updateBy', 'lastName').then((result) => {
                return res.status(200).json(
                    result
                );
            }).catch((error) => {
                return res.status(404).json({
                    "msg": error
                })
            })
        } catch (error) {
            return res.status(500).json({
                "msg": `erorr:${error}`
            });
        }
    }

    //[POST] api/zodiacs
    storedZodiac(req, res, next) {
        try {
            const newZodiac = new ZodiacModel(req.body);

            newZodiac.createBy = req.user._id;

            newZodiac.save().then((result) => {
                return res.status(200).json({
                    "msg": "success",
                    "data": result
                });
            }).catch((error) => {
                return res.status(400).json({
                    "msg": error
                })
            });

        } catch (error) {
            return res.status(500).json({
                "msg": `failed error:${error}`,
            });
        }
    }

    //[DELETE] api/zodiacs/:id
    deleteZodiac(req, res, next) {
        try {
            const id = req.params.id;
            ZodiacModel.findOneAndRemove({ _id: id }).then((result) => {
                return res.status(200).json({
                    "msg": "Delete Success"
                });
            }).catch((error) => {
                return res.status(404).json({
                    "msg": error
                });
            })
        } catch (error) {
            return res.status(500).json({
                "msg": `failed error:${error}`,
            });
        }
    }

    //[PUT] api/zodiacs/:id
    updateZodiac(req, res, next) {
        try {
            const id = req.params.id;
            req.body.updateBy = req.user._id;
            ZodiacModel.findOneAndUpdate({ _id: id }, req.body).then((result) => {
                return res.status(200).json(result)
            }).catch((error) => {
                return res.status(400).json({
                    "msg": error
                })
            })

        } catch (error) {
            return res.status(500).json({
                "msg": `failed error:${error}`,
            });
        }
    }

}

module.exports = new zodiacController();