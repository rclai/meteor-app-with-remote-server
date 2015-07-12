# Meteor App With Different Meteor Server

A lot of people wanted to know how to develop a Meteor app (web or mobile) that uses a different Meteor server backend. This is how.

For mobile, I only tested using Android, though this should theoretically work for iOS as well. If you don't know already [here's how to get mobile set up for Meteor](https://www.meteor.com/tutorials/blaze/running-on-mobile).

There's two basic Meteor apps in here.

To demonstrate how this works, the `remote-server` Meteor app will act as the remote Meteor server (running on `localhost:4000`) and the `app` will be your web or mobile app (running on `localhost:3000`), which will connect to your `remote-server` Meteor server. Also, I demonstrate user authentication using `accounts-password` to the `remote-server`.

## Getting Started

Open up two terminals.

```
git clone https://github.com/rclai/meteor-app-with-remote-server.git
cd meteor-app-with-remote-server
```

#### Terminal 1: Starting the "remote" server.

```
cd remote-server
sh run.sh
```

#### Terminal 2: Starting your client/mobile app.

`cd app`

If you want to run as a web app:

`sh run-as-web-app.sh`

If you want to run as a mobile app:

Take your machine's IP address (by using `ifconfig` or equivalent), and set it in the `--mobile-server` flag in the `run-as-mobile-app.sh` file, making sure it is port __4000__. 

Modify `packages/autoupdate/autoupdate_cordova.js` line 15, and change `rootUrl` to use your IP address, making sure it is port __3000__.

Make sure your phone is connected to the same network as your machine (WiFi connection most likely, unless your phone uses an Ethernet cable, which would be mind-blowing).

Finally:

`sh run-as-mobile-app.sh`

Test out hot code reload and see it just work.

## How Does This Work?

I copied the [Meteor `autoupdate`](https://github.com/meteor/meteor/tree/master/packages/autoupdate) core package and modified it to make sure it uses the `app`'s DDP connection because by default, Meteor uses the same URL as `DDP_DEFAULT_CONNECTION_URL` for handling hot code reloads.

For Cordova, I also had to make sure that the download URL pointed to my machine's IP address with port 3000 (See [here](https://github.com/rclai/meteor-app-with-remote-server/blob/master/app/packages/autoupdate/autoupdate_cordova.js#L15)).

Eventually Meteor will hopefully give you the ability to pass in an explicit autoupdate URL. Here's the [issue](https://github.com/meteor/meteor/issues/3815).
