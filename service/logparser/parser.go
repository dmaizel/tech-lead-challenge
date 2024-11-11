package logparser

type LogParser interface {
	ParseLog(in string) ([]Log, error)
}

func NewParser(logType string) LogParser {
	switch logType {
	case "fs":
		return &Docker{}
	default:
		return &Docker{}
	}
}
