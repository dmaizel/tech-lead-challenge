package server

import (
	"log/slog"
	"net/http"
	"os"
	"tech-lead-challenge/db"
)

func StartServer(connector db.Connector) error {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	jobMgr := NewLogMgr(connector)
	mux := http.NewServeMux()

	handlers := NewHandlers(jobMgr)
	mux.HandleFunc("/logs", handlers.FetchLogs)

	logger.Info("starting http server", "port", "8090")
	return http.ListenAndServe(":8090", mux)

}
