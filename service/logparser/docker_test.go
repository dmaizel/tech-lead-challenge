package logparser

import (
	"os"
	"testing"

	ts "github.com/stretchr/testify/assert"
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

func TestParseLog(t *testing.T) {
	file, err := os.OpenFile("/Users/chen.keinan/workspace/work/tech-lead-challenge/example/docker.log", os.O_RDONLY, os.ModePerm)
	ts.NoError(t, err)
	docker := Docker{}
	parseLog, err := docker.ParseLog(file)
	ts.NoError(t, err)
	assert.Equal(t, parseLog[0].ServiceName, "pgadmin")
	assert.Equal(t, parseLog[0].Data, "Startinggunicorn22.0.0")
	assert.Equal(t, parseLog[0].Level, "INFO")
	assert.Equal(t, parseLog[0].TimeStamp, "2024-01-02T15:04:05Z07:00")

}
