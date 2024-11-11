package db

import (
	"context"
	"tech-lead-challenge/service/logparser"
)

func NewMockConnector() Connector {
	return &MockConnector{}
}

type MockConnector struct {
}

func (c MockConnector) Connect() error {
	return nil
}

func (sc *MockConnector) InsertLogs(ctx context.Context, logs []logparser.Log) error {
	return nil
}

func (sc *MockConnector) FetchLogs(from string, to string, level string) ([]logparser.Log, error) {
	return []logparser.Log{
		{
			ServiceName: "test",
			Level:       "Info",
			TimeStamp:   "2024-01-02 15:09:05.000",
			Data:        "data",
		},
	}, nil
}
