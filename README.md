# mass-unfollow

a simple browser console script for mass unfollow instagram accounts, working as of sep. 2026

## usage

1. open the following/followers page on the supported website
2. open your browser developer tools
3. go to the console tab
4. paste the script into the console
5. press enter
6. keep the page open while the script runs

## features

- automatically finds following buttons
- confirms unfollow actions
- waits for confirmation dialogs dynamically
- tracks successful unfollows
- tracks failed attempts
- processes accounts in batches
- configurable delays and limits

## configuration

you can adjust the values at the top of the script:

```js
const UNFOLLOW_LIMIT = 100;
const BETWEEN_UNFOLLOWS = 50;
const CONFIRM_TIMEOUT = 2000;
const POLL_INTERVAL = 10;
const BREAK_DURATION = 3 * 60 * 1000;
const TOTAL_DURATION = 10 * 60 * 1000;
```

## disclaimer

this project is provided for educational and personal use. automated actions may violate a platform's terms of service or trigger rate limits. use responsibly and at your own risk.
