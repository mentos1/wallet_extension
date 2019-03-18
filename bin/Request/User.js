function isValid_Twitter(body) {
    if (!body) {
        return {'status' : false, 'msg' : 'body is empty'}
    }

    if (!body.oauth_token || !(typeof body.oauth_token === "string") || !(body.oauth_token.length >= 30)) {
        return {'status' : false, 'msg' : 'body.oauth_token has wrong format'}
    }


    if (!body.oauth_token_secret || !(typeof body.oauth_token_secret === "string" || !(body.oauth_token_secret.length >= 30))) {
        return {'status' : false, 'msg' : 'body.oauth_token_secret has wrong format'}
    }


    if (!body.user_id || !(typeof body.user_id === "string")) {
        return {'status' : false, 'msg' : 'body.user_id has wrong format'}
    }


    if (!body.screen_name || !(typeof body.screen_name === "string")) {
        return {'status' : false, 'msg' : 'body.screen_name has wrong format'}
    }

    return {'status' : true}
}

module.exports = {isValid_Twitter};
