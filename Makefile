FILES   = ./src/main.ts

.PHONY: all
all: $(addsuffix .js,$(addprefix ./dist/,$(basename $(notdir $(FILES)))))

define BUILD_TEMPLATE
.PHONY: $(addsuffix .js,$(addprefix ./dist/,$(basename $(notdir $(1)))))
$(addsuffix .js,$(addprefix ./dist/,$(basename $(notdir $(1))))):
	node ./esbuild.js --mode build $$<
endef

$(foreach FILE,$(FILES),$(eval $(call BUILD_TEMPLATE,$(FILE))))
