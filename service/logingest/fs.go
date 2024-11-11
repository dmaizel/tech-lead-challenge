package logingest

import (
	"context"
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

func (fi FsIngest) LoadLogFromSource() error {
	file, err := os.OpenFile(fi.LogLocation, os.O_RDONLY, os.ModePerm)
	if err != nil {
		return err
	}
	parser := logparser.NewParser(fi.LogType)
	logs, err := parser.ParseLog(file)
	if err != nil {
		return err
	}
	err = fi.DBConnector.InsertLogs(context.Background(), logs)
	if err != nil {
		return err
	}
	return nil
}
