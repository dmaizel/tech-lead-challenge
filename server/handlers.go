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
	var lr LogsRequest
	err := json.NewDecoder(req.Body).Decode(&lr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	logs, err := h.service.FetchLogs(lr)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(logs)
}
