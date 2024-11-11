package service

import (
	"log/slog"
	"os"
	"regexp"
	"tech-lead-challenge/service/logparser"
)

const DefaultDataPattern = "p([a-z]+)ch"

func LogAlertOnMatchMatten(logPattern LogPattern, logs []logparser.Log) {
	for _, log := range logs {
		logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
		match, _ := regexp.MatchString(logPattern.DataPattern, log.Data)
		if match {
			logger.Debug("Match log Pattern", "pattern", "logPattern.DataPattern", "log data", "log.Data")
		}
	}
}

type LogPattern struct {
	DataPattern string
}
