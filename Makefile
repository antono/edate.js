coffee:
	coffee -c src/edate.coffee
	coffee -c spec/edate.spec.coffee

spec: coffee
	jasmine-node --coffee ./spec/

all: coffee spec
