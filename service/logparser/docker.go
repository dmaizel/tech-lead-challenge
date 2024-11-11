package logparser

import (
	"bufio"
	"bytes"

	"os"
	"strings"
)

type Docker struct {
}

func (d Docker) ParseLog(in *os.File) ([]Log, error) {
	logs := make([]Log, 0)
	defer in.Close()
	scanner := bufio.NewScanner(in)
	// optionally, resize scanner's capacity for lines over 64K, see next example
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		lineParts := extractLogData(line)
		serviceName := strings.TrimSpace(lineParts[0])
		dateCreated := strings.TrimSpace(lineParts[3])
		level := strings.TrimSpace(lineParts[6])
		var buffer bytes.Buffer
		for i := 7; i < len(lineParts); i++ {
			buffer.WriteString(lineParts[i])
		}
		data := buffer.String()

		logs = append(logs, Log{
			ServiceName: serviceName,
			TimeStamp:   dateCreated,
			Level:       level,
			Data:        data,
		})
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}
	return logs, nil
}

func extractLogData(line string) []string {
	for _, i := range []string{"[", "]", "|"} {
		line = strings.ReplaceAll(line, i, "")
	}
	return strings.Split(line, " ")

}
