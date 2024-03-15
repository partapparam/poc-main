- Unable to run backend - no `environment/environment.js` file exists

- Verfication email after sign up - `http://undefineduxm0wru40w7rnw6w/55d64e5a-1e3b-489c-8805-ba22e9059ce0`

  - Flagged browser safety check, unable to register

- Session = True
  Track new chat start and update the session to true once user continues with conversation

- How are file uploads being handled.

  - I see multer but it is set to `upload.none()`

- `amariFetch.js` - what is happening with the source request?

  - the response from amari is fast but the source parsing is slow and delays the response

- Signup - `error: permission denied for table users`
- Login - `incorrect password`

- SideNav Response

```
{
    "status": "success",
    "data": [
        {
            "email": "nachiket@icustomer.ai",
            "organization_name": "icustomer ai",
            "organization_country": null,
            "organization_domain": "icustomer.ai",
            "name": "nachiket",
            "role": null,
            "plan": "free",
            "google_id": "113652146766808456062",
            "usertype": "freemium"
        }
    ]
}
```

- LocalStorage - User :

```
{"id":"80b9445f-c8a5-40e1-8b98-64d2bb85ba4a","username":"nachiket@icustomer.ai","password":"25d55ad283aa400af464c76d713c07ad","email":"nachiket@icustomer.ai","google_id":"113652146766808456062","verification_code":"verified","verify":1,"dashboard":null,"organization_name":"icustomer ai","organization_country":null,"organization_domain":"icustomer.ai","name":"nachiket","role":null,"plan":"free","requests_made":null,"passwod_reset_token":"1XHTJVAhW9Ms1vMJ","usertype":"freemium","createdDate":"2023-11-29T22:24:42.557Z","user_credits":200}
```

TODO

- Fix SideNav_js to not have dopdown menu, only Nav menu
- Add in session tracker
- replace SIdeNav User settings query, remove hardcoded values
- Add source link images
  - Ask Ravi for updating the API for source scrape
