package logparser

import (
	"os"
)

type LogParser interface {
	ParseLog(in *os.File) ([]Log, error)
}

func NewParser(logType string) LogParser {
	switch logType {
	case "fs":
		return &Docker{}
	default:
		return &Docker{}
	}
}
