package server

import (
	"encoding/json"
	"net/http"
	"strings"
	"tech-lead-challenge/db"
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

}
