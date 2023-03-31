IN := "queue.js" "app.js" "utils.js"
TARGET_DIR := "target"
OUT := "$(TARGET_DIR)/app.js"

all:
	[ -d "target" ] || mkdir "target"
	cat $(IN) > $(OUT)

clean:
	rm -rf $(TARGET_DIR)
