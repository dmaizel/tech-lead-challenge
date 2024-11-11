package server

import (
	"encoding/json"
	"io"
	"net/http"
	"strings"
	"tech-lead-challenge/db"
	"tech-lead-challenge/service/logparser"
	"tech-lead-challenge/test"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFetchLogs(t *testing.T) {

	sqlConnector := db.NewMockConnector()
	err := sqlConnector.Connect()
	assert.NoError(t, err)
	// start services
	jobMgr := NewLogMgr(sqlConnector)
	h := NewHandlers(jobMgr)
	e := &LogsRequest{FromDate: "2024-01-02 15:09:05.000", ToDate: "2024-01-02 15:11:05.000"}
	b, err := json.Marshal(e)
	assert.NoError(t, err)
	eReader := strings.NewReader(string(b))
	req, err := http.NewRequest("POST", "/logs", eReader)
	assert.NoError(t, err)
	presolveRes, err := test.InvokeRequestWithResponse(req, h.FetchLogs, "/logs")
	assert.NoError(t, err)
	assert.True(t, presolveRes.Code == http.StatusOK)
	resData, err := io.ReadAll(presolveRes.Body)
	assert.NoError(t, err)
	var logs []logparser.Log
	err = json.Unmarshal(resData, &logs)
	assert.NoError(t, err)
	assert.Equal(t, logs[0].Data, "data")
	assert.Equal(t, logs[0].TimeStamp, "2024-01-02 15:09:05.000")
	assert.Equal(t, logs[0].ServiceName, "test")
	assert.Equal(t, logs[0].Level, "Info")

}
