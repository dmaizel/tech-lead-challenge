package server

import (
	"encoding/json"
	"net/http"
)

type Handlers struct {
	service *LogMgr
}

func NewHandlers(service *LogMgr) *Handlers {
	return &Handlers{service: service}
}

func (h Handlers) FetchLogs(w http.ResponseWriter, req *http.Request) {
	logs, err := h.service.FetchLogs()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(logs)
}
