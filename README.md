# BarHop: NodeJS Nightlife Coordination App 

### Frameworks / Technologies Used
- MERN stack
	- MongoDB
	- Express.js
	- ReactJS
	- Node.js
- Yelp Fusion API
- ESLint (Airbnb)

## Backend APIs

_**[Restricted]**: APIs require user to be logged in_


`GET /api/auth/login`: Logs in user via Twitter OAuth

`GET /api/place/list?location=[location]`: Returns a list of bars in `[location]`. `[location]` query is required.

`PATCH /api/place/join`: **[Restricted]** Update attending status of user. Returns the updated place entry. Expects the following input:

```javascript
{
	// User's twitter ID
	"userId": "123456", 

	// Yelp ID of place
	"id": "Moes-bar-san-francisco",

	// Attending or de-attending (boolean)
	"attend": true 
}
```

## Installation

```
$ git clone https://github.com/adwinying/nodeapp-barhop.git
$ cd nodeapp-barhop
$ npm install
$ npm run start-dev
```