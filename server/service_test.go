package server

import (
	"tech-lead-challenge/db"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestServiceFetchLogs(t *testing.T) {
	sqlConnector := db.NewMockConnector()
	err := sqlConnector.Connect()
	assert.NoError(t, err)
	// start services
	jobMgr := NewLogMgr(sqlConnector)
	logs, err := jobMgr.FetchLogs(LogsRequest{
		FromDate: "2024-01-02T15:04:05Z07:00",
		ToDate:   "2024-01-02T15:06:05Z07:00",
		LogLevel: "INFO",
	})
	assert.NoError(t, err)
	assert.Equal(t, logs[0].Data, "data")
	assert.Equal(t, logs[0].TimeStamp, "2024-01-02 15:09:05.000")
	assert.Equal(t, logs[0].ServiceName, "test")
	assert.Equal(t, logs[0].Level, "Info")

}
