package logparser

import "time"

type Log struct {
	ServiceName string
	Level       string
	Data        string
	TimeStamp   time.Time
}
