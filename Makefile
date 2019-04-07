SHELL := /bin/bash
PATH  := node_modules/.bin:make/bin:$(PATH)

.PHONY: build watch

build: build/hgimu.min.js build/hgimu.css
watch: build .watch.ref

.watch.ref: src/hgimu.js src/hgimi.css build/index.html
	touch .watch.ref
	@ chrome-canary-cli reload

build/hgimu.min.js: src/hgimu.js
	browserify -s hgimu src/hgimu.js | uglifyjs -m -c > build/hgimu.min.js

build/hgimu.css: src/hgimu.css
	uglifycss src/hgimu.css > build/hgimu.css
