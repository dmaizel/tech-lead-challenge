package logingest

import "tech-lead-challenge/db"

type Ingester interface {
	LoadLogFromSource() error
}

func NewLogIngester(sourceType string, logLocation string, conector db.Connector) Ingester {
	switch sourceType {
	case "fs":
		return &FsIngest{LogLocation: logLocation, DBConnector: conector}
	default:
		return &FsIngest{}
	}
}
