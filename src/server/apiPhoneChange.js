const dbUtil = require('./dbUtil');

const apiPhoneChange = {};

const MODULE_NAME = 'apiPhoneChange';

apiPhoneChange.updateGet = function (fullRequest, fullResponse) {
    let q = fullRequest.query;
    if (q.firstName && q.lastName && q.email) {
        dbUtil
            .query(
                'SELECT Phone, MobilePhone FROM salesforce.contact WHERE LOWER(FirstName) = LOWER($1) AND LOWER(LastName) = LOWER($2) AND LOWER(Email) = LOWER($3)',
                [q.firstName?.trim(), q.lastName?.trim(), q.email?.trim()]
            )
            .then((resS) => {
                //console.log(MODULE_NAME, resS, resS.rowCount, resS.rows);
                if (resS.rowCount > 0) {
                    let result = {};
                    result.phone = resS.rows[0].phone;
                    result.mobilePhone = resS.rows[0].mobilephone;
                    result.firstName = q.firstName?.trim();
                    result.lastName = q.lastName?.trim();
                    result.email = q.email?.trim();
                    fullResponse.json(result);
                } else {
                    fullResponse.status(404);
                    fullResponse.send(
                        `sample json for GET/POST:<br><br>
                    { firstName: 'fn', lastName: 'ln', email: 'e@mail.com', phone: '123-456-7890' }`
                    );
                }
            })
            .catch((err) =>
                setImmediate(() => {
                    //throw err;
                    console.log(MODULE_NAME, err);
                    fullResponse.status(500);
                })
            );
    } else {
        fullResponse.status(404);
        fullResponse.send(
            `sample json for GET/POST:<br><br>
            { firstName: 'fn', lastName: 'ln', email: 'e@mail.com', phone: '123-456-7890' }`
        );
    }
};

apiPhoneChange.updatePost = function (fullRequest, fullResponse) {
    let b = fullRequest.body;
    dbUtil
        .query(
            'UPDATE salesforce.contact SET Phone = $1, MobilePhone = $1 WHERE LOWER(FirstName) = LOWER($2) AND LOWER(LastName) = LOWER($3) AND LOWER(Email) = LOWER($4)',
            [
                b.phone.trim(),
                b.firstName.trim(),
                b.lastName.trim(),
                b.email.trim()
            ]
        )
        .then((resU) => {
            if (resU.rowCount === 0) {
                dbUtil
                    .query(
                        'INSERT INTO salesforce.contact (Phone, MobilePhone, FirstName, LastName, Email) VALUES ($1, $2, $3, $4, $5)',
                        [
                            b.phone.trim(),
                            b.phone.trim(),
                            b.firstName.trim(),
                            b.lastName.trim(),
                            b.email.trim()
                        ]
                    )
                    .then((resI) => {
                        //console.log(MODULE_NAME, resI);
                        let result = {};
                        result.status = 200;
                        result.command = resI.command;
                        fullResponse.json(result);
                        fullResponse.status(200);
                    })
                    .catch((err) =>
                        setImmediate(() => {
                            //throw err;
                            console.log(MODULE_NAME, err);
                            fullResponse.status(500);
                        })
                    );
            } else {
                //console.log(MODULE_NAME, resU, resU.rows);
                let result = {};
                result.status = 200;
                result.command = resU.command;
                fullResponse.json(result);
                fullResponse.status(200);
            }
        })
        .catch((err) =>
            setImmediate(() => {
                //throw err;
                console.log(MODULE_NAME, err);
                fullResponse.status(500);
            })
        );
};

apiPhoneChange.registerMethods = function (
    expressApp,
    express,
    rootUrl,
    urlName
) {
    expressApp.get(rootUrl + '/' + urlName, (req, res) => {
        this.updateGet(req, res);
    });
    expressApp.post(
        rootUrl + '/' + urlName,
        express.json({ type: '*/*' }),
        (req, res) => {
            this.updatePost(req, res);
        }
    );
};

module.exports = apiPhoneChange;
