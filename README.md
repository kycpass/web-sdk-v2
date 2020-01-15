# Entify Web SDK (v2)

The Entify JS SDK allows seamless frontend integration with your website. 

[DEMO](https://web-sdk-v2.herokuapp.com/)

### Prerequisite

Before you start integrating with the Entify SDK, make sure that you:

- have requested an API token and received your API key. If you haven't, please send email to support@entifyme.com to get one.
- have subscribed to the [Entify webhooks](https://developers.entifyme.com/#webhooks).

### Integration steps 

1. Request an SDK token from Entify using our [API](#requesting-a-jwt-token)
2. Import the Entify SDK script to your webpage.
3. [Mount the SDK](#mounting-the-sdk).


### Requesting a JWT token

You need to request a JWT token to load your customized SDK flow which will be displayed in your web-page.
The flow of the SDK is generated according to the features tied to the JWT token.

You can start a legal entity verification only after receiving the token [from the Entify API](https://developers.entifyme.com#sdk-tokens) and mounting it in the front end of your platform.

Each token has a lifetime of 7 days after which it becomes invalid and should be switched out for a new one.

When creating the token, you need to supply a `referrer` parameter in the request body. This parameter should adhere to the [specification set forth by Google](https://developer.chrome.com/extensions/match_patterns). To prevent someone else using your SDK token to make requests and incurring charges, we recommend you set the `referrer` as strict as possible.

> We have disallowed using the `<all_urls>` pattern and strongly discourage using `*://*/*` - the `referrer` flag prohibits the use of your SDK token outside of the URL you explicitly allow it on.

### Import SDK

```
<script src="https://sdk.entifyme.com/web-sdk-2.0.0.js"></script>
```

### Mounting the SDK

Once you've included the script tag in your HTML file and have your token, it is time to mount the SDK into an existing DOM element:

```javascript
window.entify.mount({
  token: "eyJhbG...",
  onLoad: ()=> console.log("The SDK is loaded"),
  onSuccess: () => console.log("The SDK flow has completed!"),
  onError: err => console.error(err),
  containerId: "root",
  config: { ...customisation }
});
```


The `mount` function accepts an object with the following 4 properties:

| key       | required | type       | description                                                            |
| :-------- | :------- | :--------- | :--------------------------------------------------------------------- |
| onLoad    | no       | `function` | Callback function when the sdk UI loads completely                     |
| onSuccess | no       | `function` | Callback function for when the verification request has been submitted |
| onError   | no       | `function` | Callback function for when the SDK encounters an irrecoverable error   |
| token     | yes      | `string`   | The JWT token you retrieve from our API                                |
| container | yes      | `string`   | The ID of the HTML element you wish to mount the SDK to                |
| config    | no      | `object`    | Client-side customisation of the SDK. [Read More](#customisation)      |

Here's a sample of the object that will passed to your `onSuccess` callback:

```javascript
{
  status: 'success',
  legalEntityScreening: {
    id: 'ABCD1234'
  }
}
```

### Customisation  

1. The `config` accepts a `prefill` object to pre-fill the SDK form. Only the following fields can be prefilled: 
Legal entity name, Registration code, Country, Representative first name & Representative last name.  
**Note:** The `residenceState` and `residenceCountry` code have to be **alpha2** format. `residenceState` is applicable only when `residenceCountry` is `US`.  

2. Pass any custom reference in `customerReference` to associate it with screenings and corresponding webhook payload.

> Customisation available via `config` is form v2 and onwards. 

Example: 
```
config: {
  customerReference: <any reference id>,
  prefill: {
    legalEntityName: 'Entifyme',
    registrationCode: '111-111-111',
    residenceCountry: 'US',
    residenceState: 'AL',
    representativeFirstName: 'Alice',
    representativeLastName: 'Bob'
  }
}
```

---
## Local development
> Only for development  

Create a `.env` file with the following variables:

```
FRAME_URL= # entify sdk frame url without trailing slash
```
Make sure your frame url is accessible and assigned to `FRAME_URL`.

### Available scripts  

For development: 
```
npm run dev
```

For production build: 
```
npm run build
```

**NOTE:** In production build, the `NODE_ENV` is set to `production`. It appends the version no to the frame url.  
For example, in production build, the sdk will try to load iframe from the following url if the sdk version is 2.x.x:   
```
<frame_url>/v2/?token=<token>
```
Check out codebase of the [sdk frame](https://github.com/kycpass/web-sdk-frame)

---

### How it works behind the scene?
![arch](https://raw.githubusercontent.com/kycpass/web-sdk-v2/master/arch.png?token=AE23SBL6UCJHJGQDJA5EY5S6C43ZG)
