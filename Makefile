BIN = node_modules/.bin
SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%=lib/%)
TESTS = $(wildcard tests/*.js)

BABEL_OPTS = \
	--source-maps inline

build: $(LIB)

clean:
	@rm -f $(LIB)

lint:
	@$(BIN)/eslint $(SRC) $(TESTS)

release-patch: lint build
	@$(call release,patch)

release-minor: lint build
	@$(call release,minor)

release-major: lint build
	@$(call release,major)

release = npm version $(1)

publish: build
	@git push --tags origin HEAD:master
	@npm publish

lib/%.js: src/%.js
	@echo "building $@"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTS) -o $@ $<
