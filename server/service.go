package server

import (
	"tech-lead-challenge/db"
	"tech-lead-challenge/service/logparser"
)

type LogMgr struct {
	SqlConnector db.Connector
}

func NewLogMgr(sqlConnector db.Connector) *LogMgr {
	return &LogMgr{SqlConnector: sqlConnector}
}

func (j *LogMgr) FetchLogs(lr LogsRequest) ([]logparser.Log, error) {
	return j.SqlConnector.FetchLogs(lr.FromDate, lr.ToDate, lr.LogLevel)
}

type LogsRequest struct {
	FromDate string `json:"from_date"`
	ToDate   string `json:"to_date"`
	LogLevel string `json:"log_level"`
}
