package logparser

import (
	"testing"

	"gotest.tools/assert"
)

func TestExtractLogData(t *testing.T) {
	docker := Docker{}
	logEntry := "[pgadmin]  | [2024-01-02T15:10:05Z07:00] [INFO] Shutting"

	parseLog := docker.extractLogData(logEntry)
	assert.Equal(t, parseLog[0], "pgadmin")
	assert.Equal(t, parseLog[3], "2024-01-02T15:10:05Z07:00")
	assert.Equal(t, parseLog[4], "INFO")
	assert.Equal(t, parseLog[5], "Shutting")

}
