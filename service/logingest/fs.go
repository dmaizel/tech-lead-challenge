package logingest

import (
	"context"
	"log/slog"
	"os"
	"tech-lead-challenge/db"
	"tech-lead-challenge/service/logparser"
)

type FsIngest struct {
	sourceType  string
	LogLocation string
	LogType     string
	DBConnector db.Connector
}

func (fi FsIngest) ProcessLogsFromSource() error {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	logger.Debug("Reading logs", "source", "fs", "location", "fi.LogLocation")
	file, err := os.OpenFile(fi.LogLocation, os.O_RDONLY, os.ModePerm)
	if err != nil {
		return err
	}

	logger.Debug("Parsing logs", "type", fi.LogType)
	parser := logparser.NewParser(fi.LogType)
	logs, err := parser.ParseLog(file)
	if err != nil {
		return err
	}
	logger.Debug("Persisting logs into DB")
	err = fi.DBConnector.InsertLogs(context.Background(), logs)
	if err != nil {
		return err
	}
	return nil
}
