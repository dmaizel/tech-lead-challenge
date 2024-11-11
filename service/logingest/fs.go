package logingest

import (
	"os"
	"tech-lead-challenge/service/logparser"
)

type FsIngest struct {
	sourceType  string
	LogLocation string
	LogType     string
}

func (fi FsIngest) LoadLogFromSource() error {
	file, err := os.OpenFile(fi.LogLocation, os.O_RDONLY, os.ModePerm)

	if err != nil {
		return err
	}
	parser := logparser.NewParser(fi.LogType)
	_, err = parser.ParseLog(file)
	if err != nil {
		return err
	}
	return nil
}
