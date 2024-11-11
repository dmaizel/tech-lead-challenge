package logingest

import "tech-lead-challenge/db"

type IngesterService interface {
	ProcessLogsFromSource() error
}

func NewLogIngester(sourceType string, logLocation string, conector db.Connector) IngesterService {
	switch sourceType {
	case "fs":
		return &FsIngest{LogLocation: logLocation, DBConnector: conector}
	default:
		return &FsIngest{}
	}
}
