package pkg

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

func (j *LogMgr) FetchLogs() ([]logparser.Log, error) {
	return j.SqlConnector.FetchLogs()
}
