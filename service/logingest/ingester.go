package logingest

type Ingester interface {
	LoadLogFromSource() error
}

func NewLogIngester(sourceType string, logLocation string) Ingester {
	switch sourceType {
	case "fs":
		return &FsIngest{LogLocation: logLocation}
	default:
		return &FsIngest{}
	}
}
