package server

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"os"
)

type Handlers struct {
	service *LogMgr
}

func NewHandlers(service *LogMgr) *Handlers {
	return &Handlers{service: service}
}

func (h Handlers) FetchLogs(w http.ResponseWriter, req *http.Request) {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	var lr LogsRequest
	err := json.NewDecoder(req.Body).Decode(&lr)
	if err != nil {
		logger.Error("failed to fetch logs", "source", "fs", "location", "fi.LogLocation")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if !requestDataValid(lr) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	logger.Debug("fetching logs from db", "from date", lr.FromDate, "to date", lr.ToDate, "log level", lr.LogLevel)
	logs, err := h.service.FetchLogs(lr)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(logs)
}

func requestDataValid(lr LogsRequest) bool {
	if lr.FromDate == "" || lr.ToDate == "" || lr.LogLevel == "" {
		return false
	}
	return true
}
