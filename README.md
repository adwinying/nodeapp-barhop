# BarHop: NodeJS Nightlife Coordination App 

Powered by Yelp Fusion API

## Backend APIs

_**[Restricted]** APIs require user to be logged in_

---

`GET /api/auth/login`: Logs in user via Twitter OAuth

---

`GET /api/place/list?location=[location]`: Returns a list of bars in `[location]`. `[location]` query is required.

---

`PATCH /api/place/join`: **[Restricted]** Update attending status of user. Returns the updated place entry. Expects the following input:

```javascript
{
	"userId": "user's Twitter Id",
	"id": "Yelp ID of place",
	"attend": true //boolean, attending or de-attending
}
```