# Quotes API

<div align="center">
<img src="/imgs/quotes.png" width="500" height="380"> 
</div>

A simple API to retrieve random quotes in various languages.

WEB: [quotes-blond.vercel.app](https://quotes-blond.vercel.app)

API: [quotes-blond.vercel.app/api](https://quotes-blond.vercel.app/api)

## Endpoints

### GET /quote

Returns a random quote based on the specified language.

**Query Parameters:**

- `lang` (optional): Language code to retrieve quotes. Valid values: `en` (English), `vi` (Vietnamese), `cn_zh` (Simplified Chinese), `cn_tw` (Traditional Chinese). Default is `en`.

**Example:**

```
GET /quote?lang=vi
```

CURL
```
curl quotes-blond.vercel.app/api/quote?lang=vi
```

or open on web browser [quotes-blond.vercel.app/api/quote?lang=vi](https://quotes-blond.vercel.app/api/quote?lang=vi)


**Response:**

```json
{
  "language": "vi",
  "quote": "Cách duy nhất để làm việc tuyệt vời là yêu thích những gì bạn làm.",
  "author": "Steve Jobs"
}
```

### GET /

Returns information about the API and available languages.

## Deployment

This API is designed to be deployed on Vercel.

1. Clone repository
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Deploy to Vercel: `vercel`

## Contact

<div align="center">

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/bxdoan)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/bxdoan)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:bxdoan93@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bxdoan/)
[![Mobile](https://img.shields.io/badge/Mobile-0077B5?style=for-the-badge&logo=mobile&logoColor=white)](tel:0904195065)

</div>

## Buy me a Roll Royce

I love Roll Royce, if you love Roll Royce also, help me buy it.
<div align="center">

[![bxdoan.eth](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)](https://etherscan.io/address/0x610322AeF748238C52E920a15Dd9A8845C9c0318)
[![paypal](	https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/bxdoan)

</div>

<div align="center">
<img src="https://img.vietqr.io/image/MB-0904195065-print.png" width="300" height="380"> 
</div>
