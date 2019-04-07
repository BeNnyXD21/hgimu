<!doctype html>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="utf-8">
        <title>How good is my username?</title>

        <style>
            body {
                font-family: sans-serif;
                font-size: 1em;
                font-weight: 300;
            }
            input {
                font-family: sans-serif;
                font-size: 1em;
                font-weight: 300;
                color: #888;
                border: 1px solid #bbb;
                border-radius: 3px;
                padding: 0.25em 10px;
                line-height: 1.5em;
            }
            label::after {
                content: ":";
            }
            div {
                margin-bottom: 10px;
            }
            .hgimu-time {
                display: inline;
                margin-left: 10px;
            }
            .hgimu-checks li {
                list-style: none;
            }
            .hgimu-checks h2 {
                font-size: 0.8em;
                margin-bottom: 0;
            }
            .hgimu-checks p {
                margin-top: 0;
                font-size: 0.7em;
            }
        </style>

        <link rel="stylesheet" href="hgimu.css">
    </head>
    <body>
        <label>Username</label>
        <input id="username-box" type="username" />
        <div id="username-time" class="hgimu-time"></div>
        <ul id="username-checks" class="hgimu-checks"></ul>

        <script src="hgimu.min.js"></script>
        <script>
            (function (doc) {
                var usernameInput = doc.getElementById("username-box"),
                    timeDiv = doc.getElementById("username-time"),
                    checksList = doc.getElementById("username-checks");
                // Code to render the time returned by HGIMU
                var renderTime = function (time, input) {
                    timeDiv.innerHTML = time || "";
                };
                // Code to output the checks returned by HGIMU
                var renderChecks = function (checks, input) {
                    checksList.innerHTML = "";
                    for (var i = 0, l = checks.length; i < l; i++) {
                        var li = doc.createElement("li"),
                            title = doc.createElement("h2"),
                            message = doc.createElement("p");
                        title.innerHTML = checks[i].name;
                        li.appendChild(title);
                        message.innerHTML = checks[i].message;
                        li.appendChild(message);
                        checksList.appendChild(li);
                    }
                };
                // Setup the HGIMU object
                var attachTo = hsimp({
                    options: {
                        calculationsPerSecond: 10e9, // 10 billion calculations per second
                        good: 31557600e9, // 1 billion years
                        ok: 31557600e3 // 1 thousand years
                    },
                    outputTime: renderTime,
                    outputChecks: renderChecks
                });
                
                // setup custom values for "instantly"/"forever"
                hsimp.setDictionary({
                    "instantly": "Immediately",
                    "forever": "Aaaaaaaaaaaaaaaages",
                });
                // Run the HGIMU
                attachTo(passwordInput);
            }(this.document));
        </script>
    </body>
</html>
